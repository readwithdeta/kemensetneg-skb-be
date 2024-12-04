import logo from './logo.svg';
import './App.css';
import ApiPage from './api/pages/ApiPage';
import Login from './api/pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddEmployeeForm from './api/pages/AddNewEmployee';
import EditEmployeeForm from './api/pages/EditEmployee';
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Router>
      <Navbar>Logout</Navbar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/apipage" element={<ApiPage />} />
            <Route path="/addNewEmployee" element={<AddEmployeeForm />} />
            <Route path="/editEmployee/:employeeId" element={<EditEmployeeForm />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
