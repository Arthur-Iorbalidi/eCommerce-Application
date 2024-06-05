import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import tokenClientApi from '../TokenAuth';
import { projectKey } from '..';
import type { UserSettingsProps } from '../../../components/Account/Components/interfaces';

export default function changeUserSettings({
  token,
  id,
  version,
  firstName,
  lastName,
  email,
  dateOfBirth,
  addresses,
}: UserSettingsProps) {
  return (
    callBack: (a: Customer) => void,
    requestEffects: (val: number) => void,
  ) =>
    tokenClientApi(token)
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            { action: 'setFirstName', firstName },
            { action: 'setLastName', lastName },
            { action: 'changeEmail', email },
            { action: 'setDateOfBirth', dateOfBirth },
            {
              action: 'changeAddress',
              addressKey: 'SHIPPING',
              address: {
                key: 'SHIPPING',
                country: addresses[0].country,
                streetName: addresses[0].streetName,
                city: addresses[0].city,
                postalCode: addresses[0].postalCode,
              },
            },
            {
              action: 'changeAddress',
              addressKey: 'BILLING',
              address: {
                key: 'BILLING',
                country: addresses[1].country,
                streetName: addresses[1].streetName,
                city: addresses[1].city,
                postalCode: addresses[1].postalCode,
              },
            },
          ],
        },
      })
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          callBack(res.body);
        }
        requestEffects(res.statusCode as number);
      });
}
