import RegistrationForm from './components/registrationForm/registrationForm';
import styles from './registration.module.scss';

function Registration() {
  return (
    <div className={styles.registration_container}>
      <div className={styles.wrapper}>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registration;
