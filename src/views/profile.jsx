import { useContext, useState } from 'react';
//* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { redirectTo, Link } from '@reach/router';

import { UserContext } from '../context/UserContext.jsx';
import { useUpdateUser, useChangePassword } from '../hooks/use-devs';
import { useGetSkills } from '../hooks/use-skills';

import Title from '../components/Title.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Select from '../components/Select.jsx';
import Divider from '../components/Divider.jsx';
import ProjectItem from '../components/ProjectItem.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation();
  const [passwordError, setPasswordError] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [skill, setSkill] = useState(
    user && user.skills && user.skills.map((s) => s.value)
  );

  const [
    updateUser,
    { error: updateUserError, loading: updateUserLoading },
  ] = useUpdateUser();

  const [
    changePassword,
    { error: changePasswordError, loading: changePasswordLoading },
  ] = useChangePassword();

  const { data: skillsData } = useGetSkills();

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    const updateInput = {
      name: e.target.name.value || user.name,
      skills: skill,
      email: e.target.email.value || user.email,
    };

    await updateUser({ variables: { id: user.id, input: updateInput } });
    if (!updateUserError && !updateUserLoading) {
      setUser({ ...user, ...updateInput });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (e.target.confirmPassword.value !== e.target.newPassword.value) {
      setPasswordError(t('PASSWORDS_DO_NOT_MATCH'));
      return;
    }

    const updateInput = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    };

    await changePassword({ variables: { id: user.id, input: updateInput } });
  };

  const handleSkills = (skill) => {
    setSkill(skill.map((s) => s.value));
  };

  const getSkillLabel = (value) => {
    return value
      .split('_')
      .map((word) => `${word[0]}${word.slice(1).toLowerCase()}`)
      .join(' ');
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

  const getInitialSkills = () => {
    return (
      user &&
      user.skills &&
      user.skills.length &&
      user.skills.map((value) => ({ label: getSkillLabel(value), value }))
    );
  };

  if (!user) return redirectTo('/login');

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
          background-color: var(--ember);
          &.loading {
            &::before {
              color: var(--lavender);
            }
          }
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

        <p>
          {t('IF_YOU_HAVE_NOT_JOINED_OUR_SLACK_WORKSPACE_YET')}{' '}
          <a
            rel="noopener noreferrer"
            css={css`
              color: currentColor;
            `}
            href="https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw"
            target="_blank"
          >
            {t('HERE_IS_THE_LINK')}
          </a>
        </p>
        <form onSubmit={handleUserUpdate}>
          <Input
            label={`${t('PROFILE_EMAIL')}:`}
            placeholder={user.email}
            name="email"
            id="email"
          />
          <Input
            label={`${t('PROFILE_NAME')}:`}
            name="name"
            placeholder={user.name}
            id="name"
            styles={css`
              margin-top: 16px;
            `}
          />
          {skillsData && (
            <Select
              styles={css`
                margin-top: 16px;
              `}
              initialSelectedItems={getInitialSkills()}
              placeholder={`${t('PROFILE_SKILLS')}:`}
              label={`${t('PROFILE_SKILLS')}:`}
              onChange={handleSkills}
              options={getSkillOptions()}
            />
          )}
          <Button loading={updateUserLoading} className="submit-btn">
            {t('PROFILE_SUBMIT')}
          </Button>
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label={t('PROFILE_CHANGE_PASSWORD')}
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
            label={`${t('PROFILE_OLD_PASSWORD')}:`}
            name="oldPassword"
            id="oldPassword"
          />
          <Input
            styles={css`
              margin-top: 16px;
            `}
            type="password"
            label={`${t('PROFILE_NEW_PASSWORD')}:`}
            name="newPassword"
            id="newPassword"
          />
          <Input
            styles={css`
              margin-top: 16px;
            `}
            type="password"
            label={`${t('PROFILE_CONFIRM_PASSWORD')}:`}
            name="confirmPassword"
            id="confirmPassword"
          />
          <Button loading={changePasswordLoading} className="submit-btn">
            {t('PROFILE_CHANGE_PASSWORD')}
          </Button>
          <ErrorMessage error={passwordError || changePasswordError} />
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label={t('YOUR_PROJECTS')}
        styles={css`
          margin-top: 50px;
          margin-bottom: 30px;
        `}
      />
      <div className="container">
        <ul>
          {user.projects.length > 0 ? (
            user.projects.map((project) => (
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
            ))
          ) : (
            <h1>
              {t('THIS_LOOKS_REALLY_EMPTY')}{' '}
              <Link
                css={css`
                  color: currentColor;
                `}
                to="/projects"
              >
                {t('GO_TO_PROJECTS')} &rarr;
              </Link>
            </h1>
          )}
        </ul>
      </div>
    </section>
  );
}
