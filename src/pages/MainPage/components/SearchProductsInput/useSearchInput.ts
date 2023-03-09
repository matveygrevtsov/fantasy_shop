import { useEffect, useRef } from "react";

export function useSearchInput() {
  const refInput = useRef<HTMLInputElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const input = refInput.current;
    const button = refButton.current;
    if (!input || !button) return;
    const onEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    };
    input.addEventListener("keypress", onEnterPress);
    return () => input.removeEventListener("keypress", onEnterPress);
  }, []);

  return { refInput, refButton };
}
