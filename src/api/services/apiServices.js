import apiConfig from './apiConfig';
import {useQuery} from "react-query";

export const getData = async () => {
    try {
        const response = await apiConfig.get('api/company/getAllEmployee'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (data) => {
    try {
        const response = await apiConfig.post('api/company/addNewEmployee', data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const getEmployeeById = async (employeeId) => {
    const response = await apiConfig.get('/api/company/getEmployeeById/'+employeeId);
    return response.data;
};

export const useEmployeeDetail = (employeeId) => {
    return useQuery(['employeeDetail', employeeId], () => getEmployeeById(employeeId));
};


export const getDataDepartment = async () => {
    try {
        const response = await apiConfig.get('api/company/department/getAllDepartment');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAllDepartments = async () => {
    const response = await apiConfig.get('/api/company/department/getAllDepartment');
    return response.data;
};

export const useAllDepartments = () => {
    return useQuery('allDepartments', getAllDepartments);
};

export const updateEmployee = async (employeeId, updatedEmployee) => {
    try {
        const response = await apiConfig.put('/api/company/editEmployeeFull/' +employeeId, updatedEmployee);
        return response; 
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error; 
    }
};

export const deleteEmployeeById = async (employeeId) => {
    try {
        const response = await apiConfig.delete("/api/company/deleteEmployeeByIdFull/"+ employeeId);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error deleting employee.');
    }
};