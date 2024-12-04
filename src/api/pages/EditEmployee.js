import React, { useEffect,useState } from 'react';
import { useEmployeeDetail,useAllDepartments,updateEmployee } from '../services/apiServices'; 
import { useNavigate,useParams } from 'react-router-dom';
import {useForm,Controller} from "react-hook-form";
import {Button, Form, Modal, Row, Col,InputGroup,FormGroup} from "react-bootstrap";

const EditEmployeeForm = ({match}) => {
    const { employeeId } = useParams(); 
    const { data: employee, isLoading, isError } = useEmployeeDetail(employeeId);
    const { register, handleSubmit, setValue, reset, control } = useForm(); 
    const { data: departments } = useAllDepartments();
    const navigate = useNavigate();
   
    useEffect(() => {
        if (employee) {
            reset(employee);
        }
    }, [employee, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedEmployee = {
                ...data,
                department: { departmentId: data.departmentId }, 
            };

            const response = await updateEmployee(employeeId, updatedEmployee);

            if (response.status === 200) {
                alert('Employee updated successfully!');
                navigate("/apipage");
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('There was an error updating the employee.');
        }
    };


    useEffect(() => {
        if (employee && employee.hireDate) {
            const formattedDate = employee.hireDate.split('T')[0];
            setValue('hireDate', formattedDate);
        }
    }, [employee, setValue]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading employee data.</div>;

    return (
        <div>
            <h2>Edit Employee</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('firstName')}
                        placeholder="Enter First Name"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('lastName')}
                        placeholder="Enter Last Name"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register('email')}
                        placeholder="Enter Email"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('phoneNumber')}
                        placeholder="Enter Phone Number"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Hire Date</Form.Label>
                    <Form.Control
                        type="date"
                        {...register('hireDate')}
                    />
                </Form.Group>

                <Form.Group>
                <Form.Label>Department</Form.Label>
                <Controller
                    name="departmentId"
                    control={control}
                    // {...register('department.departmentId')}
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
                </Form.Group>

                <Button type="submit" variant="primary">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditEmployeeForm;
