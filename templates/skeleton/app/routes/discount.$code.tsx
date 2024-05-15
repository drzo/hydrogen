import {unstable_defineLoader as defineLoader} from '@shopify/remix-oxygen';

/**
 * Automatically applies a discount found on the url
 * If a cart exists it's updated with the discount, otherwise a cart is created with the discount already applied
 *
 * @example
 * Example path applying a discount and optional redirecting (defaults to the home page)
 * ```js
 * /discount/FREESHIPPING?redirect=/products
 *
 * ```
 */
export const loader = defineLoader(
  async ({request, context, params, response}) => {
    const {cart} = context;
    const {code} = params;

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    let redirectParam =
      searchParams.get('redirect') || searchParams.get('return_to') || '/';

    if (redirectParam.includes('//')) {
      // Avoid redirecting to external URLs to prevent phishing attacks
      redirectParam = '/';
    }

    searchParams.delete('redirect');
    searchParams.delete('return_to');

    const redirectUrl = `${redirectParam}?${searchParams}`;

    if (!code) {
      response.status = 302;
      response.headers.set('Location', redirectUrl);
      throw response;
    }

    const result = await cart.updateDiscountCodes([code]);
    cart.setCartId(result.cart.id, response);

    // Using set-cookie on a 303 redirect will not work if the domain origin have port number (:3000)
    // If there is no cart id and a new cart id is created in the progress, it will not be set in the cookie
    // on localhost:3000
    response.status = 303;
    response.headers.set('Location', redirectUrl);
    return null;
  },
);
