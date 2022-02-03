import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

const Lead = () => {
    const [items, setItems] = useState([]);
    const [flag, setFlag] = useState(0);
    const [trackPage, setTrackPage] = useState(1);
    const [pageCount, setpageCount] = useState(0);

    let limit = 3;

    const getComments = async () => {
        const demo = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads`
        );
        const datademo = await demo.json();
        const total = datademo.length;
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?per-page=${limit}&page=1`
        );
        setTrackPage(1);
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
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?per-page=${limit}&page=${currentPage}`
        );
        setTrackPage(currentPage);
        const data = await res.json();
        return data;
    };
    
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setItems(commentsFormServer);
        console.log(items);
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
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?sort=${event}&per-page=${limit}&page=${trackPage}`
        );
        const data = await res.json();
        
        // console.log(data);
        setItems(data);
    }

    const handleSearching = async (column_name, event) => {

        if(column_name == 'lead_id') {
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?filter[lead_id]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if(column_name == 'contact_no') {
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?filter[contact_no]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if(column_name == 'firstname') {
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?filter[firstname][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if(column_name == 'email_id') {
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?filter[email_id][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if(column_name == 'city') {
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?filter[city][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }
    }

    const deletefn = async (id) => {
        console.log(id);
        if (window.confirm('Are you sure you want to delete ?')) {
            await fetch(`http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads/${id}`, {
                method: 'DELETE',
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

    return (
        <>
            <Navbar />
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="overflow-hidden">

                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr className="bg-gray-400 border-b transition duration-300 ease-in-out">
                                        <td colSpan="4" className="font-bold text-2xl text-center text-white px-6 py-4">lead</td>
                                        <td colSpan="2">
                                            <button className="float-right bg-gray-200 hover:bg-gray-400 text-white font-bold rounded">
                                            <NavLink to="/lead/add"><li className="list-none px-3 py-2 rounded-md ">Add lead</li></NavLink></button>
                                        </td>
                                    </tr>
                                    <tr>
                                    <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('lead_id')}>
                                            Lead ID▼
                                        </th>
                                    <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('firstname')}>
                                            Lead Name▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('email_id')}>
                                            Lead Email▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('contact_no')}>
                                            Lead Contact▼
                                        </th>
                                        <th scope="col" className="cursor-pointer text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('city')}>
                                            Lead City▼
                                        </th>
                                    </tr>
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead ID" id="task_name" onChange={(event) => handleSearching('lead_id', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Name" id="task_description" onChange={(event) => handleSearching('firstname', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Email" id="create_date" onChange={(event) => handleSearching('email_id', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead Contact" id="create_date" onChange={(event) => handleSearching('contact_no', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Lead City" id="create_date" onChange={(event) => handleSearching('city', event)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((lead) => (
                                        <tr key={lead.lead_id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {lead.lead_id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {lead.person.firstname}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {lead.person.email_id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {lead.person.contact_no}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {lead.address.city}
                                            </td>
                                            {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(lead.created_at).getDate()).slice(-2)}-${('0' + new Date(lead.created_at).getMonth() + 1).slice(-2)}-${new Date(lead.created_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(lead.created_at).getHours() % 12).slice(-2) ? ('0' + new Date(lead.created_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(lead.created_at).getMinutes()).slice(-2)} ${new Date(lead.created_at).getHours() >= 12 ? 'PM' : 'AM'}`}

                                            </td> */}
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded">
                                                    <NavLink to={"update/" + lead.lead_id} exact="true">Edit</NavLink>
                                                </button>
                                                <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded" exact="true" onClick={() => deletefn(lead.lead_id)}>
                                                    Delete
                                                </button>
                                                <NavLink to={"convert/" + lead.lead_id} exact="true">
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded">
                                                    Convert to Opportunity
                                                </button>
                                                </NavLink>
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

export default Lead;