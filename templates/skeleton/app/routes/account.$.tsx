import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';

// fallback wild card for all unauthenticated routes in account section
export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/account',
      'Set-Cookie': await context.session.commit(),
    },
  });
}
