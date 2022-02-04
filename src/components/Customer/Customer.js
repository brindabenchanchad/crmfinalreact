import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [flag, setFlag] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const [trackPage, setTrackPage] = useState(1);
   

  
    let limit = 3;

   

    useEffect(() => {
        const getCustomer = async () => {
            const demo = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers`
            );
            const datademo = await demo.json();
            const total = datademo.length;
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?per-page=${limit}&page=1`
            );
            setTrackPage(1);
            const data = await res.json();
            // console.log(data);
            setCustomers(data);
            // const total = data.length;
            setpageCount(Math.ceil(total / limit));
        };
       
            getCustomer();
        }, [limit]);

    const fetchComments = async (currentPage) => {
        // console.log(currentPage);
        const res = await fetch(
            `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?per-page=${limit}&page=${currentPage}`
        );
        setTrackPage(currentPage);
        const data = await res.json();
        return data;
    };
    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setCustomers(commentsFormServer);
        console.log(customers);
    };

   
      const handleSorting = async (event) => {
        if (flag === 0) {
            setFlag(1);
        }
        else {
            event = '-' + event;
            setFlag(0);
        }
        setTrackPage(1);
        const res = await fetch(
            `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?sort=${event}&per-page=${limit}&page=${trackPage}`
        );
        const data = await res.json();
        // console.log(data);
        setCustomers(data);
    }

    const handleSearching = async(column_name, event) => {
        if(column_name === 'customer_id') {
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[customer_id]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        if(column_name === 'firstname') {
            console.log(column_name);
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[firstname][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        if(column_name === 'lastname') {
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[lastname][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        if(column_name === 'contact_no') {
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[contact_no][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        if(column_name === 'email_id') {
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[email_id][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        if(column_name === 'city') {
            const res = await fetch(
                `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[city][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setCustomers(data);
        }

        // if(column_name === 'created_at') {
        //     const res = await fetch(
        //         `http://localhost/yii/crmfinalyii/frontend/web/index.php/customers?filter[created_at]=${event.target.value}&per-page=${limit}&page=${trackPage}`
        //     );
        //     const data = await res.json();
        //     setCustomers(data);
        // }
    };

    async function deleteCustomerHandler(object) {
        console.log(object);
        if(window.confirm('You are about to delete one record! Are you sure?')) {
            const customerData = {
                is_deleted: 1,
            }
          await fetch(`http://localhost/yii/crmfinalyii/frontend/web/index.php/customers/${object}`, {
            method: 'DELETE',
            body: JSON.stringify(customerData),
            headers: {
                'Content-type': 'application/json'
            }
          });
        }
        else {
        //   console.log('Customer not deleted!');
             alert('Problem in deletion');
        }
        window.location.reload(true);
      }

    return (
        <>
            <Navbar />
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="overflow-hidden">

                        <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr className="bg-gray-400 border-b tran    tion duration-300 ease-in-out">
                                        <td colSpan="9" className="font-bold text-2xl text-center text-white px-6 py-4">Customer</td>
                                        <td colSpan="3" className="font-bold text-2xl text-center text-white px-6 py-4">
                                            {/* <button className="float-right bg-green-300 hover:bg-green-500 text-white font-bold rounded">
                                                <NavLink to="/customer/add" className="no-underline text-white"><li className="list-none px-3 py-2 rounded-md ">Add Customer </li></NavLink>
                                            </button> */}
                                        </td>

                                    </tr>
                                    <tr>

                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('customer_id')}>
                                            Customer ID▼
                                        </th>
                                        {/* <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('opportunity_id')}>
                                            Opportunity ID▼
                                        </th> */}
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('firstname')}>
                                            FirstName▼
                                        </th>
                                         <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('lastname')}>
                                            LastName▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('contact_no')}>
                                            ContactNo▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('email_id')}>
                                            EmailId▼
                                        </th> 
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            City▼
                                        </th> 
                                        {/* <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('state')}>
                                            State▼
                                        </th> 
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('country')}>
                                            Country▼
                                        </th>  */}
                                        

                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Address Id
                                        </th> */}
                                        {/* <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4"onClick={() => handleSorting('created_at')}>
                                            Create Date▼
                                        </th> */}
                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Updated at
                                        </th> */}
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Actions
                                        </th>
                                    </tr>
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customer_id"  onChange={(event) => handleSearching('customer_id', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" onChange={(event) => handleSearching('firstname', event)}  />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="lastname" onChange={(event) => handleSearching('lastname', event)}  />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="contact_no" onChange={(event) => handleSearching('contact_no', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="email_id" onChange={(event) => handleSearching('email_id', event)}  />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="city" onChange={(event) => handleSearching('city', event)} />
                                        </td>
                                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="created_at" onChange={(event) => handleSearching('created_at', event)}  />
                                        </td> */}
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((cust) => (
                                        <tr key={cust.customer_id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.customer_id}
                                            </td>
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.opportunity_id}
                                            </td> */}
                                             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.person.firstname}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.person.lastname}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.person.contact_no}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.person.email_id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.address.city}
                                            </td>
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.address.state}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {cust.address.country}
                                            </td> */}
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(cust.created_at).getDate()).slice(-2)}-${('0' + new Date(cust.created_at).getMonth() + 1).slice(-2)}-${new Date(cust.created_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(cust.created_at).getHours() % 12).slice(-2) ? ('0' + new Date(cust.created_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(cust.created_at).getMinutes()).slice(-2)} ${new Date(cust.created_at).getHours() >= 12 ? 'PM' : 'AM'}`}

                                            </td> */}
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(cust.updated_at).getDate()).slice(-2)}-${('0' + new Date(cust.updated_at).getMonth() + 1).slice(-2)}-${new Date(cust.updated_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(cust.updated_at).getHours() % 12).slice(-2) ? ('0' + new Date(cust.updated_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(cust.updated_at).getMinutes()).slice(-2)} ${new Date(cust.updated_at).getHours() >= 12 ? 'PM' : 'AM'}`}

                                            </td> */}
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded">
                                                    <NavLink to={"update/" + cust.customer_id} exact="true">Edit</NavLink>
                                                </button>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"  onClick={() => {deleteCustomerHandler(cust.customer_id)}}>
                                                   Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />

        </>

    );
};

export default Customer;