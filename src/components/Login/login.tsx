import LoginForm from './components/loginForm/loginForm';
import styles from './login.module.scss';

function Login() {
  return (
    <div data-testid="login_container" className={styles.login_container}>
      <LoginForm />
    </div>
  );
}

export default Login;
