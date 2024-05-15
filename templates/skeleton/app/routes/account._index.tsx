import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({response}: LoaderFunctionArgs) {
  response!.status = 302;
  response!.headers.set('Location', '/account/orders');
  return null;
}
