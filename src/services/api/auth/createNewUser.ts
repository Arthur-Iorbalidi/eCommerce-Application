import { Customer } from '@commercetools/platform-sdk';

import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';
import { ApiRegistrationFields } from '../types';
import logInUser from './logInUser';

export default function createNewUser(
  userData: ApiRegistrationFields,
  successCallback: (value: Customer) => void,
  errorCallback: (message?: string) => void,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: userData,
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 201) {
        logInUser(userData.email, userData.password, successCallback);
      }
    })
    .catch((res) => {
      if (res.status === 400) {
        errorCallback(res.message);
      } else {
        errorCallback('Something went wrong, try again later...');
      }
    });
}
