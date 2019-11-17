import GetBinMax from './GetBinMax';

const GetTransferList = (from_location, to_location, inventory_list) => {
  let index = 0;
  function createData(qty, sku, name, from_bin, to_bin) {
    index += 1
    return { qty, sku, name, from_bin, to_bin, id: index };
  }
  let list = [];
  const warehouse = from_location === 'Townsend' ? 'Townsend' : 'Main Warehouse';
  const keys = Object.keys(inventory_list);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const sku = inventory_list[key].sku;
    const name = inventory_list[key].name;
    const bin_max = GetBinMax(sku, name, to_location);
    //const bins = inventory_list[key].locations[warehouse] || [];
    let bins = [];
    if(inventory_list[key].locations[warehouse] && inventory_list[key].locations[warehouse].bins) {
      bins = inventory_list[key].locations[warehouse].bins;
    }
    let from_bins = [];
    let to_bins = [];
    for(const bin of bins) {
      if(bin.name.includes(from_location)) {
        from_bins.push(bin);
      }else if(bin.name.includes(to_location)) {
        to_bins.push(bin);
      }
    }
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
                  qty,
                  sku,
                  name,
                  from_bin.name,
                  bin.name
                )
              );
            }else{
              break;
            }
          }
        }
      }
    }
  }
  return list;
}

export default GetTransferList;