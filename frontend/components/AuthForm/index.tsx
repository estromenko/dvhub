import "./styles.scss";

import { FC, PropsWithChildren } from "react";

import SubmitButton from "../SubmitButton";

type Properties = PropsWithChildren & {
  onClick?: () => void;
  error?: string;
};

const AuthForm: FC<Properties> = ({ children, onClick, error }) => (
  <div className="auth-form">
    <h1>Authorize to continue</h1>
    <form className="form-fields">
      {children}
      {error && <div className="form-fields__error">{error}</div>}
      <SubmitButton
        type="button"
        className="form-fields__input-row form-fields__input-row_center"
        onClick={onClick}
      >
        Submit
      </SubmitButton>
    </form>
  </div>
);

AuthForm.defaultProps = {
  onClick: undefined,
  error: "",
};

export default AuthForm;
