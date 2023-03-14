import crawler
import sys
import json

URL = 'https://th.wikipedia.org/wiki/%E0%B8%AB%E0%B8%A1%E0%B8%A7%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88:%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%97%E0%B8%A2'
HOST = 'https://th.wikipedia.org'

# province_name = json.load(open("./province_name.json"))

province_name= {
    "to_thai": {
        "kalasin": "กาฬสินธุ์",
        "kamphaengphet": "กำแพงเพชร",
        "khonkaen": "ขอนแก่น",
        "jantaburi": "จันทบุรี"
    },
    "to_eng": {
        "กาฬสินธุ์": "kalasin",
        "กำแพงเพชร": "kamphaengphet",
        "ขอนแก่น": "khonkaen",
        "จันทบุรี": "jantaburi"
    }
}


if __name__ == "__main__":
    print("crawler script is running...")

    # no args
    province_thai = ["กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี"]

    # args
    if len(sys.argv) > 1:
        args = sys.argv[1:]
        if (args[0] == "-p" or args[0] == "--province") and len(args) > 1:
            # split province name by comma and translate to Thai
            province_thai = [province_name["to_thai"][province] for province in args[1].split(",")]



    crawler = crawler.Crawler(HOST, URL, province_thai, crawler.HTMLParser())

    # crawler export the temple names to csv file
    crawler.run()
