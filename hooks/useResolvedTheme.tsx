import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useResolvedThemeSafe = () => {
  const { resolvedTheme } = useTheme();
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  // Prevent hydration mismatch after mount
  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  // Use resolvedTheme after mount, default to 'light' during SSR
  return isComponentMounted ? resolvedTheme : "light";
};
