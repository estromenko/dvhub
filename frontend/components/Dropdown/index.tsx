import "./styles.scss";

import { FC, useState } from "react";

type Properties = {
  options: string[];
  title: string;
};

const Dropdown: FC<Properties> = ({ title, options }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropdown__title"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && (
        <div className="dropdown__options">
          {options.map((option) => (
            <p className="dropdown__option" key={option}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
