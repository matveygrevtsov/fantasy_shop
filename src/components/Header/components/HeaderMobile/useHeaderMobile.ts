import { useState } from "react";

export const useHeaderMobile = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClick = () => setIsOpened((prevValue) => !prevValue);

  return { isOpened, handleClick };
};
