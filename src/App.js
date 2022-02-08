import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Plan from './components/Plan/Plan';
import AddPlan from './components/Plan/AddPlan';
import { Route, Routes } from 'react-router-dom';
import Employee from './components/Employee/Employee';
import AddEmployee from './components/Employee/AddEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/plan/add" element={<AddPlan />} />
      <Route path="/employee/add" element={<AddEmployee />} />
      <Route path="/employee/update/:id" element={<UpdateEmployee />} />

    </Routes>
  );
}

export default App;
