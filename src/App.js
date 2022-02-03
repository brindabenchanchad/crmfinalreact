import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import AddLead from './components/Lead/AddLead';
import Lead from './components/Lead/Lead';
import Plan from './components/Plan/Plan';
import AddPlan from './components/Plan/AddPlan';
import UpdateLead from './components/Lead/UpdateLead';
import ConvertLead from './components/Lead/ConvertLead';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leads" element={<Lead />} />
      <Route path="lead/add" element={<AddLead />} />
      <Route path="leads/update/:id" element={<UpdateLead />} />
      <Route path="leads/convert/:id" element={<ConvertLead />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/plan/add" element={<AddPlan />} />

    </Routes>
  );
}

export default App;
