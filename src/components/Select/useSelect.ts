import { useState } from "react";
import { useClickOutsideListener } from "../../hooks/useClickOutsideListener";
import { Props } from "./Select";

interface State<T> {
  isOpened: boolean;
  selectedOptions: T[];
}

export function useSelect<T>(props: Props<T>) {
  const [state, setState] = useState<State<T>>({
    isOpened: false,
    selectedOptions: [],
  });
  const { ref } = useClickOutsideListener<HTMLUListElement>(handleCloseClick);

  function handleSelect(option: T) {
    if (props.selectType === "MultipleChoice") {
      const selectedOptions = state.selectedOptions.includes(option)
        ? state.selectedOptions.filter(
            (selectedOption) => selectedOption !== option
          )
        : [...state.selectedOptions, option];

      setState((prevState) => ({
        ...prevState,
        selectedOptions,
      }));

      props.onSelect(selectedOptions);
    }
    if (props.selectType === "OneChoice") {
      const selectedOptions = state.selectedOptions.includes(option)
        ? []
        : [option];

      setState((prevState) => ({
        ...prevState,
        selectedOptions,
      }));

      props.onSelect(selectedOptions);
    }
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
