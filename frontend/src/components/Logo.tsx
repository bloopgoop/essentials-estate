import { useTheme } from "context/ThemeContext";
import { cn } from "lib/utils";

export default function Logo({ className, light, dark }: { className?: string, light?: string, dark?: string }) {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "light" ? light : dark}
      alt="logo"
      className={cn(className)}
    />
  );
}
