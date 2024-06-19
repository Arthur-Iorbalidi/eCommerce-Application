import { Customer } from '@commercetools/platform-sdk';
import tokenClientApi from '../TokenAuth';
import getAuthedToken from '../auth/getTokenAuthed';
import { projectKey } from '..';

interface UserSettingsProps {
  token: string;
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
  email: string;
}

export default function changeUserPassword({
  token,
  id,
  version,
  currentPassword,
  newPassword,
  email,
}: UserSettingsProps) {
  return (
    callBack: (a: Customer) => void,
    requestEffects: (val: {
      body?: Customer;
      message?: string;
      statusCode?: number;
    }) => void,
  ) =>
    tokenClientApi(token)
      .withProjectKey({ projectKey })
      .customers()
      .password()
      .post({
        body: {
          id,
          version,
          currentPassword,
          newPassword,
        },
      })
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          getAuthedToken({
            username: email,
            password: newPassword,
          });
          callBack(res.body);
        }
        requestEffects(res);
      })
      .catch((res) => requestEffects(res));
}
