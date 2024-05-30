import { Customer } from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';
import getAuthedToken from './getTokenAuthed';

export default function logInUser(
  email: string,
  password: string,
  successCallback?: (value: Customer) => void,
  errorCallback?: (message?: string) => void,
) {
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
        getAuthedToken({ username: email, password });
        if (successCallback) {
          successCallback(res.body.customer);
        }
      }
    })
    .catch((res) => {
      if (errorCallback) {
        if (res.status === 400) {
          errorCallback(res.message);
        } else {
          errorCallback('Something went wrong, try again later...');
        }
      }
    });
}
