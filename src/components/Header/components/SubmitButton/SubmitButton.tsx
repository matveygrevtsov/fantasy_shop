import cn from "classnames";

import s from "./SubmitButton.module.css";

interface Props {
  className?: string;
  children?: JSX.Element | string;
  disabled?: boolean;
  onClick?: () => void;
}

export const SubmitButton: React.FC<Props> = ({
  className,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={cn(s.root, className)}
    >
      {children}
    </button>
  );
};
