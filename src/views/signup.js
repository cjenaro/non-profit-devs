//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useContext } from "react";
import Input from "../components/Input";
import { useSignup, useLogin } from "../hooks/use-devs";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "../components/ErrorMessage";
import { navigate } from "@reach/router";
import Select from "../components/Select";
import { useGetSkills } from "../hooks/use-skills";

export default function Signup() {
  const [skills, setSkills] = useState();
  const [user, setUser] = useContext(UserContext);

  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useSignup();
  const [
    login,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useLogin();
  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useGetSkills();

  const handleSkills = (skill) => {
    setSkills(skill);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const signupInput = {
      email: e.taget.email.value,
      password: e.taget.password.value,
      name: e.taget.name.value,
      skills: skills,
    };

    const loginInput = {
      email: e.taget.email.value,
      password: e.taget.password.value,
    };

    await signup({
      variables: {
        input: signupInput,
      },
    });

    if (signupError) return;

    await login({
      variables: {
        input: loginInput,
      },
    });

    if (loginError) return;

    if (signupData && loginData) {
      setUser({ ...user, ...signupData, jwt: loginData.token });
    }

    navigate("/profile");
  };

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;

        @media (min-width: 768px) {
          padding-bottom: 50px;
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          Login.
        </Title>

        <form onSubmit={handleFormSubmit}>
          <Input label="Email:" name="email" id="email" />
          <Input label="Name:" name="name" id="name" />
          <Input label="Password:" name="password" id="password" />
          {!skillsLoading && (
            <>
              <Select
                styles={css`
                  margin-top: 16px;
                `}
                placeholder={"Skills"}
                onChange={handleSkills}
                options={[]}
              />
              <pre>{JSON.stringify(skillsData, null, 2)}</pre>
            </>
          )}
          <Button loading={signupLoading || loginLoading || skillsLoading}>
            Submit
          </Button>
        </form>
        <ErrorMessage error={signupError || loginError || skillsError} />
      </div>
    </section>
  );
}
