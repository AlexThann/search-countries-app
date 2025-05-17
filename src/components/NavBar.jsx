import { IoMoonOutline } from "react-icons/io5";

export default function NavBar({ darkMode, setDarkMode }) {
  return (
    <nav className="flex justify-between px-[5%] py-8  z-10 shadow-md  dark:bg-primary-blue-900 bg-white text-white">
      <h1 className="dark:text-white text-black font-semibold text-lg md:text-2xl ">
        Where in the world?
      </h1>
      <button
        className="dark:text-white text-black font-semibold cursor-pointer flex items-center gap-2"
        onClick={() => setDarkMode(!darkMode)}
      >
        <IoMoonOutline
          className={`dark:[&>path]:fill-white dark:text-white text-black`}
        />
        Dark Mode
      </button>
    </nav>
  );
}
