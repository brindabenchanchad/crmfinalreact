import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

const Lead = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    let limit = 5;

    useEffect(() => {
        const getComments = async () => {
            const demo = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads`
            );
            const datademo = await demo.json();
            const total = datademo.length;
            const res = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?per-page=${limit}&page=1`
            );
            const data = await res.json();
            console.log(data);
            // setItems(data);
            // const total = data.length;
            // setpageCount(Math.ceil(total / limit));
        };
        getComments();
    }, [limit]);
    
    const fetchComments = async (currentPage) => {
        // console.log(currentPage);
        const res = await fetch(
            `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads?per-page=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
    };
    
    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setItems(commentsFormServer);
        console.log(items);
    };
    return (
        <>
           
        </>

    );
};

export default Lead;