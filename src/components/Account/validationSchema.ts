import * as yup from 'yup';

export interface CountryRegex {
  [key: string]: RegExp;
}

export const countries: CountryRegex = {
  US: /^([0-9]{5})(?:-([0-9]{4}))?$/,
  RU: /^\d{6}$/,
  BY: /^\d{6}$/,
};

const getValidationSchema = (
  currentCountryShipping?: string,
  currentCountryBilling?: string,
) =>
  yup.object().shape({
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
    birthDate: yup
      .string()
      .required('Birth date is required')
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
        if (currentCountryShipping) {
          return countries[currentCountryShipping].test(value);
        }
        return undefined;
      }),

    country: yup.string().required('Country is required'),

    streetNameBilling: yup.string().required('Street Name is required'),
    cityBilling: yup
      .string()
      .required('City is required')
      .matches(
        /^[^!@#$%^&*()_\-=+~`[\]{}|\\;:,.<>/?0-9]+$/,
        "Shouldn't contain special characters and numbers",
      ),
    postalCodeBilling: yup
      .string()
      .required('Postal Code is required')
      .test('postal', 'Postal code should be valid', (value) => {
        if (currentCountryBilling) {
          return countries[currentCountryBilling].test(value);
        }
        return undefined;
      }),
    countryBilling: yup.string().required('Country is required'),
  });

export default getValidationSchema;
