import "./styles.scss";

import { FC } from "react";

type Properties = {
  text: string;
  onClick?: () => unknown;
};

const RemoveButton: FC<Properties> = ({ text, onClick }) => (
  <button type="button" className="remove-button" onClick={onClick}>
    {text}
  </button>
);

RemoveButton.defaultProps = {
  onClick: undefined,
};

export default RemoveButton;
