import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

const Opportunity = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [flag, setFlag] = useState(0);
    let limit = 5;

    const changeHandler = async (event) => {
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities?filter[${event.target.id}][like]=${event.target.value}`
        );
        const data = await res.json();
        // console.log(data);
        setItems(data);
    }
    const priceChangeHandler = async (event) => {
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities?filter[${event.target.id}]=${event.target.value}`
        );
        const data = await res.json();
        // console.log(data);
        setItems(data);

    }

    const getComments = async () => {
        const demo = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities`
        );
        const datademo = await demo.json();
        const total = datademo.length;
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities?per-page=${limit}&page=1`
        );
        const data = await res.json();
        // console.log(data);
        setItems(data);
        // const total = data.length;
        setpageCount(Math.ceil(total / limit));
    };

    useEffect(() => {
        getComments();
    }, [limit]);

    const fetchComments = async (currentPage) => {
        // console.log(currentPage);
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities?per-page=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
    };

    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setItems(commentsFormServer);
        // console.log(items);
    };

    const deletefn = async (id) => {

        if (window.confirm('Are you sure you want to delete ?')) {
            const OpportunityData = {
                is_deleted: 1,
            }
            await fetch(`http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(OpportunityData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        else {
            alert('Problem in deletion');
        }
        getComments();
    }

    const handleSorting = async (event) => {
        if (flag === 0) {
            setFlag(1);
        }
        else {
            event = '-' + event;
            setFlag(0);
        }
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/opportunities?sort=${event}`
        );
        const data = await res.json();
        // console.log(data);
        setItems(data);
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
                                        <td colSpan="6" className="font-bold text-2xl text-center text-white px-6 py-4">Opportunity</td>
                                        <td colSpan="3" className="font-bold text-2xl text-center text-white px-6 py-4">
                                            <button className="float-right bg-green-300 hover:bg-green-500 text-white font-bold rounded">
                                                <NavLink to="/opportunity/add" className="no-underline text-white"><li className="list-none px-3 py-2 rounded-md ">+ Add Opportunity</li></NavLink>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>

                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('Opportunity_name')}>
                                            FullName▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('email_id')}>
                                            Email▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('contact_no')}>
                                            Contact▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            Address▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            Plan▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            is_Lead▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            created_at▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            Actions
                                        </th>
                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Is Deleted
                                        </th> */}
                                        {/* <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('created_at')}>
                                            Create Date▼
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Action
                                        </th>*/}
                                    </tr>
                                    <tr key="o1" className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Name" id="firstname" onChange={(event) => changeHandler(event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Email" id="email_id" onChange={(event) => changeHandler(event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Contact" id="contact_no" onChange={(event) => priceChangeHandler(event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead City" id="city" onChange={(event) => changeHandler(event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=" Plan Name" id="plan_name" onChange={(event) => changeHandler(event)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((opportunity) => (
                                        <tr key={opportunity.opportunity_id} className="bg-white border-black transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td
                                                td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${opportunity.person.firstname} ${opportunity.person.lastname}`}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {opportunity.person.email_id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {opportunity.person.contact_no}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${opportunity.address.city}, ${opportunity.address.state}, ${opportunity.address.country}`}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {opportunity.plan.plan_name}
                                            </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                {opportunity.lead_id !== null && <span className="text-red-500">✔︎</span>}
                                                {opportunity.lead_id === null && <span className="text-green-500">❌</span>}

                                            </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(opportunity.created_at).getDate()).slice(-2)}-${('0' + new Date(opportunity.created_at).getMonth() + 1).slice(-2)}-${new Date(opportunity.created_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(opportunity.created_at).getHours() % 12).slice(-2) ? ('0' + new Date(opportunity.created_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(opportunity.created_at).getMinutes()).slice(-2)} ${new Date(opportunity.created_at).getHours() >= 12 ? 'PM' : 'AM'}`}
                                                {/* {opportunity.created_at} */}

                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {
                                                    // opportunity.is_deleted ? <span className="text-green-700 text-m">
                                                    //     No Action Needed
                                                    // </span> : 
                                                    <>
                                                    <button className="list-none bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded">
                                                        <NavLink to={"update/" + opportunity.opportunity_id} exact="true">Edit</NavLink>
                                                    </button>
                                                    <button className="list-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={() => deletefn(opportunity.opportunity_id)}>
                                                        Delete
                                                    </button>
                                                    <button className="list-none bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={() => deletefn(opportunity.opportunity_id)}>
                                                        Convert to Customer
                                                    </button>
                                                    </>
                                                }


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

export default Opportunity;