import "./styles.scss";

import { FC, InputHTMLAttributes } from "react";

type Properties = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Properties> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading,react/destructuring-assignment
  <input {...props} className={`generic-input ${props.className}` || ""} />
);

export default Input;
