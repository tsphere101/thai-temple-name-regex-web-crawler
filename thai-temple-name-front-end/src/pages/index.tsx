import RegexInfo from "@/components/RegexInfo";
import Table from "@/components/Table";
import Head from "next/head";
import Image from "next/image";
import { Github } from "lucide-react";

const groupMember = [
  {
    id: "63010022",
    name: "กฤต รุ่งโรจน์กิจกุล",
  },
  {
    id: "63010034",
    name: "กฤษฎา สารวิทย์",
  },
  {
    id: "63010052",
    name: "ก้องเกียรติ ชุนงาม",
  },
  {
    id: "63010124",
    name: "จักรภัทรณ์ ชื่นถาวร",
  },
  {
    id: "63010126",
    name: "จักริน จอนจำรัส",
  },
  {
    id: "63010185",
    name: "ชนสรณ์ จึงมาริศกุล",
  },
  {
    id: "63010202",
    name: "ชรินดา สนธิดี",
  },
  {
    id: "63010224",
    name: "ชาญวนิษฐ์ นุชอยู่",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Thai temples Regex Web Crawler</title>
      </Head>

      <div className="relative min-h-screen bg-bronze-a overflow-hidden">
        <header className="z-[2] w-full h-[40vh] lg:h-[55vh] relative">
          <Image
            className="object-cover w-full h-full"
            quality={100}
            width="100"
            height="100"
            priority
            src="heroPic.svg"
            alt="temple"
          />

          <div className="flex flex-col justify-center items-center absolute text-white bottom-[10%] left-[50%] -translate-x-[50%] w-full">
            <p className="text-3xl font-normal md:text-5xl lg:text-6xl ">
              Regex web crawler
            </p>
            <p className="text-lg font-normal md:text-2xl lg:text-2xl">
              for Thai Temple Names
            </p>
          </div>
        </header>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 my-4">
          <Table />
        </div>

        <div className="mt-4 relative z-10 w-full max-w-[1200px] mx-auto px-4 my-4 flex flex-col md:flex-row justify-start item-center gap-4">
          <div className="flex-[2]">
            <div className="w-full flex flex-col justify-center items-center rounded-lg overflow-hidden gap-4">
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-center items-center p-3 bg-dark-gray-a w-full text-white font-semibold text-sm md:text-base">
                  รายชื่อสมาชิก
                </div>
                <div className="flex flex-col w-full p-3 bg-white">
                  <div className="mx-auto text-sm md:text-base">
                    {groupMember.map((m) => (
                      <pre className="font-['kanit']" key={m.id}>
                        {m.id + "    " + m.name}
                      </pre>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full rounded-lg overflow-hidden">
                <div className="flex justify-center items-center p-3 bg-dark-gray-a w-full text-white font-semibold text-sm md:text-base">
                  GitHub Link
                </div>
                <div className="flex justify-center gap-4 items-center w-full p-3 bg-white">
                  <Github className="text-2xl"/>
                  <a target={"_blank"} href="https://github.com/tsphere101/thai-temple-name-regex-web-crawler" className="underline text-black hover:text-sky-500"> {`Click Me!!`} </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[3] flex flex-col justify-start items-start">
            <div className="flex justify-center items-center p-3 bg-dark-gray-a w-full text-white font-semibold text-sm md:text-base rounded-t-lg">
              Regular Expression ที่ใช้
            </div>
            <RegexInfo className="markdown p-4 bg-white rounded-b-lg w-full min-h-[800px] text-sm md:text-base" />
          </div>
        </div>

        <div className="z-[1] absolute w-[300px] min-h-[300px] md:w-[500px] md:min-h-[500px] top-[40vh] lg:top-[55vh] -translate-y-[40%] -translate-x-[40%] blur-[150px] md:blur-[250px] bg-light-gold rounded-[50%]" />
        <div className="z-[1] absolute w-[300px] min-h-[300px] md:w-[500px] md:min-h-[500px] bottom-0 right-0 translate-x-[40%] translate-y-[40%] blur-[150px] md:blur-[250px] bg-light-gold rounded-[50%]" />
      </div>
    </>
  );
}
