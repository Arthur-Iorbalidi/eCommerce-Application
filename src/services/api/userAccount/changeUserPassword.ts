import tokenClientApi from '../TokenAuth';
import { projectKey } from '..';

interface UserSettingsProps {
  token: string;
  id: string;
  version: number;
}

export default function changeUserPassword({
  token,
  id,
  version,
}: UserSettingsProps) {
  tokenClientApi(token)
    .withProjectKey({ projectKey })
    .customers()
    .password()
    .post({
      body: {
        id,
        version,
        currentPassword: '@#efwe@#r234FF',
        newPassword: '12322222',
      },
    })
    .execute()
    .then((res) => res);
}
