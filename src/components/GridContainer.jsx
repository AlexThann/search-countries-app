import CountryCard from "./CountryCard";
import { useContext } from "react";
import SelectedCountryContext from "../contexts/SelectedCountryContext";
import { motion } from "motion/react";

export default function GridContainer({ info, setInfo }) {
  const { showDetails, setShowDetails, selectedCountry, setSelectedCountry } =
    useContext(SelectedCountryContext);

  function openCountryInfo(countryInfo) {
    setShowDetails(true);
    setSelectedCountry(countryInfo);
  }

  return (
    <section className="mt-10 grid-container">
      {info.map((countryInfo) => {
        return (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            key={countryInfo.name.common}
            onClick={() => openCountryInfo(countryInfo)}
          >
            <CountryCard
              key={countryInfo.name.common}
              countryName={countryInfo.name.common}
              countryFlag={{
                flag: countryInfo.flags.png,
                alt: countryInfo.flags.alt,
              }}
              countryPopulation={countryInfo.population}
              countryRegion={countryInfo.region}
              countryCapital={countryInfo.capital}
            />
          </motion.div>
        );
      })}
    </section>
  );
}
