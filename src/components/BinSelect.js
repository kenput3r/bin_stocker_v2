import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GetBins from '../utils/GetBins.js';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BinSelect(props) {
  const classes = useStyles();
  const [bins, setBins] = React.useState([]);
  const [bin, setBin] = React.useState('');
  const handleChange = event => {
    setBin(event.target.value);
  }
  const handleClick = async event => {
    if(!bins.length) {
      const bins_list = await new Promise((res, rej) => {
        GetBins({resolve: res, reject: rej});
      }).catch(error => {
        console.log(error)
      });
      if(!bins_list) {
        console.log('something went wrong getting the bins');
        return;
      }
      const locations = Object.keys(bins_list);
      const stripped_bins_list = [];
      for(const location of locations) {
        if(bins_list[location].Name === 'Main Warehouse') {
          for(const bin of bins_list[location].Bins) {
            if(bin.Name.includes(props.toLocation)) {
              stripped_bins_list.push(bin);
            }
          }
        }
      }
      setBins(stripped_bins_list)
    }
  }
  const menu_items = bins.map(bin =>
    <option key={bin.ID} value={bin.Name}>{bin.Name}</option>
  )
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          native
          labelId="select-label"
          id="bin-select"
          value={bin}
          onClick={handleClick}
          onChange={handleChange}
        >
          <option default disabled>select a bin</option>
          {menu_items}
        </Select>

      </FormControl>
    </div>
  )
}