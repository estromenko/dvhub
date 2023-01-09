import AuthForm from "components/AuthForm";
import Input from "components/Input";
import { FC, useState } from "react";
import { setAccessToken, setRefreshToken } from "utils/auth";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState("");

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

    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    window.location.assign("/");
  };

  return (
    <AuthForm onClick={login} error={error}>
      <label className="form-fields__input-row">
        Username
        <Input
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="form-fields__input-row">
        Password
        <Input
          name="password"
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
    </AuthForm>
  );
};

export default Login;
