import Credentials from '../Credentials';

const PostTransfer = async (data, sendUpdate, from_warehouse) => {
  const temp_data = [...data];
  const warehouse = from_warehouse && from_warehouse !== 'Main Warehouse' ? from_warehouse : 'Main Warehouse';
  const successes = [];
  const errors = [];
  const transfer_item = temp_data.shift();
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
    "InTransitAccount": 1210,
    "DepartureDate": transfer_date,
    "CompletionDate": transfer_date,
    "RequiredByDate": transfer_date,
    "Reference": "an act of bin_stocker_v2",
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
    successes.push(transfer_item.id);
    transfer_item.cssClass = 'success';
    sendUpdate(temp_data.length, transfer_item);
  }else{
    transfer_item.cssClass = 'error';
    errors.push(transfer_item.id);
    sendUpdate(temp_data.length, transfer_item);
  }
  console.log(transfer);
  if(temp_data.length) {
    PostTransfer(temp_data, sendUpdate, warehouse);
  }else{
    sendUpdate();
    console.log('successes:');
    console.log(successes);
    console.log('errors:');
    console.log(errors);
  }
}

export default PostTransfer;