import GetBinMax from './GetBinMax';
import ReformatBins from './ReformatBins';

const GetTransferList = (from_location, to_location, inventory_list, bins) => {
  const bin_ids = ReformatBins(bins);
  let index = 0;
  /**
   * @function createData - Formats the data for the transfer list
   * @param {String} sku - the item SKU
   * @param {String} name - the item Name
   * @param {String} from_location - the warehouse the item is transferring from
   * @param {String} from_bin - the bin the item is transferring from
   * @param {String} from_bin_id - the id of the bin the item is transferring from
   * @param {Number} from_available - the available qty in the from bin
   * @param {String} to_location - the warehouse the item is transferring to
   * @param {String} to_bin - the bin the item is transferring to
   * @param {String} to_bin_id - the id of the bin the item is transferring to
   * @param {Number} to_available - the available qty in the to bin
   * @param {Number} qty - the qty to transfer
   * @param {String} cssClass - the css class for the table row
   */
  function createData(sku, name, from_location, from_bin, from_bin_id, from_available, to_location, to_bin, to_bin_id, to_available, qty, cssClass) {
    index += 1
    return { sku, name, from_location, from_bin, from_bin_id, from_available, to_location, to_bin, to_bin_id, to_available, qty, cssClass, id: index };
  }
  let list = [];
  let homeless_items = [];
  const warehouse = from_location === 'Townsend' ? 'Townsend' : 'Main Warehouse';
  const keys = Object.keys(inventory_list);
  //iterate over each item in the inventory list
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const sku = inventory_list[key].sku;
    const name = inventory_list[key].name;
    const bin_max = GetBinMax(sku, name, to_location);
    let bins = [];
    //if transferring from Townsend
    if(warehouse === 'Townsend') {
      const location_keys = Object.keys(inventory_list[key].locations);
      for(const location_key of location_keys) {
        let location = inventory_list[key].locations[location_key];
        if(location.name !== 'Retail Store' && location.bins.length) {
          bins = bins.concat(location.bins);
        }
      }
    //if not transferring from townsend, and item exists in the warehouse, and the item is in a bin
    //insert the bins with the items into the bins array
    }else if(inventory_list[key].locations[warehouse] && inventory_list[key].locations[warehouse].bins){
      bins = inventory_list[key].locations[warehouse].bins;
      if(inventory_list[key].locations[to_location] && inventory_list[key].locations[to_location].bins) {
        console.log(inventory_list[key].locations[to_location].bins)
        let temp_bins = inventory_list[key].locations[to_location].bins;
        temp_bins.forEach(bin => {
          bin.name = `Retail Store - ${bin.name}`;
          bins.concat(bin);
        });
        console.log(bins);
      }
    }
    let from_bins = [];
    let to_bins = [];
    for(const bin of bins) {
      //handle from location being Townsend
      if(warehouse === 'Townsend') {
        //if bin name doesn't include a picking prefix, it must be a Townsend bin
        if(!bin.name.includes('Apparel') 
        && !bin.name.includes('Merch') 
        && !bin.name.includes('Pallet Racks') 
        && !bin.name.includes('Picking')
        && !bin.name.includes('Retail Store')
        && !bin.name.includes('NoBin')) {
          from_bins.push(bin);
        }else if(bin.name.includes(to_location)) {
          to_bins.push(bin);
        }
      //handle from location not being Townsend
      }else{
        if(bin.name.includes(from_location)) {
          from_bins.push(bin);
        }else if(bin.name.includes(to_location)) {
          to_bins.push(bin);
        }
      }
    }
    //if we have both a picking and put away location
    if(from_bins.length && to_bins.length) {
      for(const bin of to_bins) {

        //if bin is at 50% or less capacity
        if(bin_max / 2 >= bin.available) {
          let qty_needed = bin_max - bin.available;
          for(const from_bin of from_bins) {
            if(qty_needed > 0 && from_bin.available) {
              let qty = 0;
              if(qty_needed > from_bin.available) {
                qty = from_bin.available;
                from_bin.available = 0;
              }else{
                qty = qty_needed;
                from_bin.available -= qty_needed;
              }
              list.push(
                createData(
                  sku,
                  name,
                  warehouse,
                  from_bin.name,
                  bin_ids[warehouse].bins[from_bin.name].id,
                  from_bin.available,
                  'Main Warehouse',
                  bin.name,
                  bin_ids['Main Warehouse'].bins[bin.name].id,
                  bin.available,
                  qty,
                  'ok'
                )
              );
            }else{
              break;
            }
          }
        }
      }
    //check for products that don't have a put away location
    }else if(from_bins.length && !to_bins.length){
      for(const from_bin of from_bins) {
        const char1 = sku.charAt(0).toLowerCase();
        const char2 = sku.charAt(1);
        let qty_needed = bin_max;
        let qty = 0;
        if(qty_needed > from_bin.available) {
          qty = from_bin.available;
          from_bin.available = 0;
        }else{
          qty = qty_needed;
          from_bin.available -= qty_needed;
        }
        //handle putting away apparel
        if(to_location.includes('Apparel')) {
          if(char1 === 's' || char1 === 'h') {
            homeless_items.push(
              createData(
                sku,
                name,
                warehouse,
                from_bin.name,
                bin_ids[warehouse].bins[from_bin.name].id,
                from_bin.available,
                'Main Warehouse',
                '?',
                '?',
                '?',
                qty,
                'error'
              )
            );
          }
        //handle putting away merch
        }else if(to_location.includes('Merch')) {
          if(char1 === 'm' || char1 === 'c') {
            homeless_items.push(
              createData(
                sku,
                name,
                warehouse,
                from_bin.name,
                bin_ids[warehouse].bins[from_bin.name].id,
                from_bin.available,
                'Main Warehouse',
                '?',
                '?',
                '?',
                qty,
                'error'
              )
            );
          }
        //handle putting away product
        }else if(to_location.includes('Picking')) {
          if(char1 === 'p') {
            homeless_items.push(
              createData(
                sku,
                name,
                warehouse,
                from_bin.name,
                bin_ids[warehouse].bins[from_bin.name].id,
                from_bin.available,
                'Main Warehouse',
                '?',
                '?',
                '?',
                qty,
                'error'
              )
            );
          }
        }
      }
    }
  }
  if(homeless_items.length) list = list.concat(homeless_items);
  return list;
}

export default GetTransferList;