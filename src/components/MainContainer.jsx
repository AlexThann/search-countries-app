import { TfiSearch } from "react-icons/tfi";
import CustomChoiceBox from "./CustomChoiceBox";
import GridContainer from "./GridContainer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MdError } from "react-icons/md";
import { IoAlert } from "react-icons/io5";

export default function MainContainer({ info, setInfo }) {
  const [input, setInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [filter, setFilter] = useState("Filter By Region");

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const visibleCountries = info.filter((country) => {
    switch (filter) {
      case "Africa":
        return country.region === "Africa";
      case "America":
        return country.region === "Americas";
      case "Asia":
        return country.region === "Asia";
      case "Europe":
        return country.region === "Europe";
      case "Oceania":
        return country.region === "Oceania";
      default:
        return true;
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${input}?fields=name,capital,population,region,subregion,currencies,languages,flags,tld,borders&fullText=true`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setShowError(true);
        } else {
          alert("Something went wrong. Try again later.");
        }
        setInput("");
        throw new Error(`Response status: ${response.status}`);
      }
      const countryInfo = await response.json();
      setShowError(false);
      setInput("");

      const exists = info.some(
        (item) => item.name.official === countryInfo[0].name.official
      );
      if (exists) return; // Do nothing if already present

      setInfo((info) => [countryInfo[0], ...info]);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <main className=" relative min-h-screen dark:bg-primary-blue-950 bg-gray-40 px-[5%] pt-16 pb-20">
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute bg-red-500 z-20 md:w-1/3 w-4/5 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-3 rounded-md flex flex-row justify-center items-center gap-4"
          >
            <MdError className="w-4 h-4" />
            {`No results found. Please try the official country name.`}
          </motion.div>
        )}{" "}
      </AnimatePresence>
      <section className="flex flex-col items-start md:flex-row gap-5 justify-between md:items-center">
        <form
          action=""
          className="w-full md:w-1/2 lg:w-1/3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label
            htmlFor="input"
            className="flex w-full flex-row items-center gap-5 bg-white py-4 px-6 rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.25)] dark:text-white dark:bg-primary-blue-900"
          >
            <TfiSearch />
            <input
              type="text"
              name="input"
              id="input"
              placeholder="Search for a country..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="focus:outline-none dark:text-white dark:placeholder:text-white/50 font-medium w-full"
            />
          </label>
        </form>
        <CustomChoiceBox filter={filter} setFilter={setFilter} />
      </section>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex flex-row items-center gap-2 cursor-pointer bg-red-500 px-3 py-2 mt-6 rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.25)] text-white font-medium"
        onClick={() => setInfo([])}
      >
        <IoAlert />
        Delete all
      </motion.button>
      <GridContainer info={visibleCountries} setInfo={setInfo} />
    </main>
  );
}
