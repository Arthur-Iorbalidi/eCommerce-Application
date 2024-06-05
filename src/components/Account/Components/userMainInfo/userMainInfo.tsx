import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BsEnvelopeFill, BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { LiaCitySolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { useEffect, useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import { Customer } from '@commercetools/platform-sdk';

import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import { changeUserInfo } from '../../../../store/reducers/authorizationSlice';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './userMainInfo.module.scss';

import getValidationSchema, { countries } from './userValidtaionSchema';

// api
import changeUserSettings from '../../../../services/api/userAccount/changeUserSettings';

import type { RegistrationFormFields, ChangeUserProps } from '../interfaces';

function TransformData(data: RegistrationFormFields, userInfo: Customer) {
  return {
    id: userInfo.id,
    version: userInfo.version,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birthDate,
    addresses: [
      {
        key: 'SHIPPING',
        streetName: data.streetName,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
      },
      {
        key: 'BILLING',
        streetName: data.streetNameBilling,
        postalCode: data.postalCodeBilling,
        city: data.cityBilling,
        country: data.countryBilling,
      },
    ],
  };
}

function SelectCurrentUserInfo(userInfo: Customer) {
  return {
    id: userInfo.id,
    version: userInfo.version,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    dateOfBirth: userInfo.dateOfBirth,
    addresses: [
      {
        key: 'SHIPPING',
        streetName: userInfo.addresses[0].streetName,
        postalCode: userInfo.addresses[0].postalCode,
        city: userInfo.addresses[0].city,
        country: userInfo.addresses[0].country,
      },
      {
        key: 'BILLING',
        streetName: userInfo.addresses[1].streetName,
        postalCode: userInfo.addresses[1].postalCode,
        city: userInfo.addresses[1].city,
        country: userInfo.addresses[1].country,
      },
    ],
  };
}

function UserMainInfo() {
  //   const dispatch = useAppDispatch();

  const userInfo = useAppSelector(
    (state) => state.authorizationStateReducer.userInfo as unknown as Customer,
  );

  const [modalError, setModalError] = useState({
    isShowed: false,
    text: '',
  });
  const [modalSuccess, setModalSuccess] = useState({
    isShowed: false,
    text: '',
  });

  const [activateProfile, changeActivateProfile] = useState(true);
  const [activateShipping, changeShipping] = useState(true);
  const [activateBilling, changeBilling] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);

  function requestEffects(requestStatus: number) {
    changeActivateProfile(() => true);
    changeBilling(() => true);
    changeShipping(() => true);

    if (requestStatus === 200) {
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
        text: 'An error occurred while making changes.',
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

  const dispatch = useAppDispatch();
  function changeUserInfoFromChild(value: Customer): void {
    dispatch(changeUserInfo(value));
  }
  function changeUser(userState: ChangeUserProps) {
    const token = JSON.parse(
      localStorage.getItem('token') as string,
    ).refreshToken;
    changeUserSettings({ token, ...userState })(
      changeUserInfoFromChild,
      requestEffects,
    );
  }

  const [currentCountryShipping, setCurrentCountryShipping] = useState('US');
  const handleCountryShippingChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentCountryShipping(event.target.value);
  };

  const [currentCountryBilling, setCurrentCountryBilling] = useState('US');
  const handleCountryBillingChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentCountryBilling(event.target.value);
  };

  const validationSchema = getValidationSchema(
    currentCountryShipping,
    currentCountryBilling,
  );

  const [today, setToday] = useState(moment());
  useEffect(() => {
    setToday(moment());
  }, []);
  const isValidDate = (selectedDate: Moment) => {
    return selectedDate.isSameOrBefore(today);
  };

  const {
    register,
    control,
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
    if (
      // eslint-disable-next-line operator-linebreak
      JSON.stringify(SelectCurrentUserInfo(userInfo)) !==
      JSON.stringify(TransformData(data, userInfo))
    ) {
      changeUser(TransformData(data, userInfo));
    }
    // setIsLoading(true);
  };

  const inputRef = useRef(null);

  return (
    <form
      data-testid="userMainInfo"
      className={styles.registration_form}
      // @ts-expect-error: Unreachable code error
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>My Profile</h2>

      <div className={styles.profile_string}>
        <p>First Name:</p>
        <Input
          {...register('firstName')}
          icon={<BsPersonFill />}
          error={Boolean(errors?.firstName?.message)}
          helperText={String(errors?.firstName?.message ?? '')}
          disabled={activateProfile}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Last Name:</p>
        <Input
          {...register('lastName')}
          icon={<BsPersonFill />}
          error={Boolean(errors?.lastName?.message)}
          helperText={String(errors?.lastName?.message ?? '')}
          disabled={activateProfile}
        />
      </div>

      <div className={styles.profile_string}>
        <p>E-mail:</p>
        <Input
          {...register('email')}
          icon={<BsEnvelopeFill />}
          error={Boolean(errors?.email?.message)}
          helperText={String(errors?.email?.message ?? '')}
          disabled={activateProfile}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Birth date:</p>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <Datetime
              {...field}
              ref={inputRef}
              isValidDate={isValidDate}
              className={styles.rdtPicker}
              timeFormat={false}
              dateFormat="YYYY-MM-DD"
              closeOnSelect
              closeOnClickOutside
              locale="en-US"
              onChange={(date) => {
                field.onChange(moment(date).format('YYYY-MM-DD'));
              }}
              renderInput={(props) => (
                <Input
                  icon={<FaCalendarAlt />}
                  placeholder="Birth date"
                  error={Boolean(errors?.birthDate?.message)}
                  helperText={String(errors?.birthDate?.message ?? '')}
                  readOnly
                  disabled={activateProfile}
                  {...props}
                />
              )}
            />
          )}
        />
      </div>
      <Button
        value={activateProfile ? 'Edit' : 'Ok'}
        color="green"
        type="button"
        onClick={() => changeActivateProfile((state) => !state)}
      />

      <h3 className={styles.addresses_main}>Addresses</h3>
      <h3 className={styles.addresses}>Shipping address</h3>

      <div className={styles.profile_string}>
        <p>Street Name:</p>
        <Input
          {...register('streetName')}
          icon={<FaMapMarkerAlt />}
          error={Boolean(errors?.streetName?.message)}
          helperText={String(errors?.streetName?.message ?? '')}
          disabled={activateShipping}
        />
      </div>

      <div className={styles.profile_string}>
        <p>City:</p>
        <Input
          {...register('city')}
          icon={<LiaCitySolid />}
          error={Boolean(errors?.city?.message)}
          helperText={String(errors?.city?.message ?? '')}
          disabled={activateShipping}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Postal Code:</p>
        <Input
          {...register('postalCode')}
          icon={<IoMdMail />}
          error={Boolean(errors?.postalCode?.message)}
          helperText={String(errors?.postalCode?.message ?? '')}
          disabled={activateShipping}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Country:</p>
        <Form.Select
          {...register('country')}
          onChange={handleCountryShippingChange}
          className={styles.country}
          disabled={activateShipping}
        >
          {Object.keys(countries).map((countryCode) => (
            <option key={countryCode}>{countryCode}</option>
          ))}
        </Form.Select>
      </div>
      <Button
        value={activateShipping ? 'Edit' : 'Ok'}
        color="green"
        type="button"
        onClick={() => changeShipping((state) => !state)}
      />

      <h3 className={styles.addresses}>Billing address</h3>

      <div className={styles.profile_string}>
        <p>Street Name:</p>
        <Input
          {...register('streetNameBilling')}
          icon={<FaMapMarkerAlt />}
          error={Boolean(errors?.streetNameBilling?.message)}
          helperText={String(errors?.streetNameBilling?.message ?? '')}
          disabled={activateBilling}
        />
      </div>

      <div className={styles.profile_string}>
        <p>City:</p>
        <Input
          {...register('cityBilling')}
          icon={<LiaCitySolid />}
          error={Boolean(errors?.cityBilling?.message)}
          helperText={String(errors?.cityBilling?.message ?? '')}
          disabled={activateBilling}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Postal Code:</p>
        <Input
          {...register('postalCodeBilling')}
          icon={<IoMdMail />}
          error={Boolean(errors?.postalCodeBilling?.message)}
          helperText={String(errors?.postalCodeBilling?.message ?? '')}
          disabled={activateBilling}
        />
      </div>

      <div className={styles.profile_string}>
        <p>Country:</p>
        <Form.Select
          {...register('countryBilling')}
          onChange={handleCountryBillingChange}
          className={styles.country}
          disabled={activateBilling}
        >
          {Object.keys(countries).map((countryCode) => (
            <option key={countryCode}>{countryCode}</option>
          ))}
        </Form.Select>
      </div>
      <Button
        value={activateBilling ? 'Edit' : 'Ok'}
        color="green"
        type="button"
        onClick={() => changeBilling((state) => !state)}
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

export default UserMainInfo;
