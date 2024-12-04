import React, { useEffect, useState } from 'react';
import { getData,deleteEmployeeById } from '../services/apiServices';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ApiPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getData(); 
                setData(result);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (data) => {
        const confirmDelete = window.confirm('Are you sure you want to delete data?');
        if (!confirmDelete) return;

        try {
            await deleteEmployeeById(data.employeeId);
            alert('Employee deleted successfully.');
            navigate('/apipage'); 
        } catch (error) {
            alert(error.message);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-CA'); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Employee Data API :</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Hire Date</th>
                        <th>Department Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{formatDate(employee.hireDate)}</td>
                            <td>{employee?.department?.departmentName}</td>
                            <td> 
                            {employee?.employeeId && (
                                <Link to={'/editEmployee/'+employee.employeeId}>
                                <Button variant="primary">Edit</Button>
                                </Link>
                            )}
                           <button onClick={() => handleDelete(employee)}>Hapus</button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApiPage;
