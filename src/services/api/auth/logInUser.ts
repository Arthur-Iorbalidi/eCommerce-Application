import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';
import getAuthedToken from './getTokenAuthed';

export default function logInUser(
  email: string,
  password: string,
  successCallback?: () => void,
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
          successCallback();
        }
      }
    })
    .catch((res) => {
      if (errorCallback) {
        errorCallback(res.message);
      }
    });
}
