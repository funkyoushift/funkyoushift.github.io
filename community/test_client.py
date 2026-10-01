import hashlib
import json
import unittest
from unittest.mock import patch
import community_library as library

class Tests(unittest.TestCase):
    def test_integrity_and_preservation(self):
        folder=dict(version=1,title='Vex ♥',creator='Test',description='',folders=['Empty'],items=[dict(name='One',folder='',serial='@UAbCdEfG')]*2)
        data=dict(ok=True,id='a1111111-1111-4111-8111-111111111111',folder=folder,digest=hashlib.sha256(json.dumps(folder,ensure_ascii=False,separators=(',',':')).encode()).hexdigest())
        self.assertEqual(library.validate(data),folder)
        with patch.object(library,'request',return_value=data) as request:
            self.assertEqual(library.get_folder(data['id'])['folder']['items'],folder['items'])
            request.assert_called_once_with('/folders/'+data['id'])
        self.assertEqual(library.folder_id(library.ENDPOINT+'/api/v1/folders/'+data['id']),data['id'])
        data['digest']='bad'
        with self.assertRaises(ValueError):library.validate(data)
    def test_link_and_page_validation(self):
        with self.assertRaises(ValueError):library.folder_id('https://evil.example/folders/x')
        with self.assertRaises(ValueError):library.list_folders(offset=-1)

if __name__=='__main__':unittest.main()
