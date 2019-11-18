import React, { useEffect } from 'react';
import './App.css';
import StartingForm from './components/StartingForm';
import TransferForm from './components/TransferForm';

function App() {
  const [state, setState] = React.useState({
    view: 'StartingForm',
    rows: [],
    bins: [],
    fromWarehouse: '',
  });
  
  const setView = view => setState({
    ...state,
    view: view,
  });

  const setRows = (rows, to_location, bins, warehouse) => setState({
    ...state,
    rows: rows,
    toLocation: to_location,
    bins: bins,
    fromWarehouse: warehouse,
  });

  useEffect(() => {
    if(state.rows.length && state.toLocation) {
      setView('TransferForm');
    }
  },[state.rows, state.toLocation, state.bins, state.fromWarehouse]);

  return (
    <div className="App">
      {state.view === 'StartingForm' ?
      <StartingForm setRows={setRows} />
      :
      <TransferForm rows={state.rows} toLocation={state.toLocation} bins={state.bins} fromLocation={state.fromWarehouse} />}
    </div>
  );
}

export default App;
