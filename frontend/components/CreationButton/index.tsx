import "./styles.scss";

import addImage from "assets/add.png";
import { FC } from "react";

type Properties = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const CreationButton: FC<Properties> = ({ text, onClick, className }) => (
  <button type="button" onClick={onClick} className={`creation-button ${className || ""}`}>
    <img src={addImage} alt="Add" />
    {text}
  </button>
);

CreationButton.defaultProps = {
  onClick: () => ({}),
  className: "",
};

export default CreationButton;
