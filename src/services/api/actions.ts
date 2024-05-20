import { projectKey } from './index';
import zeroClientApi from './ZeroClient';
import authClientApi from './AuthedClient';

export const logInUser = (email: string, password: string) =>
  zeroClientApi()
    .withProjectKey({ projectKey })
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
// .then(console.log);

export const createNewUser = (email: string, password: string) =>
  zeroClientApi()
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
// .then(console.log);

export const getAllGoods = () =>
  zeroClientApi()
    .withProjectKey({ projectKey })
    .products()
    .get()
    .execute()
    .then();

// ================================================

export const getTokenAuthed = (userData: {
  username: string;
  password: string;
}) =>
  authClientApi(userData)
    .withProjectKey({ projectKey })
    .me()
    .get()
    .execute()
    .then();
