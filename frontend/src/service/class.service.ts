import axios from 'axios';

async function getProfessors(){
    try {
        const response = await axios('http://localhost:3000/api/users?role=professor', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching professors:', error);
        throw error;
    }
}

async function getRooms(){
    try {
        const response = await axios('http://localhost:3000/api/rooms', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
}

async function getDays(){
    try {
        const response = await axios('http://localhost:3000/api/days', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching days:', error);
        throw error;
    }
}

async function getTimes(){
    try {
        const response = await axios('http://localhost:3000/api/times', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching times:', error);
        throw error;
    }
}

async function getClasses(){
    try {
        const response = await axios('http://localhost:3000/api/classes', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
}

async function getAvailableClasses(){
    try {
        const response = await axios('http://localhost:3000/api/classes/available', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching available classes:', error);
        throw error;
    }
}

async function getMyClasses() {
    try {
        const response = await axios('http://localhost:3000/api/classes/professor/classes', { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching professor classes:', error);
        throw error;
    }
}
export const classService = {
    getProfessors,
    getRooms,
    getDays,
    getTimes,
    getClasses,
    getMyClasses,
    getAvailableClasses
};