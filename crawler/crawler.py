import re
import requests

class Crawler:
    def __init__(self,url):
        self.url = url

    def get(self):
        self.response = requests.get(self.url).text
        return self

    def trim(self):
        # get only the content of the page 
        # self.response = re.search(r'(?<=<div class="mw-parser-output">).*?(?=</div>)', self.response, re.DOTALL).group(0)
        
        return self

    def extract(self,regex):
        extracted_data = re.findall(regex, self.response)
        return extracted_data

    
