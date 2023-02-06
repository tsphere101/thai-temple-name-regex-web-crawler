import crawler
import utils


URLs = ['https://th.wikipedia.org/wiki/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99']

REGEXP = r'(?<=title=")วัด.*?(?="|\s\()'

def main():
    for url in URLs:
        print("Crawling: ")

        cl = crawler.Crawler(url)
        extracted_data = cl.get().trim().extract(REGEXP)

        print("Crawling completed")
        # for name in extracted_data:
        #     print(name)
        print(f"{len(extracted_data)} found")

        utils.write_to_file("output.txt", "\n".join(extracted_data))

if __name__ == "__main__":
    main()