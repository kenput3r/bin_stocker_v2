import Credentials from '../Credentials';

const PostTransfer = async (data, sendUpdate, from_warehouse) => {
  let warehouse = from_warehouse && from_warehouse !== 'Main Warehouse' ? from_warehouse : 'Main Warehouse'
  const transfer_item = data.shift();
  const fetch_url = 'https://inventory.dearsystems.com/ExternalApi/v2/stockTransfer';
  const fetch_headers = new Headers({
    'Content-Type': 'application/json',
    'api-auth-accountid': Credentials.id,
    'api-auth-applicationkey': Credentials.key
  });
  const date = new Date();
  const transfer_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T00:00:00Z';
  const transfer_data = {
    "Status": "COMPLETED",
    "From": transfer_item.from_bin_id,
    "FromLocation": `${warehouse}: ${transfer_item.from_bin}`,
    "To": transfer_item.to_bin_id,
    "ToLocation": `${transfer_item.to_location}: ${transfer_item.to_bin}`,
    "CostDistributionType": "Cost",
    "InTransitAccount": in_transit_account,
    "DepartureDate": transfer_date,
    "CompletionDate": transfer_date,
    "RequiredByDate": transfer_date,
    "Reference": "an act of bin_stocker",
    "Lines": [
      {
        "ProductID": "",
        "SKU": transfer_item.sku,
        "ProductName": "",
        "TransferQuantity": transfer_item.qty,
        "BatchSN": "",
        "ExpiryDate": "",
        "Comments": ""
      }
    ],
    "ManualJournals": [],
    "SkipOrder": true
  }
  const transfer = await fetch(fetch_url, {
    method: 'POST',
    headers: fetch_headers,
    body: JSON.stringify(transfer_data)
  });
  if(transfer.status === 200) {
    const successes = this.state.successes;
    successes.push(transfer_item.id);
    this.setState({successes: successes});
  }else{
    const errors = this.state.errors;
    errors.push(transfer_item.id);
    this.setState({errors: errors});
  }
  console.log(transfer);
  if(data.length) {
    console.log(data);
    this.handleTransfer(data, update_transfer_status);
  }else{
    update_transfer_status();
    console.log('successes:');
    console.log(this.state.successes);
    console.log('errors:');
    console.log(this.state.errors);
  }
}

export default PostTransfer;