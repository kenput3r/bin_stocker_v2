import React, { useEffect } from 'react';
import './App.css';
import StartingForm from './components/StartingForm';
import TransferForm from './components/TransferForm';

function App() {
  const [state, setState] = React.useState({
    view: 'StartingForm',
    rows: [],
  });
  
  const setView = view => setState({
    ...state,
    view: view,
  });

  const setRows = rows => setState({
    ...state,
    rows: rows,
  });

  useEffect(() => {
    if(state.rows.length) {
      setView('TransferForm');
    }
  },[state.rows]);

  return (
    <div className="App">
      {state.view === 'StartingForm' ?
      <StartingForm setRows={setRows} />
      :
      <TransferForm rows={state.rows} />}
    </div>
  );
}

export default App;
