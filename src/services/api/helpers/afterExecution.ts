// Эта функци вставляется в функцию-мидлвар:"withAfterExecutionMiddleware", который
// может срабатывать посреди передавемых иных мидлваров объекту классу "ClientBuilder"
import {
  type Next,
  type MiddlewareRequest,
  // type AfterExecutionMiddlewareOptions,
  type MiddlewareResponse,
  // type GenericOmit,
} from '@commercetools/sdk-client-v2';

export default function aftere() {
  // options:
  //   | GenericOmit<AfterExecutionMiddlewareOptions, "middleware">
  //   | undefined
  return (next: Next): Next =>
    (req: MiddlewareRequest, res: MiddlewareResponse) => {
      // console.log(options); // { name: 'after-middleware-fn' }
      next(req, res);
    };
}
