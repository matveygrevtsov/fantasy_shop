import cn from "classnames";

import s from "./Select.module.css";

interface Props<T> {
  options: Record<string, string>;
  title: string;
  onChange?: (option: T) => void;
  className?: string;
}

export function Select<T>({ options, title, onChange, className }: Props<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as unknown as T;
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  return (
    <select onChange={handleChange} className={cn(s.root, className)}>
      <option disabled selected>
        {title}
      </option>
      {Object.entries(options).map(([key, value]) => (
        <option value={key} key={key}>
          {value}
        </option>
      ))}
    </select>
  );
}
