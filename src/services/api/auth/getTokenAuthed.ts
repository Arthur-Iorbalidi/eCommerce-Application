import { projectKey } from '../index';
import authClientApi from '../AuthedClient';

export default function getAuthedToken(userData: {
  username: string;
  password: string;
}) {
  authClientApi(userData).withProjectKey({ projectKey }).get().execute();
}
