import { FC, useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import { Download } from "lucide-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { v4 as uuid} from 'uuid'

const Eng_To_Thai: { [key: string]: string } = {
  kalasin: "กาฬสินธ์ุ",
  kamphaengphet: "กำแพงเพชร",
  khonkaen: "ขอนแก่น",
  jantaburi: "จันทบุรี",
};

const provinces_list = [
  {
    name: "กาฬสินธ์ุ",
    value: "kalasin",
  },
  {
    name: "กำแพงเพชร",
    value: "kamphaengphet",
  },
  {
    name: "ขอนแก่น",
    value: "khonkaen",
  },
  {
    name: "จันทบุรี",
    value: "jantaburi",
  },
];

const Table: FC = ({}) => {
  const [selected, setSelected] = useState<{
    [key: string]: {
      active: boolean;
      value: string;
    };
  }>({
    kalasin: {
      active: false,
      value: "kalasin",
    },
    kamphaengphet: {
      active: false,
      value: "kamphaengphet",
    },
    khonkaen: {
      active: false,
      value: "khonkaen",
    },
    jantaburi: {
      active: false,
      value: "jantaburi",
    },
  });

  const [temples, setTemples] = useState<ResponseData[]>();
  const [splist, setSplist] = useState<Array<string>>([]);
  const [error, setError] = useState<{ message: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const cachedData = useRef<{ [key: string]: ResponseData }>({});

  const handleProvinceToggled = (p: string) => {
    setIsLoading(true);
    setSelected((prevState) => {
      return {
        ...prevState,
        [p]: {
          ...prevState[p],
          active: !prevState[p].active,
        },
      };
    });

    if (!splist.includes(p)) {
      setSplist((prev) => [...prev, p]);
    } else {
      const newSplist = splist.filter((sp) => sp !== p);
      setSplist(newSplist);
    }
  };

  interface ResponseData {
    name: string;
    temples: any[];
  }

  useEffect(() => {
    const fetchData = async (splist: string[]) => {
      try {
        const newResponses: ResponseData[] = [];

        for (let i = 0; i < splist.length; i++) {
          const pname = splist[i];

          // Check if response for this province is already cached
          if (cachedData.current[pname]) {
            newResponses.push(cachedData.current[pname]);
            continue;
          }

          // Fetch data for this province and cache the response
          const response = await axios.get(
            `https://api-server-e6fgka4zfq-uc.a.run.app/temples?province=${pname}`
          );

          cachedData.current[pname] = {
            name: pname,
            temples: response.data,
          };

          newResponses.push(cachedData.current[pname]);
        }

        setTemples(newResponses);
      } catch (error) {
        if (error instanceof Error) {
          setError({ message: error.message });
        } else {
          setError({ message: "Something is wrong!" });
        }
      }
      setIsLoading(false);
    };

    fetchData(splist);
  }, [splist]);

  const getURL = (splist: string[]) => {
    let url = "https://api-server-e6fgka4zfq-uc.a.run.app/download?";

    splist.forEach((p) => {
      url += `province=${p}&`;
    });

    return url
  };

  return (
    <div className="mt-4 mb-12 md:mb-20 lg:mb-32 mx-auto max-w-[92%] flex rounded-lg overflow-hidden sm h-[500px] md:h-[740px] lg:h-[900px]">
      <div className="flex flex-col flex-[2] bg-gray-300 h-full">
        <div className=" bg-dark-gray-a p-4 flex justify-center items-center text-white md:text-xl font-bold">
          Province
        </div>
        <div className="text-[16px] md:text-[20px] py-4 px-2 md:px-4 gap-2 flex flex-col justify-between md:py-4 lg:py-8 h-full w-full lg:text-2xl">
          <div className="flex flex-col justify-start items-center gap-2 h-full">
            {provinces_list.map((p) => (
              <Button
                className={`${
                  selected[p.value].active ? "button-active" : ""
                } relative ${
                  isLoading ? "pointer-events-none" : ""
                } md:h-12 lg:h-16 shadow-sm shadow-slate-600 active:ring-2 active:ring-slate-500 transition-all ease-in-out`}
                key={uuid()}
                onClick={() => handleProvinceToggled(p.value)}
              >
                {p.name}
                {splist.includes(p.value) && (
                  <div className="absolute top-0 right-0 rounded-full w-5 h-5 md:w-6 md:h-6 lg:h-7 lg:w-7 translate-x-[50%] -translate-y-[50%] bg-stone-700 text-white text-[16px] lg:text-[18px] flex justify-center items-center text-center ease-in-out transition-all">
                    {splist.indexOf(p.value) + 1}
                  </div>
                )}
              </Button>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <a
              href={getURL(splist)}
              className={`${
                splist.length > 0 ? "" : "disabled-link"
              } select-none bg-yellow-100 w-full md:h-12 lg:h-16 flex justify-center items-center rounded-md py-2 hover:bg-yellow-200 active:bg-yellow-300 ease-in-out transition-all shadow-sm shadow-slate-600 active:ring-2 active:ring-slate-500`}
            >
              <Download className="mr-2" />
              <p className="md:hidden">Selected</p>
              <p className="hidden md:block">Download Selected</p>
            </a>
            <a
              href="https://api-server-e6fgka4zfq-uc.a.run.app/download"
              className="bg-yellow-100 w-full md:h-12 lg:h-16 select-none flex justify-center items-center rounded-md py-2 hover:bg-yellow-200 active:bg-yellow-300 ease-in-out transition-all shadow-sm shadow-slate-600 active:ring-2 active:ring-slate-500" 
            >
              <Download className="mr-2" />
              <p className="md:hidden">All</p>
              <p className="hidden md:block">Download All</p>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-[3] bg-white h-full">
        <div className=" bg-dark-gray-b p-4 flex justify-center items-center text-white md:text-xl font-bold">
          Temples
        </div>
        <div className="text-xs font-light p-4 lg:p-7 md: w-full h-full overflow-y-scroll">
          {isLoading && <Loader2 className="animate-spin" />}
          {temples &&
            !isLoading &&
            temples.map((p) => {
              const filteredTemples = p.temples.filter(
                (t) => t.trim().length > 0
              ); // filter out empty temple names
              return (
                <>
                  <h4
                    key={uuid()}
                    className="underline font-normal text-lg md:text-2xl lg:text-4xl mb-1 md:mb-2"
                  >
                    {Eng_To_Thai[p.name]}
                  </h4>
                  {filteredTemples.length > 0 && (
                    <ul key={uuid()}>
                      {filteredTemples.map((t, i) => (
                        <li
                          className="list-disc text-md md:text-lg lg:text-xl ml-5 md:ml-7 lg:ml-9"
                          key={uuid()}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Table;
