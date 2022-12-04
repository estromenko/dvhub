import "./styles.scss";

import { FC } from "react";

type Properties = {
  onClick?: () => unknown;
};

const CreateTheFirstOneButton: FC<Properties> = ({ onClick }) => (
  <button
    type="button"
    className="create-the-first-one-button"
    onClick={onClick}
  >
    Create the first one!
  </button>
);

CreateTheFirstOneButton.defaultProps = {
  onClick: undefined,
};

export default CreateTheFirstOneButton;
