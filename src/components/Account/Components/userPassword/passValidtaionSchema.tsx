import * as yup from 'yup';

export interface CountryRegex {
  [key: string]: RegExp;
}

export const countries: CountryRegex = {
  US: /^([0-9]{5})(?:-([0-9]{4}))?$/,
  RU: /^\d{6}$/,
  BY: /^\d{6}$/,
};

const getValidationSchema = () =>
  yup.object().shape({
    currentPassword: yup
      .string()
      .required('Password is required')
      .test(
        'noRussianChars',
        'Password must contain only English alphabet',
        (value) => {
          const noRussianCharsRegex = /^[^А-ЯЁа-яё\s]*$/u;
          return noRussianCharsRegex.test(value);
        },
      )
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .test(
        'specialChar',
        'Password must contain at least one special character (!@#$%^&*-+_)',
        (value) => {
          const specialCharRegex = /[-_!@#$%^&*+]/;
          return specialCharRegex.test(value);
        },
      )
      .min(8, 'Password must be at least 8 characters'),

    newPassword: yup
      .string()
      .required('Password is required')
      .test(
        'noRussianChars',
        'Password must contain only English alphabet',
        (value) => {
          const noRussianCharsRegex = /^[^А-ЯЁа-яё\s]*$/u;
          return noRussianCharsRegex.test(value);
        },
      )
      .matches(/^[^\s]*$/, "Password mustn't contain spaces")
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .test(
        'specialChar',
        'Password must contain at least one special character (!@#$%^&*-+_)',
        (value) => {
          const specialCharRegex = /[-_!@#$%^&*+]/;
          return specialCharRegex.test(value);
        },
      )
      .min(8, 'Password must be at least 8 characters'),
  });

export default getValidationSchema;
