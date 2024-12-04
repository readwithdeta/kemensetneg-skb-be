import React from 'react';
import { postData } from '../services/apiServices';
import { useAllDepartments } from '../services/apiServices';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const AddEmployeeForm = () => {
    const { control, handleSubmit, reset } = useForm(); 
    const { data: departments = [] } = useAllDepartments(); 
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const onSubmit = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const department = departments.find(
                (dept) => dept.departmentId === parseInt(formData.departmentId, 10)
            );
            const dataToSubmit = { ...formData, department };

            const response = await postData(dataToSubmit);
            console.log('Employee added:', response);
            alert('Employee added successfully!');
            reset();
            navigate('/apipage');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to add employee. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
    
                <div>
                    <label>First Name:</label>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'First Name is required' }}
                        render={({ field }) => (
                            <input type="text" {...field} placeholder="First Name" />
                        )}
                    />
                </div>

                <div>
                    <label>Last Name:</label>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Last Name is required' }}
                        render={({ field }) => (
                            <input type="text" {...field} placeholder="Last Name" />
                        )}
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => (
                            <input type="email" {...field} placeholder="Email" />
                        )}
                    />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input type="text" {...field} placeholder="Phone Number" />
                        )}
                    />
                </div>

                <div>
                    <label>Hire Date:</label>
                    <Controller
                        name="hireDate"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input type="date" {...field} />
                        )}
                    />
                </div>

                <div>
                    <label>Department:</label>
                    <Controller
                        name="departmentId"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please select a department' }}
                        render={({ field }) => (
                            <Form.Select {...field}>
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.departmentId} value={dept.departmentId}>
                                        {dept.departmentName}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    />
                </div>

                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployeeForm;
