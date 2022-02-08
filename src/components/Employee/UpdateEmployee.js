import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {

    const fnameRef = useRef('');
    const lnameRef = useRef('');
    const contactRef = useRef('');
    const emailRef = useRef('');
    const designationRef = useRef('');
    const salaryRef = useRef('');
    const cityRef = useRef('');
    const stateRef = useRef('');
    const countryRef = useRef('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8888/yii/Employee/frontend/web/index.php/employees/${id}`)
            .then((res) => res.json())
            .then((result) => {
                fnameRef.current.value = result.person.firstname;
                lnameRef.current.value = result.person.lastname;
                contactRef.current.value = result.person.contact_no;
                emailRef.current.value = result.person.email_id;
                designationRef.current.value = result.designation;
                salaryRef.current.value = result.salary;
                cityRef.current.value = result.address.city
                stateRef.current.value = result.address.state
                countryRef.current.value = result.address.country

            });
    }, [id]);

    async function submitHandler(event) {
        event.preventDefault();

        const employee = {
            firstname: fnameRef.current.value,
            lastname: lnameRef.current.value,
            contact_no: Number(contactRef.current.value),
            email_id: emailRef.current.value,
            designation: designationRef.current.value,
            salary: salaryRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            country: countryRef.current.value,
        }

        const employees = await fetch(`http://localhost:8888/yii/Employee/frontend/web/index.php/employees/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(employee)
        });

        navigate('/employee');

    };

    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-fit justify-center items-center">

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Add Employee
                    </h3>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Employee FirstName
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="text" placeholder="Employee name" ref={fnameRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Employee LastName
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="text" placeholder="Employee name" ref={lnameRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Contact number
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="number" placeholder="Employee name" ref={contactRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Email Id
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="email" placeholder="Employee name" ref={emailRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                            Designation
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Designation" id="designation" ref={designationRef} ></textarea>

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            Salary
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="number" placeholder="Salary" ref={salaryRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="City" ref={cityRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            State
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="state" ref={stateRef} />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            Country
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="country" ref={countryRef} />

                    </div>

                    <div className="flex items-center justify-between">

                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Add Employee
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;