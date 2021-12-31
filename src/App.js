import './App.css';
import './sass/general.scss'
import {BrowserRouter, Route} from 'react-router-dom'

import Routes from './routes/Routes'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <Route render={props => (
          <div className="movieapp">
            <Header {... props}/>
            <Routes />
          </div>
        
      )} />
    </BrowserRouter>
  );
}

export default App;
