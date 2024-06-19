import * as yup from 'yup';

const getValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .test(
        'noRussianChars',
        'Email must contain only English alphabet',
        (value) => {
          const noRussianCharsRegex = /^[^А-ЯЁа-яё\s]*$/u;
          return noRussianCharsRegex.test(value);
        },
      )
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
