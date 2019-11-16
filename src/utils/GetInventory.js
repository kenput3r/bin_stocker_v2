import Credentials from '../Credentials';

/**
 * @function GetInventory - Fetches inventory from inventory.dearsystems.com, API V1
 * @param {Number} page - the page number to fetch
 * @param {function} updateProgress - updates the ui with a message
 * @param {Promise} promise - resolves or rejects
 * @param {object} inventory - optional object, used for recursion
 */
const GetInventory = async (page, updateProgress, promise, inventory) => {
  updateProgress(`Getting inventory page ${page}`);
  const fetch_url = `https://inventory.dearsystems.com/ExternalApi/v2/ref/productavailability?Page=${page}&Limit=1000`;
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
    let new_inventory = inventory || {};
    const total_items = json.Total; //total SKUs with a location and availability
    let page = json.Page; //current page
    const pages = Math.ceil(total_items / 1000); //total number of pages to fetch
    const list = json.ProductAvailabilityList; //the current page of SKUs
    //loop through list and format as object with SKUs as keys
    for(let i = 0; i < list.length; i++) {
      const item = list[i];
      const char1 = item.SKU.charAt(0).toLowerCase();
      const name = item.Name.toLowerCase();
      //exclude fills, components, labels, and hang tags
      if(char1 !== 'f' && char1 !== 'j' && char1 !== 'l' && !name.includes('hang tag')) {
        //if new_inventory does not already have sku
        if(!new_inventory[item.SKU]) {
          const bin = item.bin || 'NoBin'
          new_inventory[item.SKU] = {
            sku: item.SKU,
            name: item.Name,
            id: item.ID,
            locations: {
              [item.Location]: {
                name: item.Location,
                bins: {
                  [bin]: {
                    name: bin,
                    available: item.Available,
                    onHand: item.OnHand,
                    qtyTransferred: 0
                  }
                }
              }
            }
          }
        //if new_inventory already has sku
        }else{
          const bin = item.bin || 'NoBin';
          //location already exists
          if(new_inventory[item.SKU].locations[item.location]) {
            new_inventory[item.SKU].locations[item.location].bins[bin] = {
              name: bin,
              available: item.Available,
              onHand: item.OnHand,
              qtyTransferred: 0
            }
          //location doesn't exist yet
          }else{
            new_inventory[item.SKU].locations[item.Location] = {
              name: item.Location,
              bins: {
                [bin]: {
                  name: bin,
                  available: item.Available,
                  onHand: item.OnHand,
                  qtyTransferred: 0
                }
              }
            }
          }
        }
      }
    }
    if(page < pages) {
      GetInventory(++page, updateProgress, promise, new_inventory)
    }else{
      return promise.resolve(new_inventory);
    }
  }catch(error) {
    return promise.reject(error);
  }
}

export default GetInventory;