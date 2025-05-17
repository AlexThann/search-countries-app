import { useContext } from "react";
import SelectedCountryContext from "../contexts/SelectedCountryContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "motion/react";

export default function DetailedCountryContainer() {
  const { showDetails, setShowDetails, selectedCountry, setSelectedCountry } =
    useContext(SelectedCountryContext);

  const formatter = new Intl.NumberFormat("de-DE");

  function getLangueges() {
    const langueges = Object.values(selectedCountry.languages).join(", ");
    return langueges;
  }

  function getCurrencies() {
    const currencyNames = Object.values(selectedCountry.currencies)
      .map((currency) => currency.name)
      .join(", ");
    return currencyNames;
  }

  function getNativeName() {
    const native = selectedCountry.name.nativeName;
    const firstKey = Object.keys(native)[0];
    return native[firstKey].common;
  }

  return (
    <main className=" relative min-h-screen dark:bg-primary-blue-950 bg-gray-40 px-[5%] pt-16 pb-20">
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          setShowDetails(false);
        }}
        className="mb-12 cursor-pointer flex flex-row items-center gap-4 dark:text-white dark:bg-primary-blue-900 px-7 py-2 rounded-md shadow-[0_4px_17px_rgba(0,0,0,0.25)]"
      >
        <FaArrowLeftLong />
        Back
      </motion.button>
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-5 md:gap-20">
        <img
          src={selectedCountry.flags.png}
          alt=""
          className="mb-8 md:w-1/2 max-w-[600px] max-h-[400px]  shadow-[0_4px_17px_rgba(0,0,0,0.5)]"
        />
        <div className="w-full md:w-1/3 ">
          <h1 className="mb-8 font-medium dark:text-white text-2xl">
            {selectedCountry.name.common}
          </h1>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 lg:mb-10">
            <div>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Native Name:{" "}
                </span>{" "}
                {getNativeName()}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Population:{" "}
                </span>{" "}
                {formatter.format(selectedCountry.population)}{" "}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Region:{" "}
                </span>{" "}
                {selectedCountry.region}{" "}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Sub Region:{" "}
                </span>{" "}
                {selectedCountry.subregion}{" "}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Capital:{" "}
                </span>{" "}
                {selectedCountry.capital}{" "}
              </p>
            </div>
            <div className="mb-8">
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Top Level Domain:{" "}
                </span>{" "}
                {selectedCountry.tld.join(", ")}{" "}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Currencies:{" "}
                </span>{" "}
                {getCurrencies()}{" "}
              </p>
              <p className="dark:text-white">
                <span className="font-medium dark:text-white  pr-2">
                  Languages:{" "}
                </span>{" "}
                {getLangueges()}{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <p className="font-medium dark:text-white  pr-2">
              Border Countries:
            </p>
            <div className="flex flex-row gap-4 flex-wrap">
              {selectedCountry.borders.map((country) => (
                <div
                  key={country}
                  className=" flex items-center dark:text-white dark:bg-primary-blue-900 px-4 py-1 rounded-sm shadow-[0_4px_17px_rgba(0,0,0,0.25)]"
                >
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
