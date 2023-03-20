import Table from "@/components/Table";
import Head from "next/head";
import Image from "next/image";

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
          <h1 className="m-0 absolute text-white text-3xl bottom-4 w-full text-center md:text-left md:text-5xl md:leading-[60px] md:px-8 lg:text-7xl lg:px-[5rem] lg:leading-[100px] font-bold md:font-extrabold">
            Regex web crawler
            <br />
            for Temple Names
          </h1>
        </header>

        <div className="relative z-10">
          <Table />
        </div>

        <div className="z-[1] absolute w-[300px] min-h-[300px] md:w-[500px] md:min-h-[500px] top-[40vh] lg:top-[55vh] -translate-y-[40%] -translate-x-[40%] blur-[150px] md:blur-[250px] bg-light-gold rounded-[50%]" />
        <div className="z-[1] absolute w-[300px] min-h-[300px] md:w-[500px] md:min-h-[500px] bottom-0 right-0 translate-x-[40%] translate-y-[40%] blur-[150px] md:blur-[250px] bg-light-gold rounded-[50%]" />  
      
      </div>
    </>
  );
}
