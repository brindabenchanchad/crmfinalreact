import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Plan from './components/Plan/Plan';
import AddPlan from './components/Plan/AddPlan';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/plan/add" element={<AddPlan />} />

    </Routes>
  );
}

export default App;
