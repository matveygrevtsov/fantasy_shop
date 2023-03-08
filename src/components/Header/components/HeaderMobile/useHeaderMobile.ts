import { useState } from "react";
import { useClickOutsideListener } from "../../../../hooks/useClickOutsideListener";

export const useHeaderMobile = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { ref } = useClickOutsideListener(() => {
    if (isOpened) {
      setIsOpened(false);
    }
  });

  const handleClick = () => setIsOpened((prevValue) => !prevValue);

  return { ref, isOpened, handleClick };
};
