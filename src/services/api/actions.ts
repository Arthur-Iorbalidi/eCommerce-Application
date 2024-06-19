import { BaseAddress } from '@commercetools/platform-sdk';
import { projectKey } from './index';
import zeroClientApi from './ZeroClient';
// import authClientApi from './AuthedClient';

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

export const getTokenZero = () => {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .me()
    .get()
    .execute()
    .then((res) => res);
};

// export const getAllGoods = () =>
//   zeroClientApi()
//     .withProjectKey({ projectKey })
//     .products()
//     .get()
//     .execute()
//     .then();

// ================================================
