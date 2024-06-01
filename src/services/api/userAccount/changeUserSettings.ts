import tokenClientApi from '../TokenAuth';
import { projectKey } from '..';

export default function changeUserSettings(token: string, id: string) {
  tokenClientApi(token)
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: 3,
        actions: [{ action: 'setDateOfBirth', dateOfBirth: '1993-05-01' }],
      },
    })
    .execute();
  // .then((res) => console.log(res));
}
