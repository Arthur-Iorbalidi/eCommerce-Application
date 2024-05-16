import RegistrationForm from './components/registrationForm/registrationFrom';
import styles from './registration.module.scss';

function Registration() {
  return (
    <div className={styles.registration_container}>
      <RegistrationForm />
    </div>
  );
}

export default Registration;
