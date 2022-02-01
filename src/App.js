import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import AddLead from './components/Lead/AddLead';
import Lead from './components/Lead/Lead';
import UpdateLead from './components/Lead/UpdateLead';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leads" element={<Lead />} />
      <Route path="lead/add" element={<AddLead />} />
    </Routes>
  );
}

export default App;
