import React from 'react'
import Employee from '../components/Employee'
import { useState } from 'react'
import Layout from './Layout'
import {v4 as uuidv4} from 'uuid'
import AddEmployee from '../components/AddEmployee'
import EditEmployee from '../components/EditEmployee'

const Employees = () => {
    const [role, setRole] = useState('dev');
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "Celeb",
            role: "Intern",
            img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        },
        {
            id: 2,
            name: "Abby",
            role: "Developer",
            img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
        },
        {
            id: 3,
            name: "John",
            role: "Software Engineer",
            img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
        },
        {
            id: 4,
            name: "Daryl",
            role: "Data Science",
            img: "https://images.pexels.com/photos/2232981/pexels-photo-2232981.jpeg"
        },
        {
            id: 5,
            name: "Emma",
            role: "Senior",
            img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
        },
        {
            id: 6,
            name: "Sundep",
            role: "Senior Software Engineer",
            img: "https://images.pexels.com/photos/2287252/pexels-photo-2287252.jpeg"
        },
    ])

    function updateEmployee(id, newName, newRole){
        const updateEmployees = employees.map((employee) => {
            if(id == employee.id){
                return {...employee, name: newName, role: newRole };
            }
            return employee;
        });
        setEmployees(updateEmployees);
    };

    function newEmployee(name, address, phone, role, img){
        const newEmployee = {
            id: uuidv4(),
            name: name,
            address: address,
            phone: phone,
            role: role,
            img: img,
        }
        setEmployees([...employees, newEmployee])
    };

    const showEmployees = true;

  return (
   <Layout>
        {showEmployees ? (
            <>
            <input
                type='text'
                onChange={(e) => {
                    console.log(e.target.value);
                    setRole(e.target.value);

                }} />
            <div className='flex flex-wrap justity-center'>
                {employees.map((employee) => {
                    const editEmployee = (
                        <EditEmployee 
                            id={employee.id}
                            name={employee.name} 
                            role={employee.role}
                            updateEmployee={updateEmployee}/>
                    );
                    return (
                        <Employee 
                            key={employee.id}
                            id={employee.id}
                            name={employee.name} 
                            role={employee.role} 
                            img={employee.img}
                            editEmployee={editEmployee}
                        />
                    );
                })}
            </div>
            <AddEmployee newEmployee={newEmployee}/>
            </>
        ) : (
            <p>'You cannot see employee'</p>
        )}
    </Layout>
  );
}

export default Employees