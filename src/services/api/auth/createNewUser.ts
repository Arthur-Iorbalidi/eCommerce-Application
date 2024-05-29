import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';
import { ApiRegistrationFields } from '../types';
import logInUser from './logInUser';

export default function createNewUser(
  userData: ApiRegistrationFields,
  successCallback: () => void,
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
    .catch((res) => errorCallback(res.message));
}
