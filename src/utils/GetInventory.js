import Credentials from '../Credentials';

const GetInventory = async () => {
  const fetch_url = `https://inventory.dearsystems.com/ExternalApi/v2/me`;
  console.log(Credentials.id, Credentials.key)
  const fetch_headers = new Headers({
    'Content-Type': 'application/json',
    'api-auth-accountid': Credentials.id,
    'api-auth-applicationkey': Credentials.key
  });
  console.log(fetch_headers)
  const data = await fetch(fetch_url, {
    method: 'get',
    headers: fetch_headers
  });
  const json = await data.json();
  console.log(json);
}

export default GetInventory;