'use strict';
// Editorial matches live outside the signed gear folder. Never change its digest.
window.CommunityBuildVideos = (() => {
  const ready = fetch('/community/build-videos.json').then(r => {
    if (!r.ok) throw new Error('Video index unavailable');
    return r.json();
  }).catch(() => ({}));
  let revision = 0;
  const host = () => document.getElementById('build-video');
  function clear() {
    revision++;
    host().replaceChildren();
    host().hidden = true;
  }
  async function show(id, folder) {
    clear();
    const run = revision, index = await ready, match = index[id];
    if (run !== revision || !match || match.folderTitle !== folder.title) return;
    if (!/^[\w-]{11}$/.test(match.videoId)) return;
    const box = host();
    const heading = document.createElement('h3');
    heading.textContent = 'Watch the build';
    const description = document.createElement('p');
    description.textContent = 'Video featured in the creator’s guide for this build. The video, written guide and saved gear may be different versions—check the folder’s level and the guide’s update notes.';
    const actions = document.createElement('div');
    actions.className = 'actions';
    const play = document.createElement('button');
    play.type = 'button';play.textContent = 'Play build video';
    const youtube = document.createElement('a');
    youtube.href = 'https://www.youtube.com/watch?v=' + match.videoId;
    youtube.textContent = 'Watch on YouTube';youtube.target = '_blank';youtube.rel = 'noopener';
    const guide = document.createElement('a');
    guide.href = match.guide;guide.textContent = 'Read the creator’s guide';guide.target = '_blank';guide.rel = 'noopener';
    actions.append(play, youtube, guide);
    const player = document.createElement('div');player.className = 'build-video-player';
    play.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + match.videoId;
      frame.title = 'Build video — ' + folder.title;
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;frame.referrerPolicy = 'strict-origin-when-cross-origin';
      player.replaceChildren(frame);play.hidden = true;
    });
    box.append(heading, description, actions, player);box.hidden = false;
  }
  return {show, clear};
})();
