export interface RegistrationFormFields {
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
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
