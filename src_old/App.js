import './styles/style.scss';

import { Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import Default from './layouts/Default';


function App() {

  return (
    <div className="App page_wrapper">
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

