import { useState } from "react";
import { useClickOutsideListener } from "../../../../hooks/useClickOutsideListener";

export const useHeaderMobile = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleClose = () => {
    if (isOpened) {
      setIsOpened(false);
    }
  };

  const { ref } = useClickOutsideListener(handleClose);

  const handleClick = () => setIsOpened((prevValue) => !prevValue);

  return { ref, isOpened, handleClick, handleClose };
};
