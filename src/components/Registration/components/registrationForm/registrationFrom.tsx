/* eslint-disable @typescript-eslint/indent */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsEnvelopeFill, BsPersonFillLock, BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { LiaCitySolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './registrationForm.module.scss';
// api
import {
  ApiRegistrationFields,
  createNewUser,
} from '../../../../services/api/actions';

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

interface CountryRegex {
  [key: string]: RegExp;
}

const countries: CountryRegex = {
  US: /^([0-9]{5})(?:-([0-9]{4}))?$/,
  RU: /^\d{6}$/,
  BY: /^\d{6}$/,
};

function transformData(isAlsoBilling: boolean, data: RegistrationFormFields) {
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
  };
}

function RegistrationForm() {
  const navigate = useNavigate();
  const errorHandler = () => 'asd'; // ТУТ ПИШИ КОЛЛБЭК ДЛЯ СТЕЙТА

  const [isAlsoBilling, setIsAlsoBilling] = useState(false);

  const [currentCountryShipping, setCurrentCountryShipping] = useState('US');

  const [currentCountryBilling, setCurrentCountryBilling] = useState('US');

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('Name is required')
      .matches(
        /^[^!@#$%^&*()_\-=+~`[\]{}|\\;:,.<>/?0-9]+$/,
        "Shouldn't contain special characters and numbers",
      ),

    lastName: yup
      .string()
      .required('Last name is required')
      .matches(
        /^[^!@#$%^&*()_\-=+~`[\]{}|\\;:,.<>/?0-9]+$/,
        "Shouldn't contain special characters and numbers",
      ),

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

    birthDate: yup
      .string()
      .required('Birth date is required')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'yyyy-mm-dd')
      .test('age', 'You must be at least 16 years old', (value) => {
        const birthDate = new Date(value);
        const now = new Date();

        const ageDiff = now.getTime() - birthDate.getTime();
        const ageDate = new Date(ageDiff);

        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age >= 16;
      }),

    streetName: yup.string().required('Street Name is required'),

    city: yup
      .string()
      .required('City is required')
      .matches(
        /^[^!@#$%^&*()_\-=+~`[\]{}|\\;:,.<>/?0-9]+$/,
        "Shouldn't contain special characters and numbers",
      ),

    postalCode: yup
      .string()
      .required('Postal Code is required')
      .test('postal', 'Postal code should be valid', (value) => {
        return countries[currentCountryShipping].test(value);
      }),

    country: yup.string().required('Country is required'),

    ...(!isAlsoBilling
      ? {
          streetNameBilling: yup.string().required('Street Name is required'),
        }
      : {}),

    ...(!isAlsoBilling
      ? {
          cityBilling: yup
            .string()
            .required('City is required')
            .matches(
              /^[^!@#$%^&*()_\-=+~`[\]{}|\\;:,.<>/?0-9]+$/,
              "Shouldn't contain special characters and numbers",
            ),
        }
      : {}),

    ...(!isAlsoBilling
      ? {
          postalCodeBilling: yup
            .string()
            .required('Postal Code is required')
            .test('postal', 'Postal code should be valid', (value) => {
              return countries[currentCountryBilling].test(value);
            }),
        }
      : {}),

    ...(!isAlsoBilling
      ? {
          countryBilling: yup.string().required('Country is required'),
        }
      : {}),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit: SubmitHandler<RegistrationFormFields> = (
    data: RegistrationFormFields,
  ) => {
    const transformedData = transformData(isAlsoBilling, data);
    createNewUser(
      transformedData as ApiRegistrationFields,
      () => {
        navigate('/login');
      },
      () => {
        errorHandler();
      },
    );
    reset();
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

  return (
    <form
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
        placeholder="Last name"
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

      <Input
        {...register('birthDate')}
        icon={<FaCalendarAlt />}
        placeholder="Birth date"
        error={Boolean(errors?.birthDate?.message)}
        helperText={String(errors?.birthDate?.message ?? '')}
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
        <input type="checkbox" />
        <span>Set as default adress</span>
      </div>

      <div className={styles.isBilling}>
        <input
          type="checkbox"
          checked={isAlsoBilling}
          onChange={(event) => setIsAlsoBilling(event.target.checked)}
        />
        <span>Else use as a billing address</span>
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
            <input type="checkbox" />
            <span>Set as default adress</span>
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
    </form>
  );
}

export default RegistrationForm;
