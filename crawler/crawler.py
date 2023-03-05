import requests
import re
import utils
import json

# province_name is used for translating province name from thai to eng
province_name = json.load(open("province_name.json"))


# The HTMLParser class is a class that can be used to extract information from HTML strings.
class HTMLParser:
    def __init__(self):
        pass

    def get_anchor(self, html:str):
        """
        Returns a list of all anchor tags in the input HTML.

        Args:
        html (str): The input HTML string.

        Returns:
        list: A list of anchor tags in the input HTML.
        
        Example usage:
        html : '<html><body><a href="<https://www.example.com>">Link</a></body></html>'
        returns : ['<a href="<https://www.example.com>">']
        """
        return re.findall(r'<a\\s+[^>]*>',html)

    def get_href(self, html:str):
        """
        Returns a list of all href attributes in anchor tags in the input HTML.

        Args:
        html (str): The input HTML string.

        Returns:
        list: A list of href attributes in anchor tags in the input HTML.

        Example usage:
        html : '<html><body><a href="https://www.example.com">Link</a></body></html>'
        returns : ['https://www.example.com']
        """
        return re.findall(r'(?<=href=").*?(?=")', html)

    def get_title(self, html:str):
        """
        Returns a list of all title attributes in anchor tags in the input HTML.

        Args:
        html (str): The input HTML string.

        Returns:
        list: A list of title attributes in anchor tags in the input HTML.
        
        Example usage:
        html : '<html><body><a href="https://www.example.com" title="Example Website">Link</a></body></html>'
        returns : ['Example Website']
        """
        return re.findall(r'(?<=title=").*?(?=")',html)


class Crawler:
    def __init__(self,HOST,root_url,provinces:list,parser:HTMLParser) -> None:
        self.HOST = HOST
        self.parser = parser
        self.root_url = root_url
        self.provinces = provinces
        self.visited = set()
        self.result = list()

    def crawl(self, url):
        if url in self.visited:
            return

        self.visited.add(url)
        html = requests.get(url).text

    # extract provinces and href from the anchors in root html
    def extract_provinces(self, html):
        anchors = self.parser.get_anchor(html)
        temples = []
        for anchor in anchors:
            title = self.parser.get_title(anchor)
            href = self.parser.get_href(anchor)

            if len(title) != 0 :
                if re.match("รายชื่อวัดใน",title[0]):
                    temples.append({"title":title[0],"href":href[0]})
        return temples

    # extract temple names from html
    def extract_temple_name(self,html) -> list:
        temple_name_pattern = r'(?<=title=")วัด.*?(?="|\s\()'
        temple_names = re.findall(temple_name_pattern,html)

        # remove last 2 items : "วัดไทย"
        temple_names = temple_names[:len(temple_names)-2]

        return temple_names

    # crawl all provinces
    def run(self):
        # clear list of result
        self.result=[]

        root_html = requests.get(self.root_url).text
        provinces_href = self.extract_provinces(root_html)
        province_url_to_visit = []

        # get links for each desire province
        for province in self.provinces:
            for ph in provinces_href:
                match = re.search(province,ph['title'])
                if match:
                    province_url_to_visit.append({'province':province,'url':self.HOST+ph['href']})

        # crawl each province
        for province_url in province_url_to_visit:
            url = province_url['url']
            print('Crawling: '+ province_url['province'])
            html = requests.get(url).text
            temple_name_in_this_province = self.extract_temple_name(html) 
            
            # export to csv file
            thai_province_name = province_url['province']
            eng_province_name = province_name['to_eng'][thai_province_name]
            utils.export_csv(temple_name_in_this_province,header=None,filename='../' + eng_province_name+'.csv')

