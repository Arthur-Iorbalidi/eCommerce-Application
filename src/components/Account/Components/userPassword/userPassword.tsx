import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BsPersonFillLock } from 'react-icons/bs';

import 'react-datetime/css/react-datetime.css';

import { useState } from 'react';
// import useAppDispatch from "../../../../shared/hooks/useAppDispatch";
import { Customer } from '@commercetools/platform-sdk';

import useAppSelector from '../../../../shared/hooks/useAppSelector';
// import { changeUserInfo } from "../../../../store/reducers/authorizationState";

import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './userPassword.module.scss';

import getValidationSchema from '../../validationSchema';

// api
// import changeUserSettings from "../../../../services/api/userAccount/changeUserSettings";

import type { RegistrationFormFields } from '../interfaces';

// function TransformData(data: RegistrationFormFields) {
//   return {
//     email: data.email,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     dateOfBirth: data.birthDate,
//     addresses: [
//       {
//         key: "SHIPPING",
//         streetName: data.streetName,
//         postalCode: data.postalCode,
//         city: data.city,
//         country: data.country,
//       },
//       {
//         key: "BILLING",
//         streetName: isAlsoBilling ? data.streetName : data.streetNameBilling,
//         postalCode: isAlsoBilling ? data.postalCode : data.postalCodeBilling,
//         city: isAlsoBilling ? data.city : data.cityBilling,
//         country: isAlsoBilling ? data.country : data.countryBilling,
//       },
//     ],
//     billingAddresses: [1],
//     shippingAddresses: [0],
//     ...(isDefaultBilling ? { defaultBillingAddress: 1 } : {}),
//     ...(isDefaultShipping ? { defaultShippingAddress: 0 } : {}),
//   };
// }

function UserPassword() {
  //   const dispatch = useAppDispatch();

  const userInfo = useAppSelector(
    (state) => state.authorizationStateReducer.userInfo as unknown as Customer,
  );
  //   function changeUserInfroFromChild(value): void {
  //     dispatch(changeUserInfo(value));
  //   }
  //   function changeUser() {
  //     const token = JSON.parse(localStorage.getItem("token")).refreshToken;
  //     changeUserSettings({ token, ...userInfo })(changeUserInfroFromChild);
  //   }

  //   const [modal, setModal] = useState({
  //     isShowed: true,
  //     text: "ErrorHandle",
  //   });

  //   const [isLoading, setIsLoading] = useState(false);

  const validationSchema = getValidationSchema();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      birthDate: userInfo.dateOfBirth,
      streetName: userInfo.addresses[0].streetName,
      city: userInfo.addresses[0].city,
      postalCode: userInfo.addresses[0].postalCode,
      country: userInfo.addresses[0].country,
      streetNameBilling: userInfo.addresses[1].streetName,
      cityBilling: userInfo.addresses[1].city,
      postalCodeBilling: userInfo.addresses[1].postalCode,
      countryBilling: userInfo.addresses[1].country,
    },
  });
  const onSubmit: SubmitHandler<RegistrationFormFields> = (
    data: RegistrationFormFields,
  ) => {
    // setIsLoading(true);
    // changeUser();
    return data;
  };

  const [activatePassword, changeActivatePassword] = useState(true);

  return (
    <form
      data-testid="ccountInfo"
      className={styles.registration_form}
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

      {/* {modal.isShowed && <Alert variant="danger">{modal.text}</Alert>} */}

      <div className={styles.saveButtonString}>
        <Button value="Save" color="grey" type="submit" />
      </div>
    </form>
  );
}

export default UserPassword;
