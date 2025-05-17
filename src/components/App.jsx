import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MainContainer from "./MainContainer";
import DetailedCountryContainer from "./DetailedCountryContainer";
import SelectedCountryContext from "../contexts/SelectedCountryContext";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [info, setInfo] = useState(() => {
    const countriesSaved = localStorage.getItem("countriesRequested");
    if (countriesSaved == null) return [];
    return JSON.parse(countriesSaved);
  });
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    localStorage.setItem("countriesRequested", JSON.stringify(info));
  }, [info]);

  return (
    <>
      <main className={darkMode === true ? "dark" : ""}>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <SelectedCountryContext.Provider
          value={{
            showDetails,
            setShowDetails,
            selectedCountry,
            setSelectedCountry,
          }}
        >
          {showDetails ? (
            <DetailedCountryContainer />
          ) : (
            <MainContainer info={info} setInfo={setInfo} />
          )}
        </SelectedCountryContext.Provider>
      </main>
    </>
  );
}

export default App;
