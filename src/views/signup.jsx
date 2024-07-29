//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext.jsx';
import { useSignup } from '../hooks/use-devs';
import { useGetSkills } from '../hooks/use-skills';
import Input from '../components/Input.jsx';
import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Select from '../components/Select.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useSignup();

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useGetSkills();

  const handleSkills = (skill) => {
    setSkills(skill.map((s) => s.value));
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setError({ message: t('PASSWORDS_DO_NOT_MATCH') });
      return;
    }

    const signupInput = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
      skills: skills,
    };

    await signup({
      variables: {
        input: signupInput,
      },
    });
  };

  useEffect(() => {
    if (signupData && signupData.signup) {
      setUser({ ...signupData.signup });
      navigate('/login');
    }
  }, [signupData, setUser]);

  useEffect(() => {
    if (user && user.token) {
      navigate('/profile');
    }
  }, [user]);

  const handleLoginInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
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
          {t('SIGNUP')}
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
            label={`${t('SIGNUP_EMAIL')}:`}
            name="email"
            id="email"
            value={loginInput.email}
            onChange={handleLoginInput}
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label={`${t('SIGNUP_NAME')}:`}
            name="name"
            id="name"
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label={`${t('SIGNUP_PASSWORD')}:`}
            name="password"
            id="password"
            type="password"
            value={loginInput.password}
            onChange={handleLoginInput}
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label={`${t('SIGNUP_CONFIRM_PASSWORD')}:`}
            name="confirmPassword"
            id="confirmPassword"
            type="password"
          />
          {!skillsLoading && (
            <Select
              label={t('SIGNUP_SKILLS')}
              styles={css`
                margin-bottom: 16px;
              `}
              placeholder={t('SIGNUP_SKILLS')}
              onChange={handleSkills}
              options={getSkillOptions()}
            />
          )}
          <Button loading={signupLoading || skillsLoading}>
            {t('SIGNUP_SUBMIT')}
          </Button>
        </form>
        <ErrorMessage error={signupError || skillsError || error} />
      </div>
    </section>
  );
}
