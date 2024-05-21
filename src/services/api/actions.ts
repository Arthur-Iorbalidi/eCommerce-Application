import { BaseAddress } from '@commercetools/platform-sdk';
import { projectKey } from './index';
import zeroClientApi from './ZeroClient';
import authClientApi from './AuthedClient';

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
const getTokenAuthed = (userData: { username: string; password: string }) =>
  authClientApi(userData).withProjectKey({ projectKey }).get().execute();

export const getTokenZero = () => {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .me()
    .get()
    .execute()
    .then((res) => res);
};

export const logInUser = (
  email: string,
  password: string,
  navigateCallBack: () => void,
  showModalWindow: (message: string) => void,
) =>
  zeroClientApi()
    .withProjectKey({ projectKey })
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        getTokenAuthed({ username: email, password });
        navigateCallBack();
      }
    })
    .catch((res) => showModalWindow(res.message));

export const createNewUser = (
  userData: ApiRegistrationFields,
  navigateCallBack: () => void,
  showModalWindow: (message: string) => void,
) =>
  zeroClientApi()
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: userData,
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 201) {
        navigateCallBack();
      }
    })
    .catch((res) => showModalWindow(res.message));

// export const getAllGoods = () =>
//   zeroClientApi()
//     .withProjectKey({ projectKey })
//     .products()
//     .get()
//     .execute()
//     .then();

// ================================================
