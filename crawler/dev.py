# Start crawling from the root of the site
import requests
import re


class Crawler:
    def __init__(self,url) -> None:
        self.url = url

    # request the web page
    def get(self):
        self.response = requests.get(self.url).text
        return self
    
    def extract(self,regex:str) -> list:
        pass

    def extract_li(self,regex=r'(?<=<li>).*?(?=<\/li>)') -> list:
        extracted_data = re.findall(regex, self.response)
        return extracted_data
    
    # get_province_links extracts links to the web pages for each provinces
    def get_province_links(self) -> list:
        provinces_temple_links = self.extract_li()

        result = []

        for element in provinces_temple_links:
            province_name = re.search(r'(?<=วัดใน).*?(?=")',element)
            href = re.search(r'(?<=href=").*?(?=")',element)
            
            if province_name:
                result.append({province_name.group() : href.group()})
        
        return result
        


REGEX = r'(?<=<li>).*?(?=<\/li>)'
URL = 'https://th.wikipedia.org/wiki/%E0%B8%AB%E0%B8%A1%E0%B8%A7%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88:%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%97%E0%B8%A2'

if __name__ == "__main__":

    cl = Crawler(URL)
    cl.get()
    print(cl.get_province_links())

    
    
