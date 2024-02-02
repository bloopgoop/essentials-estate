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
      <Moon></Moon>
      <Switch
        aria-label="Toggle theme"
        checked={theme === "dark"}
        onCheckedChange={switchTheme}
      ></Switch>
    </>
  );
}
