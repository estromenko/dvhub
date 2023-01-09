import AuthForm from "components/AuthForm";
import Input from "components/Input";
import { FC, useState } from "react";
import { setAccessToken, setRefreshToken } from "utils/auth";

const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const [error, setError] = useState("");

  const register = async () => {
    if (repeatedPassword !== password) {
      setError("Passwords do not match");
      return;
    }

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

    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    window.location.assign("/");
  };

  return (
    <AuthForm onClick={register} error={error}>
      <label className="form-fields__input-row">
        Username
        <Input
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="form-fields__input-row">
        Email
        <Input
          type="email"
          required
          onChange={(event) => setEmail(event.target.value)}
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
      <label className="form-fields__input-row">
        Repeat Password
        <Input
          type="password"
          name="repeated-password"
          required
          onChange={(event) => setRepeatedPassword(event.target.value)}
        />
      </label>
    </AuthForm>
  );
};

export default Registration;
