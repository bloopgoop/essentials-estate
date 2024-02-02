import logoLight from "assets/logo-light.svg";
import logoDark from "assets/logo-dark.svg";
import { useTheme } from "context/ThemeContext";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "light" ? logoLight : logoDark}
      alt="logo"
      height="40px"
      width="40px"
    />
  );
}
