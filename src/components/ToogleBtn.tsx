import { useEffect } from "react";
import { useTheme } from "../hook/usethems";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

function ToogleBtn() {
  const [theme, setTheme] = useTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme == "dark");

    console.log(theme);
  }, [theme]);
  return (
    <>
      <button
        onClick={() => setTheme(theme)}
        className="border w-7 h-7 flex justify-center items-center rounded-full cursor-pointer"
      >
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </>
  );
}

export default ToogleBtn;
