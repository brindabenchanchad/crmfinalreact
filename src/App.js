import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Plan from './components/Plan/Plan';
import AddPlan from './components/Plan/AddPlan';
import { Route,Routes } from 'react-router-dom';
import Customer from './components/Customer/Customer';
import AddCustomer from './components/Customer/AddCustomer';
import UpdateCustomer from './components/Customer/UpdateCustomer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="plan/add" element={<AddPlan />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="customer/add" element={<AddCustomer />} />
      <Route path="customer/update/:customer_id" element={<UpdateCustomer />} />
    </Routes>
  );
}

export default App;
