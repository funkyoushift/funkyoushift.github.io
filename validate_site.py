#!/usr/bin/env python3
"""Small, dependency-free quality gate for the static site."""

from __future__ import annotations

import json
import posixpath
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent
SITE_ORIGIN = "https://www.funkyoushift.com"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_depth = 0
        self.title = ""
        self.h1_count = 0
        self.description = ""
        self.canonical = ""
        self.noindex = False
        self.references: list[str] = []
        self.json_ld: list[str] = []
        self._json_depth = 0
        self._json_buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "title":
            self.title_depth += 1
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta":
            name = (values.get("name") or "").lower()
            if name == "description":
                self.description = values.get("content") or ""
            if name == "robots" and "noindex" in (values.get("content") or "").lower():
                self.noindex = True
        elif tag == "link" and "canonical" in (values.get("rel") or "").lower():
            self.canonical = values.get("href") or ""
        elif tag == "script" and (values.get("type") or "").lower() == "application/ld+json":
            self._json_depth += 1
            self._json_buffer = []

        for name in ("href", "src", "poster"):
            if values.get(name):
                self.references.append(values[name] or "")
        if values.get("srcset"):
            self.references.extend(item.strip().split()[0] for item in values["srcset"].split(","))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
        elif tag == "script" and self._json_depth:
            self._json_depth -= 1
            self.json_ld.append("".join(self._json_buffer).strip())

    def handle_data(self, data: str) -> None:
        if self.title_depth:
            self.title += data
        if self._json_depth:
            self._json_buffer.append(data)


def tracked_files() -> set[str]:
    output = subprocess.check_output(
        ["git", "ls-files"], cwd=ROOT, text=True, encoding="utf-8"
    )
    deleted = set(
        subprocess.check_output(
            ["git", "diff", "--name-only", "--diff-filter=D"],
            cwd=ROOT,
            text=True,
            encoding="utf-8",
        ).splitlines()
    )
    return {name.replace("\\", "/") for name in output.splitlines()} - deleted


def local_target(page: str, reference: str) -> str | None:
    if not reference or reference.startswith(("#", "//", "data:", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if not path or path == "/":
        return "index.html"
    if path.startswith("/"):
        path = path[1:]
    else:
        path = posixpath.join(posixpath.dirname(page), path)
    path = posixpath.normpath(path)
    if path.endswith("/"):
        path += "index.html"
    return path


def main() -> int:
    tracked = tracked_files()
    pages = sorted(name for name in tracked if name.endswith(".html") and (ROOT / name).exists())
    errors: list[str] = []
    canonical_urls: set[str] = set()

    for page in pages:
        parser = PageParser()
        parser.feed((ROOT / page).read_text(encoding="utf-8"))
        if not parser.title.strip():
            errors.append(f"{page}: missing title")
        if parser.h1_count != 1:
            errors.append(f"{page}: expected one h1, found {parser.h1_count}")
        if not parser.canonical:
            errors.append(f"{page}: missing canonical URL")
        else:
            canonical_urls.add(parser.canonical)
        if not parser.noindex and not parser.description.strip():
            errors.append(f"{page}: indexable page is missing a meta description")
        for block in parser.json_ld:
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                errors.append(f"{page}: invalid JSON-LD ({exc.msg})")
        for reference in parser.references:
            target = local_target(page, reference)
            if target and target not in tracked:
                errors.append(f"{page}: missing local target {reference!r}")

    sitemap = ElementTree.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for element in sitemap.findall("sm:url/sm:loc", namespace):
        url = (element.text or "").strip()
        if url not in canonical_urls:
            errors.append(f"sitemap.xml: URL has no matching page canonical: {url}")

    forbidden = ("flingtrainer.com", "downloads/borderlands-4-trainer.html")
    for page in pages:
        if page == "downloads/borderlands-4-trainer.html":
            continue
        text = (ROOT / page).read_text(encoding="utf-8").lower()
        for value in forbidden:
            if value in text:
                errors.append(f"{page}: contains retired reference {value}")

    if errors:
        print("Site validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Site validation passed: {len(pages)} HTML pages checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
