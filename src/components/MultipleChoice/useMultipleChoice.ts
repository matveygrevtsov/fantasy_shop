import { useState } from "react";
import { useClickOutsideListener } from "../../hooks/useClickOutsideListener";

interface State<T> {
  isOpened: boolean;
  selectedOptions: T[];
}

export function useMultipleChoice<T>(onSelect: (options: T[]) => void) {
  const [state, setState] = useState<State<T>>({
    isOpened: false,
    selectedOptions: [],
  });
  const { ref } = useClickOutsideListener<HTMLUListElement>(handleCloseClick);

  function handleSelect(option: T) {
    const selectedOptions = state.selectedOptions.includes(option)
      ? state.selectedOptions.filter(
          (selectedOption) => selectedOption !== option
        )
      : [...state.selectedOptions, option];

    setState((prevState) => ({
      ...prevState,
      selectedOptions,
    }));

    onSelect(selectedOptions);
  }

  function handleOpenClick() {
    if (!state.isOpened) {
      setState((prevState) => ({ ...prevState, isOpened: true }));
    }
  }

  function handleCloseClick() {
    if (state.isOpened) {
      setState((prevState) => ({ ...prevState, isOpened: false }));
    }
  }

  return { ref, state, handleSelect, handleOpenClick };
}
