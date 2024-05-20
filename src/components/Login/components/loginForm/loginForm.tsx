import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsEnvelopeFill, BsPersonFillLock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './loginForm.module.scss';
// api
import { logInUser } from '../../../../services/api/actions';

interface LoginFormFields {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s]*$/, "Email mustn't contain spaces")
    .test('containsAtSymbol', 'Email must contain @ symbol', (value) => {
      const atRegex = /@/;
      return atRegex.test(value);
    })
    .test('domain', 'Email must contain a domain name', (value) => {
      const domainRegex = /@[^\s@]+\.[^\s@]+$/;
      return domainRegex.test(value);
    })
    .email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^[^\s]*$/, "Password mustn't contain spaces")
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .test(
      'specialChar',
      'Password must contain at least one special character',
      (value) => {
        const specialCharRegex = /[@#$%^&*-+]/;
        return specialCharRegex.test(value);
      },
    )
    .min(8, 'Password must be at least 8 characters'),
});

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginFormFields> = (data: LoginFormFields) => {
    logInUser(data.email, data.password, () => navigate('/'));
    reset();
  };

  // const onSubmit: SubmitHandler<LoginFormFields> = (data: LoginFormFields) => {
  //   // console.log(data);с
  //   reset({ email: '', password: '' });
  // };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Welcome Back!</h2>

      <Input
        {...register('email')}
        icon={<BsEnvelopeFill />}
        placeholder="E-mail"
        error={Boolean(errors?.email?.message)}
        helperText={String(errors?.email?.message ?? '')}
      />

      <Input
        {...register('password')}
        icon={<BsPersonFillLock />}
        placeholder="Password"
        isSecretInput
        error={Boolean(errors?.password?.message)}
        helperText={String(errors?.password?.message ?? '')}
      />

      <div>
        <Button value="Sign In" color="green" type="submit" />
        <p>
          Don’t have an account?
          <Link to="/registration">Create</Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
