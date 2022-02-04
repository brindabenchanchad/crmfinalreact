import React, { useRef,  useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCustomer() {

    const firstnameRef = useRef('');
    const middlenameRef = useRef('');
    const lastnameRef = useRef('');
    const contactRef = useRef('');
    const emailRef = useRef('');
    const cityRef = useRef('');
    const stateRef = useRef('');
    const countryRef = useRef('');

    const { customer_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(customer_id);
        fetch(`http://localhost/yii/crmfinalyii/frontend/web/index.php/customers/${customer_id}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                firstnameRef.current.value = result.person.firstname;
                middlenameRef.current.value = result.person.middlename;
                lastnameRef.current.value = result.person.lastname;
                contactRef.current.value = result.person.contact_no;
                emailRef.current.value = result.person.email_id;
                cityRef.current.value = result.address.city
                stateRef.current.value = result.address.state
                countryRef.current.value = result.address.country
            });
      }, [customer_id]);
    
    async function submitHandler(event) {
        event.preventDefault();

        const updateCustomer = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email_id: emailRef.current.value,
            contact_no: Number(contactRef.current.value),
            city: cityRef.current.value,
            state: stateRef.current.value,
            country: countryRef.current.value
        }

         await fetch(`http://localhost/yii/crmfinalyii/frontend/web/index.php/customers/${customer_id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(updateCustomer)
        });

        navigate('/customer');

    };

    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Update Customer
                    </h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                            First Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={firstnameRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="middlename">
                            Middle Name (Optional)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={middlenameRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                            Last Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={lastnameRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactno">
                            Contact No
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" ref={contactRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailid">
                            Email ID
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={emailRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={cityRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            State
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={stateRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Country
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={countryRef} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCustomer;