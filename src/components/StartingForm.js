import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import GetInventory from '../utils/GetInventory';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function StartingForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    from: 'Pallet Racks',
    to: 'Apparel',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleStart = event => {
    props.setView('TranferForm');
    GetInventory();
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1} align="center" justify="center" direction="column" style={{height: '100vh'}}>
          <Grid container spacing={0} direction="row">
            <Grid container item xs={6} spacing={3} justify="center">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="from-native-helper">Pick From</InputLabel>
                <NativeSelect
                  value={state.from}
                  onChange={handleChange('from')}
                  inputProps={{
                    name: 'from',
                    id: 'from-native-helper',
                  }}
                >
                  <option value="" />
                  <option value={'Pallet Racks'}>Pallet Racks</option>
                  <option value={'Container'}>Containers</option>
                  <option value={'Townsend'}>Townsend</option>
                </NativeSelect>
                <FormHelperText>Select the restock from location</FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item xs={6} spacing={3} justify="center">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="to-native-helper">Transfer To</InputLabel>
                <NativeSelect
                  value={state.to}
                  onChange={handleChange('to')}
                  inputProps={{
                    name: 'to',
                    id: 'to-native-helper',
                  }}
                >
                  <option value="" />
                  <option value={'Apparel'}>Apparel</option>
                  <option value={'Merch'}>Merch</option>
                  <option value={'Picking'}>Picking</option>
                </NativeSelect>
                <FormHelperText>Select the restock to location</FormHelperText>
              </FormControl>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button variant="outlined" color="primary" className={classes.button} onClick={handleStart}>
                Start
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default StartingForm;
