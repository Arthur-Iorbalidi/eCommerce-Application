export interface RegistrationFormFields {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  streetNameBilling: string;
  cityBilling: string;
  postalCodeBilling: string;
  countryBilling: string;
}

export interface PasswordFormFields {
  currentPassword: string;
  newPassword: string;
}

export interface ChangeUserProps {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  addresses: {
    key: string;
    country: string;
    streetName: string;
    city: string;
    postalCode: string;
  }[];
}

interface UserSettingsProps extends ChangeUserProps {
  token: string;
}
