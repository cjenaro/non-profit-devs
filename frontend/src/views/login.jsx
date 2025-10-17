//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router';
import { useLogin } from '../hooks/use-devs';
import Title from '../components/Title.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useLogin();
  const [user, setUser] = useContext(UserContext);
  const { t } = useTranslation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({
      variables: {
        input: {
          email: e.target.email.value,
          password: e.target.password.value,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.login) {
      setUser({ ...data.login.token, ...data.login.user });
    }
  }, [data, setUser]);

  useEffect(() => {
    if (user && user.token) {
      navigate('/projects');
    }
  }, [user]);
  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;
        min-height: calc(100vh - 278px);

        @media (min-width: 768px) {
          padding-bottom: 50px;
          min-height: calc(100vh - 228px);
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {t('LOGIN')}
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
            label={`${t('LOGIN_EMAIL')}:`}
            name="email"
            id="email"
          />
          <Input
            styles={css`
              margin-bottom: 16px;
            `}
            label={`${t('LOGIN_PASSWORD')}:`}
            name="password"
            type="password"
            id="password"
          />
          <Button loading={loading}>{t('LOGIN_SUBMIT')}</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  );
}
