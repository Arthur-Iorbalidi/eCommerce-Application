export interface ApiRegistrationFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}
