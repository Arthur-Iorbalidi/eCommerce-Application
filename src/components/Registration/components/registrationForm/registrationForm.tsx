import { Link, useNavigate } from 'react-router-dom';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Customer } from '@commercetools/platform-sdk';

import { BsEnvelopeFill, BsPersonFillLock, BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { LiaCitySolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { useEffect, useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import {
  activateAuthorizationState,
  changeUserInfo,
} from '../../../../store/reducers/authorizationState';

import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import Loader from '../../../../shared/ui/Loader/loader';
import styles from './registrationForm.module.scss';

import getValidationSchema, { countries } from './validationSchema';

// api
import createNewUser from '../../../../services/api/auth/createNewUser';
import { ApiRegistrationFields } from '../../../../services/api/types';

interface RegistrationFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  streetNameBilling?: string | unknown;
  cityBilling?: string | unknown;
  postalCodeBilling?: string | unknown;
  countryBilling?: string | unknown;
}

function transformData(
  isAlsoBilling: boolean,
  isDefaultBilling: boolean,
  isDefaultShipping: boolean,
  data: RegistrationFormFields,
) {
  return {
    email: data.email,
    password: data.password,
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
        streetName: isAlsoBilling ? data.streetName : data.streetNameBilling,
        postalCode: isAlsoBilling ? data.postalCode : data.postalCodeBilling,
        city: isAlsoBilling ? data.city : data.cityBilling,
        country: isAlsoBilling ? data.country : data.countryBilling,
      },
    ],
    billingAddresses: [1],
    shippingAddresses: [0],
    ...(isDefaultBilling ? { defaultBillingAddress: 1 } : {}),
    ...(isDefaultShipping ? { defaultShippingAddress: 0 } : {}),
  };
}

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState({
    isShowed: false,
    text: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isAlsoBilling, setIsAlsoBilling] = useState(false);

  const [currentCountryShipping, setCurrentCountryShipping] = useState('US');

  const [currentCountryBilling, setCurrentCountryBilling] = useState('US');

  const [isDefaultBilling, setIsDefaultBilling] = useState(false);

  const [isDefaultShipping, setIsDefaultShipping] = useState(false);

  const [today, setToday] = useState(moment());

  useEffect(() => {
    setToday(moment());
  }, []);

  const validationSchema = getValidationSchema(
    isAlsoBilling,
    currentCountryShipping,
    currentCountryBilling,
  );

  const {
    register,
    control,
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
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormFields> = (
    data: RegistrationFormFields,
  ) => {
    setIsLoading(true);
    const transformedData = transformData(
      isAlsoBilling,
      isDefaultBilling,
      isDefaultShipping,
      data,
    );
    createNewUser(
      transformedData as ApiRegistrationFields,
      successUserReg,
      errorUserReg,
    );
  };

  const handleCountryShippingChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentCountryShipping(event.target.value);
  };

  const handleCountryBillingChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentCountryBilling(event.target.value);
  };

  const isValidDate = (selectedDate: Moment) => {
    return selectedDate.isSameOrBefore(today);
  };

  const inputRef = useRef(null);

  return (
    <>
      <form
        data-testid="registration_form"
        className={styles.registration_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Create account:</h2>

        <Input
          {...register('firstName')}
          icon={<BsPersonFill />}
          placeholder="First Name"
          error={Boolean(errors?.firstName?.message)}
          helperText={String(errors?.firstName?.message ?? '')}
        />

        <Input
          {...register('lastName')}
          icon={<BsPersonFill />}
          placeholder="Last Name"
          error={Boolean(errors?.lastName?.message)}
          helperText={String(errors?.lastName?.message ?? '')}
        />

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
                  {...props}
                />
              )}
            />
          )}
        />

        <h3 className={styles.addresses}>Shipping address</h3>

        <Input
          {...register('streetName')}
          icon={<FaMapMarkerAlt />}
          placeholder="Street Name"
          error={Boolean(errors?.streetName?.message)}
          helperText={String(errors?.streetName?.message ?? '')}
        />

        <Input
          {...register('city')}
          icon={<LiaCitySolid />}
          placeholder="City"
          error={Boolean(errors?.city?.message)}
          helperText={String(errors?.city?.message ?? '')}
        />

        <Input
          {...register('postalCode')}
          icon={<IoMdMail />}
          placeholder="Postal Code"
          error={Boolean(errors?.postalCode?.message)}
          helperText={String(errors?.postalCode?.message ?? '')}
        />

        <Form.Select
          {...register('country')}
          onChange={handleCountryShippingChange}
          className={styles.country}
        >
          {Object.keys(countries).map((countryCode) => (
            <option key={countryCode}>{countryCode}</option>
          ))}
        </Form.Select>

        <div className={styles.isDefaultShipping}>
          <input
            type="checkbox"
            checked={isDefaultShipping}
            onChange={(event) => setIsDefaultShipping(event.target.checked)}
          />
          <span>Set as default address</span>
        </div>

        <div className={styles.isBilling}>
          <input
            type="checkbox"
            checked={isAlsoBilling}
            onChange={(event) => setIsAlsoBilling(event.target.checked)}
          />
          <span>Also use as a billing address</span>
        </div>

        {!isAlsoBilling && (
          <>
            <h3 className={styles.addresses}>Billing address</h3>

            <Input
              {...register('streetNameBilling')}
              icon={<FaMapMarkerAlt />}
              placeholder="Street Name"
              error={Boolean(errors?.streetNameBilling?.message)}
              helperText={String(errors?.streetNameBilling?.message ?? '')}
            />

            <Input
              {...register('cityBilling')}
              icon={<LiaCitySolid />}
              placeholder="City"
              error={Boolean(errors?.cityBilling?.message)}
              helperText={String(errors?.cityBilling?.message ?? '')}
            />

            <Input
              {...register('postalCodeBilling')}
              icon={<IoMdMail />}
              placeholder="Postal Code"
              error={Boolean(errors?.postalCodeBilling?.message)}
              helperText={String(errors?.postalCodeBilling?.message ?? '')}
            />

            <Form.Select
              {...register('countryBilling')}
              onChange={handleCountryBillingChange}
              className={styles.country}
            >
              {Object.keys(countries).map((countryCode) => (
                <option key={countryCode}>{countryCode}</option>
              ))}
            </Form.Select>

            <div className={styles.isDefaultShipping}>
              <input
                type="checkbox"
                checked={isDefaultBilling}
                onChange={(event) => setIsDefaultBilling(event.target.checked)}
              />
              <span>Set as default address</span>
            </div>
          </>
        )}

        <div>
          <Button value="Sign Up" color="green" type="submit" />
          <p>
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>

        {modal.isShowed && (
          <Alert
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

export default RegistrationForm;
