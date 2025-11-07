import Controls from './components/Controls';
import Grid from './components/Grid';

function App () {
  return (
    <div className="app">
      <div className="header">
        <h1>Grid-Based Dashboard</h1>
        <Controls />
      </div>
      <Grid />
    </div>
  );
}

export default App;
