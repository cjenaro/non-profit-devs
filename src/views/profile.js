import { useContext, useState } from "react";
//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import { UserContext } from "../context/UserContext";

import useMount from "../hooks/use-mount";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Divider from "../components/Divider";
import ProjectItem from "../components/ProjectItem";
import { useGetUser } from "../hooks/use-devs";

export default function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [skill, setSkill] = useState();
  const getUser = useGetUser(user);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
  };

  useMount(() => {
    setUser({ ...user });
  });

  const handleSkills = (skill) => {
    setSkill(skill);
  };

  if (!user) return null;

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;

        .submit-btn {
          margin-top: 40px;
          width: 100%;
          border: 1px solid var(--lavender);
          color: var(--lavender);
          background-color: var(--emberr);
        }

        @media (min-width: 768px) {
          padding-bottom: 50px;
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {user.name}.
        </Title>

        <pre>{getUser.data && JSON.stringify(getUser.data, null, 2)}</pre>

        <form onSubmit={handleUserUpdate}>
          <Input
            label="Email:"
            placeholder={getUser.data && getUser.data.users_by_pk.email}
            name="email"
            id="email"
          />
          <Input
            label="Name:"
            name="name"
            placeholder={getUser.data && getUser.data.users_by_pk.name}
            id="name"
            styles={css`
              margin-top: 16px;
            `}
          />
          {/* {!skills.loading && !skills.error && (
            <Select
              styles={css`
                margin-top: 16px;
              `}
              placeholder={getSkill() || "Skills"}
              onChange={handleSkills}
              options={skills.data.skills}
            />
          )}
          <Button
            loading={addSkillRes.loading || loading}
            className="submit-btn"
          >
            Submit
          </Button> */}
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label="password change"
        styles={css`
          margin-top: 50px;
          margin-bottom: 30px;
        `}
      />
      <div className="container">
        <form onSubmit={handlePasswordChange}>
          <Input
            styles={css`
              margin-top: 16px;
            `}
            type="password"
            label="Old password:"
            name="oldPassword"
            id="oldPassword"
          />
          <Input
            styles={css`
              margin-top: 16px;
            `}
            type="password"
            label="New password:"
            name="newPassword"
            id="newPassword"
          />
          <Input
            styles={css`
              margin-top: 16px;
            `}
            type="password"
            label="Confirm password:"
            name="confirmPassword"
            id="confirmPassword"
          />
          <Button className="submit-btn">Change password</Button>
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label="your projects"
        styles={css`
          margin-top: 50px;
          margin-bottom: 30px;
        `}
      />
      <div className="container">
        <ul>
          {!getUser.loading &&
            getUser.data &&
            getUser.data.users_by_pk.userProjects.map(
              ({ userProjects: project }) => (
                <li
                  css={css`
                    margin-bottom: 45px;
                    min-height: 17px;
                    border: 3px solid var(--lavender);
                  `}
                  key={project.id}
                >
                  <ProjectItem project={project} />
                </li>
              )
            )}
        </ul>
      </div>
    </section>
  );
}
