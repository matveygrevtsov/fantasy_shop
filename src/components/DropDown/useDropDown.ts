import { useState } from "react";

export function useDropDown() {
  const [opened, setIsOpened] = useState<boolean>(false);
  const handleClick = () => setIsOpened((prevState) => !prevState);

  return { opened, handleClick };
}
