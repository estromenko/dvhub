import "./style.scss";

import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Properties = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const SubmitButton: FC<Properties> = (props) => (
  <button
    type="button"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    // eslint-disable-next-line react/destructuring-assignment
    className={`generic-submit-button ${props.className || ""}`}
  >
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </button>
);

export default SubmitButton;
