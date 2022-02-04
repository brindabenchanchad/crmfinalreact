import React, { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";

function AddCustomer(props) {
    const opportunityIdRef = useRef('');
   

    const [opportunityIdIsValid, setopportunityIdIsValid] = useState(true);
    
    const onOpportunityIdChange = (event) => {
        if (event.target.value.trim() === "") {
            setopportunityIdIsValid(false);
        }
        else {
            setopportunityIdIsValid(true);
        }
    }
   
     async function submitHandler(event) {

        event.preventDefault();

        // could add validation here...

        const customer = {
           opportunity_id: opportunityIdRef.current.value,
        };


        // props.onAddCustomer(customer);

        const response = await fetch('http://localhost/yii/crmfinalyii/frontend/web/index.php/customers',{
        
            method: 'POST',
            headers:{
              'Content-Type' : 'application/json'
          },
              body:JSON.stringify(customer),
             
          });
          const data = await response.json();
          console.log(data);
    };
    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Add Customer
                    </h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Opportunity Id
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="opportunity_id" type="text" placeholder="Opportunity Id" onBlur={onOpportunityIdChange} onChange={onOpportunityIdChange} ref={opportunityIdRef} />
                        {!opportunityIdIsValid &&
                            <span className="text-red-400">Opportunity Id Should not be empty.</span>
                        }
                    </div>

                    {/* <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Customer Last Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name" id="customer_lastName" ref={lastNameRef} onBlur={onLastNameChange} onChange={onLastNameChange}/>
                        {!lastNameIsValid &&
                            <span className="text-red-400">Last Name Should not be empty.</span>
                        }
                    </div> */}

                    <div className="flex items-center justify-between">

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Add
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;