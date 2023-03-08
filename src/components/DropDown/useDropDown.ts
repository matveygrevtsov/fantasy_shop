import { useState } from "react";
import { useClickOutsideListener } from "../../hooks/useClickOutsideListener";

export function useDropDown() {
  const [opened, setIsOpened] = useState<boolean>(false);
  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);
  const { ref } = useClickOutsideListener<HTMLDivElement>(handleClose);

  return { opened, ref, handleOpen };
}
