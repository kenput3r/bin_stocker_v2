import Credentials from '../Credentials';

/**
 * @function GetBins - Fetches Locations and Bins from inventory.dearsystems.com, API V1
 * @param {Promise} promise 
 * @see {@link https://support.dearsystems.com/support/solutions/articles/1000054237-api-introduction}
 */
const GetBins = async (promise) => {
  const fetch_url = `https://inventory.dearsystems.com/ExternalApi/Locations`;
  const fetch_headers = new Headers({
    'Content-Type': 'application/json',
    'api-auth-accountid': Credentials.id,
    'api-auth-applicationkey': Credentials.key
  });
  try {
    const data = await fetch(fetch_url, {
      method: 'get',
      headers: fetch_headers
    });
    const json = await data.json();
    return promise.resolve(json);
  }catch(error){
    return promise.reject(error);
  }
}

export default GetBins;