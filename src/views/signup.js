//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { navigate } from "@reach/router";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useSignup, useLogin } from "../hooks/use-devs";
import { useGetSkills } from "../hooks/use-skills";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Select from "../components/Select";

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

  const getSkillLabel = (value) => {
    return value
      .split("_")
      .map((word) => `${word[0]}${word.slice(1).toLowerCase()}`)
      .join(" ");
  };

  const getSkillOptions = () => {
    return (
      skillsData &&
      skillsData.__type.enumValues.map((enumValue) => ({
        label: getSkillLabel(enumValue.name),
        value: enumValue.name,
      }))
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const signupInput = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
      skills: skills,
    };

    const loginInput = {
      email: e.target.email.value,
      password: e.target.password.value,
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
          min-height: calc(100vh - 228px);
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          Sign Up.
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
            label="Name:"
            name="name"
            id="name"
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label="Password:"
            name="password"
            id="password"
          />
          {!skillsLoading && (
            <React.Fragment>
              <Select
                label="Skills"
                styles={css`
                  margin-bottom: 16px;
                `}
                placeholder={"Skills"}
                onChange={handleSkills}
                options={getSkillOptions()}
              />
            </React.Fragment>
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
