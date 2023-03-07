import { useRef } from "react";

export function useSearchInput(onSubmit: (searchString: string) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    const input = ref.current;
    if (!input?.value) return;
    onSubmit(input.value);
  };

  return { ref, handleSubmit };
}
