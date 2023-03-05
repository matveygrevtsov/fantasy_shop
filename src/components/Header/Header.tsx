import { HeaderDesktop } from "./components/HeaderDesktop/HeaderDesktop";
import { HeaderMobile } from "./components/HeaderMobile/HeaderMobile";

import s from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <HeaderMobile className={s.headerMobile} />
      <HeaderDesktop className={s.headerDesktop} />
    </>
  );
};
