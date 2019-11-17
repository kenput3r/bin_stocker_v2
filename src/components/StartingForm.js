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
import GetBins from '../utils/GetBins';
import GetTransferList from '../utils/GetTransferList';
import DearLogo from '../DearLogo.png';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  progressMessage: {
    fontWeight: 'normal', 
    marginBlockStart: '2em', 
    marginBlockEnd: '2.5em', 
    textTransform: 'uppercase'
  },
}));

function StartingForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    from: 'Pallet Racks',
    to: 'Apparel',
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const [progressMessage, setProgressMessage] = React.useState('CLICK START TO BUILD THE TRANSFER LIST');
  const [completed, setCompleted] = React.useState(0);

  const updateProgress = (message, complete) => {
    console.log(message);
    setProgressMessage(message);
    setCompleted(complete);
  }

  const handleStart = async event => {
    const bins = await new Promise((res, rej) => {
      updateProgress('getting bins list', 3)
      GetBins({resolve: res, reject: rej});
    }).catch(error => {
      console.log(error)
    });
    if(!bins) {
      console.log('something went wrong getting the bins');
      return;
    }
    const inventory = await new Promise((res, rej) => {
      GetInventory(1, updateProgress, {resolve: res, reject: rej})
    }).catch(error => {
      console.log(error);
    });
    if(!inventory) {
      console.log('something went wrong getting the inventory');
      return;
    }
    const list = GetTransferList(state.from, state.to, inventory);
    console.log(list);
    props.setRows(list);
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1} align="center" justify="center" direction="column" style={{height: '100vh'}}>
          <Grid container spacing={0} direction="row" justify="center">
            <Grid container item xs={12} justify="center">
              <h1 style={{color: '#747F8C', marginBottom: '100px'}}><img src={DearLogo} alt="Dear Systems Logo" /> bin_stocker_v2</h1>
            </Grid>
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
            <Grid container item xs={6} justify="center">
              <h5 className={classes.progressMessage}>{progressMessage}</h5>
              <div className={classes.progressBar}>
                <LinearProgress variant="determinate" value={completed} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default StartingForm;
