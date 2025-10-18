import { useNavigate } from 'react-router';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import { useSignup } from '../hooks/use-devs';
import { useGetSkills } from '../hooks/use-skills';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';

import Select from '../components/Select';

export function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<any>(null);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const [skills, setSkills] = useState<string[]>([]);
  const [user, setUser] = useContext(UserContext);

  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useSignup();

  const {
    skills: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useGetSkills();

  const handleSkills = (skill: any[]) => {
    setSkills(skill.map((s) => s.value));
  };

  const handleFormSubmit = async (e: any) => {
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

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  return (
    <section className="pt-[50px] pb-[100px] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {t('SIGNUP')}
        </Title>

        <form onSubmit={handleFormSubmit} className="mt-16 mb-4">
          <Input
            className="mb-4"
            label={`${t('SIGNUP_EMAIL')}:`}
            name="email"
            id="email"
            value={loginInput.email}
            onChange={handleLoginInput}
          />
          <Input
            className="mb-4"
            label={`${t('SIGNUP_NAME')}:`}
            name="name"
            id="name"
          />
          <Input
            className="mb-4"
            label={`${t('SIGNUP_PASSWORD')}:`}
            name="password"
            id="password"
            type="password"
            value={loginInput.password}
            onChange={handleLoginInput}
          />
          <Input
            className="mb-4"
            label={`${t('SIGNUP_CONFIRM_PASSWORD')}:`}
            name="confirmPassword"
            id="confirmPassword"
            type="password"
          />
          {!skillsLoading && (
            <Select
              label={t('SIGNUP_SKILLS')}
              styles="mb-4"
              placeholder={t('SIGNUP_SKILLS')}
              onChange={handleSkills}
              options={skillsData}
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
