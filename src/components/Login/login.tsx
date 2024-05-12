import LoginForm from './components/loginForm/loginForm';
import styles from './login.module.scss';

function Login() {
  return (
    <div className={styles.login_container}>
      <LoginForm />
    </div>
  );
}

export default Login;
