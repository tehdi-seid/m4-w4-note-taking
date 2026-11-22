import { useTheme } from "../theme/useTheme";
import { quietButton } from "./styles";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={quietButton}
      onClick={toggle}
      aria-pressed={isDark}
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
