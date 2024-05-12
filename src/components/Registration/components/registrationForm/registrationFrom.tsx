/* eslint-disable object-curly-newline */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsEnvelopeFill, BsPersonFillLock, BsPersonFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { LiaCitySolid } from 'react-icons/lia';
import { IoMdMail } from 'react-icons/io';
import { AiOutlineGlobal } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './registrationForm.module.scss';

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
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
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
  birthDate: yup.string().required('Birth date is required'),
  streetName: yup.string().required('Street Name is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal Code is required'),
  country: yup.string().required('Country Code is required'),
});

function RegistrationForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit: SubmitHandler<RegistrationFormFields> = () => {
    reset({ email: '', password: '' });
  };

  // const onSubmit: SubmitHandler<LoginFormFields> = (data: LoginFormFields) => {
  //   // console.log(data);
  //   reset({ email: '', password: '' });
  // };

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

      <h3 className={styles.adresses}>Addresses:</h3>

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

      <Input
        {...register('country')}
        icon={<AiOutlineGlobal />}
        placeholder="Country"
        error={Boolean(errors?.country?.message)}
        helperText={String(errors?.country?.message ?? '')}
      />

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
