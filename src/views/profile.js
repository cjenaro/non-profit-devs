import { useContext, useState } from "react";
//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import { UserContext } from "../context/UserContext";
import { useAuth } from "react-use-auth";
import useMount from "../hooks/use-mount";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Divider from "../components/Divider";
import { Link } from "@reach/router";

const USER_QUERY = gql`
  query USER_QUERY {
    users_by_pk(id: "google-oauth2|113155641271523621296") {
      email
      name
      skills
    }
  }
`;

const projects = [
  {
    name: "Water Org.",
    id: 1,
  },
  {
    name: "Pet Shelter.",
    id: 2,
  },
  {
    name: "UNICEF.",
    id: 3,
  },
];

export default function Profile() {
  const { user, accessToken } = useAuth();
  const [myUser, setUser] = useContext(UserContext);
  const [skill, setSkill] = useState();
  const { data, loading, error } = useQuery(USER_QUERY);

  const handleUserUpdate = (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
  };

  useMount(() => {
    setUser({ ...user, ...accessToken });
  });

  const handleSkills = (skill) => {
    setSkill(skill);
  };

  if (!myUser) return null;

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
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {myUser.name}.
        </Title>

        <form onSubmit={handleUserUpdate}>
          <Input
            label="Email:"
            placeholder={myUser.email}
            name="email"
            id="email"
          />
          <Select
            styles={css`
              margin-top: 16px;
            `}
            placeholder="Skill"
            onChange={handleSkills}
          />
          <Button className="submit-btn">Submit</Button>
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
          {projects.map((project) => (
            <li
              css={css`
                margin-bottom: 45px;
                min-height: 17px;
                border: 3px solid var(--lavender);
              `}
              key={project.id}
            >
              <Link
                to="/projects"
                css={css`
                  text-decoration: none;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 17px 14px;
                  color: var(--lavender);
                `}
              >
                <p
                  css={css`
                    margin: 0;
                    font-size: 30px;
                  `}
                >
                  {project.name}
                </p>
                <p
                  css={css`
                    margin: 0;
                    font-size: 30px;
                  `}
                >
                  &rarr;
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
