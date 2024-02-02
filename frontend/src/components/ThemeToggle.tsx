import { Moon, Sun } from "lucide-react";
import { Switch } from "components/ui/switch";
import { useTheme } from "context/ThemeContext";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const switchTheme = (isDark: boolean) => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Switch
        aria-label="Toggle theme"
        checked={theme === "dark"}
        onCheckedChange={switchTheme}
        className="mr-2"
      ></Switch>
      {theme === "dark" ? <Moon /> : <Sun />}
    </>
  );
}
