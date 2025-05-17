import { motion } from "motion/react";

export default function CountryCard(props) {
  const formatter = new Intl.NumberFormat("de-DE");

  return (
    <motion.div
      initial={{ opacity: 0.0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white flex flex-col shadow-[0_4px_17px_rgba(0,0,0,0.25)]  rounded-lg dark:bg-primary-blue-900"
    >
      <img
        className="rounded-t-lg w-[300px] h-[200px]"
        src={props.countryFlag.flag}
        alt={props.countryFlag.alt}
      />
      <div className="p-4 dark:bg-primary-blue-900  rounded-b-lg">
        <p className="mb-4 font-medium dark:text-white text-lg">
          {props.countryName}
        </p>
        <p className="dark:text-white">
          <span className="font-medium dark:text-white  pr-2">Population:</span>
          {formatter.format(props.countryPopulation)}
        </p>
        <p className="dark:text-white">
          <span className="font-medium dark:text-white  pr-2">Region: </span>{" "}
          {props.countryRegion}
        </p>
        <p className="dark:text-white">
          <span className="font-medium dark:text-white pr-2 ">Capital: </span>{" "}
          {props.countryCapital.join(", ")}
        </p>
      </div>
    </motion.div>
  );
}
