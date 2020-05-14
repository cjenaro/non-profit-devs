//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { navigate } from "@reach/router";
import { useLogin } from "../hooks/use-devs";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function Login() {
  const [login, { data, loading, error }] = useLogin();
  const [user, setUser] = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({
      variables: {
        input: {
          email: e.taget.email.value,
          password: e.taget.password.value,
        },
      },
    });

    if (data) {
      setUser({ ...user, jwt: data.token });
    }

    if (!error) {
      navigate("/profile");
    }
  };

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;

        @media (min-width: 768px) {
          padding-bottom: 50px;
          min-height: calc(100vh - 228px);
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          Login.
        </Title>

        <form
          onSubmit={handleFormSubmit}
          css={css`
            margin-top: 4rem;
            margin-bottom: 16px;
          `}
        >
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label="Email:"
            name="email"
            id="email"
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label="Password:"
            name="password"
            id="password"
          />
          <Button loading={loading}>Submit</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  );
}
