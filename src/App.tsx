import Controls from './components/Controls';
import Grid from './components/Grid';
import './App.css'

function App() {
    return (
        <div className="app">
            <h1>Grid-Based Dashboard</h1>
            <Controls />
            <Grid />
        </div>
    );
}

export default App;
