import { useState, useEffect } from "react";
import axios from "axios";

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

  // "กาฬสินธ์ุ",
  // "กำแพงเพชร",
  // "ขอนแก่น",
  // "จันทบุรี",
];

const TemplesTable = () => {
  const [selected, setSelected] = useState({
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

  const [temples, setTemples] = useState("");
  const [splist, setSplist] = useState([]);
  const [error, setError] = useState({
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggled = (pname) => {
    setSelected((prevState) => {
      return {
        ...prevState,
        [pname]: {
          ...prevState[pname],
          active: !prevState[pname].active,
        },
      };
    });

    if (!splist.includes(pname)) {
      setSplist((prev) => [...prev, pname]);
    } else {
      const newSplist = splist.filter((sp) => sp !== pname);
      setSplist(newSplist);
    }

    setIsLoading(true);
  };

  useEffect(() => {
    if (splist.length > 0) {
      const params = splist.map((sp) => `province=${sp}`).join("&");
      axios
        .get(`http://localhost:3000/temples?${params}`)
        .then((res) => {
          setTemples(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError({
            message: err.message,
          });
        });
    } else {
      setTemples([]);
      setIsLoading(false);
    }
  }, [splist]);

  return (
    <section className="content-section">
      <figure className="temples-table">
        <div className="provinces-column">
          <div className="column-header first-col">
            <h1>Provinces</h1>
          </div>
          <div className="province-names">
            <div>
              {provinces_list.map((p) => (
                <h1
                  key={p.name}
                  className={`province-selector ${
                    selected[p.value].active ? "selector-active" : ""
                  } ${isLoading ? "unclickable":""}`}
                  onClick={() => handleToggled(p.value)}
                >
                  {p.name}
                </h1>
              ))}
            </div>
            <div className="download-selectors">
              <a className="download-selector" href='http://localhost:3000/download' >Download All</a>
              <a
                className={`${
                  splist.length > 0 ? "download-selector" : "no-sp"
                }`}
                href={`http://localhost:3000/download?${splist.map((sp) => `province=${sp}`).join("&")}`}
              >
                Download Selected
              </a>
            </div>
          </div>
        </div>
        <div className="temples-column">
          <div className="column-header second-col">
            <h1>Temples</h1>
          </div>
          <ul className="temples-names">
            {isLoading ? (
              <>
                <p>Loading...</p>
              </>
            ) : (
              <>
                {temples &&
                  !error.message &&
                  temples.map((name, i) => <li key={i}>{name}</li>)}
                {error.message && <li>{error.message}</li>}
              </>
            )}
          </ul>
        </div>
      </figure>
    </section>
  );
};

export default TemplesTable;
