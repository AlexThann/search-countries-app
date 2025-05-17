import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { motion, AnimatePresence } from "motion/react";

export default function CustomChoiceBox({ filter, setFilter }) {
  const [isOpened, setIsOpened] = useState(false);

  const regions = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

  function handleSelection(region) {
    setIsOpened(false);
    setFilter(region);
  }

  return (
    <>
      <div className="relative md:w-1/3 lg:w-1/6">
        <div
          onClick={() => {
            setIsOpened(!isOpened);
          }}
          className=" relative cursor-pointer flex flex-row justify-between items-center gap-4 bg-white py-4 px-6 rounded-md shadow-[0_4px_17px_rgba(0,0,0,0.25)] dark:text-white dark:bg-primary-blue-900"
        >
          <div>{filter}</div>
          {isOpened ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
        <AnimatePresence>
          {isOpened && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute  px-5 py-4 w-full mt-2 bg-primary-blue-800 dark:bg-primary-blue-900 bg-primary-white rounded-md shadow-[0_4px_17px_rgba(0,0,0,0.25)] z-10"
            >
              {regions.map((region) => (
                <li
                  className="cursor-pointer py-0.5 px-2 dark:text-white dark:hover:bg-primary-blue-950/50 hover:bg-gray-100"
                  onClick={() => handleSelection(region)}
                  key={region}
                >
                  {region}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
