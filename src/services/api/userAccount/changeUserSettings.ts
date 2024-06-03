import tokenClientApi from '../TokenAuth';
import { projectKey } from '..';

interface UserSettingsProps {
  token: string;
  id: string;
  version: number;
}

export default function changeUserSettings({
  token,
  id,
  version,
}: UserSettingsProps) {
  return (callBack) =>
    tokenClientApi(token)
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            { action: 'setFirstName', firstName: 'Bomzh2' },
            { action: 'setLastName', lastName: 'Mr Lox' },
            { action: 'changeEmail', email: 'Bomzh2777@gmai.de' },
            { action: 'setDateOfBirth', dateOfBirth: '1993-02-01' },
            {
              action: 'changeAddress',
              addressKey: 'SHIPPING',
              address: {
                key: 'SHIPPING',
                country: 'RU',
                streetName: 'Pushkina',
                city: 'Moscow',
                postalCode: '12345',
              },
            },
            {
              action: 'changeAddress',
              addressKey: 'BILLING',
              address: {
                key: 'BILLING',
                country: 'US',
                streetName: 'Ad',
                city: 'Washington',
                postalCode: '666662',
              },
            },
          ],
        },
      })
      .execute()
      .then((res) => {
        callBack(res);
      });
}
