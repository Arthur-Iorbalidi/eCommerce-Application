import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BsPersonFillLock } from 'react-icons/bs';

import 'react-datetime/css/react-datetime.css';

import { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { Alert } from 'react-bootstrap';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import { changeUserInfo } from '../../../../store/reducers/authorizationSlice';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './userPassword.module.scss';

import getValidationSchema from './passValidtaionSchema';

// api
import changeUserPassword from '../../../../services/api/userAccount/changePasswordd';

import type { PasswordFormFields } from '../interfaces';

function TransformData(data: PasswordFormFields, userInfo: Customer) {
  return {
    id: userInfo.id,
    version: userInfo.version,
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    email: userInfo.email,
  };
}

function UserPassword() {
  //   const dispatch = useAppDispatch();

  const userInfo = useAppSelector(
    (state) => state.authorizationStateReducer.userInfo as unknown as Customer,
  );

  const [activatePassword, changeActivatePassword] = useState(true);
  const [modalError, setModalError] = useState({
    isShowed: false,
    text: '',
  });
  const [modalSuccess, setModalSuccess] = useState({
    isShowed: false,
    text: '',
  });

  function requestEffects(request: {
    body?: Customer;
    message?: string;
    statusCode?: number | undefined;
  }) {
    changeActivatePassword(() => true);

    if (request.statusCode === 200) {
      setModalSuccess(() => ({
        isShowed: true,
        text: 'Changes successfully applied.',
      }));
      setTimeout(
        () =>
          setModalSuccess((state) => ({
            ...state,
            isShowed: false,
          })),
        3000,
      );
    } else {
      setModalError(() => ({
        isShowed: true,
        text: `${request.message}`,
      }));
      setTimeout(
        () =>
          setModalError((state) => ({
            ...state,
            isShowed: false,
          })),
        3000,
      );
    }
  }

  const validationSchema = getValidationSchema();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  function changeUserInfoFromChild(value: Customer): void {
    dispatch(changeUserInfo(value));
  }
  function changeUser(userState: {
    id: string;
    version: number;
    currentPassword: string;
    newPassword: string;
    email: string;
  }) {
    const token = JSON.parse(
      localStorage.getItem('token') as string,
    ).refreshToken;
    changeUserPassword({ token, ...userState })(
      changeUserInfoFromChild,
      requestEffects,
    );
    reset();
  }

  //   const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<PasswordFormFields> = (
    data: PasswordFormFields,
  ) => {
    changeUser(TransformData(data, userInfo));
    return data;
  };

  return (
    <form
      data-testid="ccountInfo2"
      className={styles.registration_form}
      // @ts-expect-error: Unreachable code error
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className={styles.password_main}>Change password</h3>

      <div className={styles.profile_string}>
        <p>Your password:</p>
        <Input
          {...register('currentPassword')}
          icon={<BsPersonFillLock />}
          isSecretInput
          error={Boolean(errors?.currentPassword?.message)}
          helperText={String(errors?.currentPassword?.message ?? '')}
          disabled={activatePassword}
        />
      </div>
      <div className={styles.profile_string}>
        <p>New password:</p>
        <Input
          {...register('newPassword')}
          icon={<BsPersonFillLock />}
          isSecretInput
          error={Boolean(errors?.newPassword?.message)}
          helperText={String(errors?.newPassword?.message ?? '')}
          disabled={activatePassword}
        />
      </div>
      <Button
        value={activatePassword ? 'Edit' : 'Ok'}
        color="green"
        type="button"
        onClick={() => changeActivatePassword((state) => !state)}
      />

      {modalError.isShowed && (
        <Alert variant="danger" className={styles.modal}>
          {modalError.text}
        </Alert>
      )}
      {modalSuccess.isShowed && (
        <Alert variant="success" className={styles.modal}>
          {modalSuccess.text}
        </Alert>
      )}

      <div className={styles.saveButtonString}>
        <Button value="Save" color="grey" type="submit" />
      </div>
    </form>
  );
}

export default UserPassword;
