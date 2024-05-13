export async function loader() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/account/orders',
    },
  });
}
