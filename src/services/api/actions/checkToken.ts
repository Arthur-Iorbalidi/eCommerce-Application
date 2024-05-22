import { projectKey } from '../index';
import tokenClientApi from '../TokenAuth';

export default function checkToken(
  resultCallBack: (val: boolean) => void,
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
            resultCallBack(true);
          } else {
            resultCallBack(false);
          }
        });
    } catch {
      resultCallBack(false);
    }
  } else {
    resultCallBack(false);
  }
}
