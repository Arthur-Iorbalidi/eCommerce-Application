import { Link, useNavigate } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Customer } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { BsEnvelopeFill, BsPersonFillLock } from 'react-icons/bs';
import Alert from 'react-bootstrap/Alert';

import { useEffect, useState } from 'react';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import {
  activateAuthorizationState,
  changeUserInfo,
} from '../../../../store/reducers/authorizationState';

import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import Loader from '../../../../shared/ui/Loader/loader';
import styles from './loginForm.module.scss';

// api
import logInUser from '../../../../services/api/auth/logInUser';
import getValidationSchema from './validationSchema';

interface LoginFormFields {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  // const res = useAppSelector(
  //   (state) => state.authorizationStateReducer.isAuthorized,
  // );

  const dispatch = useAppDispatch();
  const [modal, setModal] = useState({
    isShowed: false,
    text: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = getValidationSchema();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const successUserReg = (value: Customer) => {
    reset();
    setIsLoading(false);
    navigate('/');
    dispatch(activateAuthorizationState(true));
    dispatch(changeUserInfo(value));
  };

  const errorUserReg = (message: string | undefined) => {
    setIsLoading(false);

    if (message) {
      setModal(() => {
        return {
          isShowed: true,
          text: message,
        };
      });

      setTimeout(() => {
        setModal({ isShowed: false, text: '' });
      }, 6000);
    }
  };

  const onSubmit: SubmitHandler<LoginFormFields> = (data: LoginFormFields) => {
    setIsLoading(true);
    logInUser(data.email, data.password, successUserReg, errorUserReg);
  };

  return (
    <>
      <form
        data-testid="login_form"
        className={styles.login_form}
        onSubmit={handleSubmit(onSubmit)}
      >
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

        {modal.isShowed && (
          <Alert
            className={styles.alert}
            variant="danger"
            onClose={() => {
              setModal({ isShowed: false, text: '' });
            }}
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{modal.text}</p>
          </Alert>
        )}
      </form>

      {isLoading && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default LoginForm;
