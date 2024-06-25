import MaxMinCropProduction from './components/maxMinCropProduction/MaxMinCropProduction';
import AverageCropProduction from './components/averageCropProduction/AverageCropProduction';
import indianAgricultureDataset from './dataset/Manufac _ India Agro Dataset.json'

function App() {

  const styles = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2em',
    padding: '1em 0em'
  }

  return (
    <div style={styles}>
      <MaxMinCropProduction dataset={indianAgricultureDataset}/>
      <AverageCropProduction dataset={indianAgricultureDataset}/>
    </div>
  );
}

export default App;
