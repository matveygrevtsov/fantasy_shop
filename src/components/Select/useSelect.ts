import { useState } from "react";

interface State<T> {
  isOpened: boolean;
  activeOption: T | undefined;
}

export function useSelect<T>(onChange: (option?: T) => void) {
  const [state, setState] = useState<State<T>>({
    isOpened: false,
    activeOption: undefined,
  });

  function handleOpenCloseClick() {
    setState((prevState) => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }));
  }

  function handleSelect(option: T) {
    const newActiveOption = state.activeOption === option ? undefined : option;
    onChange(newActiveOption);
    setState((prevState) => ({ ...prevState, activeOption: newActiveOption }));
  }

  return { state, handleSelect, handleOpenCloseClick };
}
