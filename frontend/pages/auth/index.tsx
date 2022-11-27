import "./styles.scss";

import Cookie from "js-cookie";
import { FC, useState } from "react";

import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";

const Auth: FC = () => {
  const [signUpSelected, setSignUpSelected] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const [error, setError] = useState("");

  const onTypeChange = () => {
    setError("");
    setSignUpSelected(!signUpSelected);
  };

  const login = async () => {
    const response = await fetch("/api/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status >= 400) {
      setError("Username or password is wrong");
      return;
    }

    const data = await response.json();

    Cookie.set("accessToken", data.access);
    Cookie.set("refreshToken", data.refresh);

    window.location.assign("/");
  };

  const register = async () => {
    const response = await fetch("/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    if (response.status !== 201) {
      setError("Failed to register user");
      return;
    }

    const data = await response.json();

    Cookie.set("accessToken", data.access);
    Cookie.set("refreshToken", data.refresh);

    window.location.assign("/");
  };

  const onSignInClick = () => {
    login().finally();
  };

  const onSignUpClick = () => {
    if (repeatedPassword !== password) {
      setError("Passwords do not match");
      return;
    }

    register().finally();
  };

  const onClick = () => {
    if (signUpSelected) {
      onSignUpClick();
    } else {
      onSignInClick();
    }
  };

  return (
    <div className="auth-form">
      <h1>Authorize to continue</h1>
      <div className="auth-type-selectors">
        <label className="auth-type-selectors__selector">
          Sign Up
          <Input
            type="radio"
            name="type"
            checked={signUpSelected}
            onChange={onTypeChange}
          />
        </label>
        <label className="auth-type-selectors__selector">
          Sign In
          <Input
            type="radio"
            name="type"
            checked={!signUpSelected}
            onChange={onTypeChange}
          />
        </label>
      </div>

      <form className="form-fields">
        <label className="form-fields__input-row">
          Username
          <Input
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        {signUpSelected && (
          <label className="form-fields__input-row">
            Email
            <Input
              type="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        )}
        <label className="form-fields__input-row">
          Password
          <Input
            name="password"
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {signUpSelected && (
          <label className="form-fields__input-row">
            Repeat Password
            <Input
              type="password"
              name="repeated-password"
              required
              onChange={(event) => setRepeatedPassword(event.target.value)}
            />
          </label>
        )}
        {error && <div className="form-fields__error">{error}</div>}
        <SubmitButton
          type="button"
          className="form-fields__input-row form-fields__input-row_center"
          onClick={onClick}
        >
          {signUpSelected ? "Sign Up" : "Sign In"}
        </SubmitButton>
      </form>
    </div>
  );
};

export default Auth;
