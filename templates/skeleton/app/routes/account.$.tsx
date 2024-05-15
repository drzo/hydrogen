import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';

// fallback wild card for all unauthenticated routes in account section
export async function loader({context, response}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  response!.status = 302;
  response!.headers.set('Location', '/account');
  response!.headers.set('Set-Cookie', await context.session.commit());
  return null;
}
