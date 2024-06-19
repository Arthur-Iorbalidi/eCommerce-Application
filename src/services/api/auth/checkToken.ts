import { Customer } from '@commercetools/platform-sdk';

import { projectKey } from '../index';
import tokenClientApi from '../TokenAuth';

export default function checkToken(
  resultCallBack: (val: boolean, userInfo: Customer | null) => void,
): void {
  let userToken: string;
  if (localStorage.getItem('token')) {
    try {
      userToken = JSON.parse(
        localStorage.getItem('token') as string,
      ).refreshToken;

      tokenClientApi(userToken)
        .withProjectKey({ projectKey })
        .me()
        .get()
        .execute()
        .then((res) => {
          if (res.statusCode === 200) {
            resultCallBack(true, res.body);
          } else {
            resultCallBack(false, null);
          }
        });
    } catch {
      resultCallBack(false, null);
    }
  } else {
    resultCallBack(false, null);
  }
}
