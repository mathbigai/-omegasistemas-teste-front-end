
import FullMap from './components/map';
import NavBar from './components/navbar';
import Statistic from './components/statistic';
import './style.scss';
function App() {

  return (
    <div className="App">
      <NavBar />
      <Statistic />
      <FullMap />
    </div>
  );
}

export default App;
