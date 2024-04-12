import React from 'react';
import { useState } from "react";

export function ProductRow(props) {
    const id = props.product._id;
    const createdAt = props.product.createdAt;
    const updatedAt = props.product.updatedAt;

    const fetchProducts = props.fetchProducts;
    const setLoadingFunction = props.setLoadingFunction;
    const unSetLoadingFunction = props.unSetLoadingFunction;
    const setErrorFunction = props.setErrorFunction;
    const unSetErrorFunction = props.unSetErrorFunction;
    const showMore = props.showMore;
    const unSetProducts = props.unSetProducts;

    const [title, setTitle] = useState(props.product.title);
    const [description, setDescription] = useState(props.product.description);

    const formatDate = (datetime) => {
        const dateTime = new Date(datetime);
        const year = dateTime.getFullYear();
        const date = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        if (minutes<10) {
            return `${date}/${month}/${year} ${hours}:0${minutes}`;
        } else {
            return `${date}/${month}/${year} ${hours}:${minutes}`;
        }
    }

    const updateProduct = (e) => {
        unSetProducts();
        unSetErrorFunction();
        setLoadingFunction();
        e.preventDefault();
        const updatedProduct = { title, description };

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        };

        fetch(`http://localhost:3001/products/${id}?__method=PUT`, requestOptions)
            .then(async res => {
                unSetLoadingFunction();
                if (res.status === 400) {
                    setErrorFunction('Response error');
                } else {
                    window.location = "/";
                }
            })
            .catch(err => {
                unSetLoadingFunction();
                setErrorFunction(err.message);
            });
    };

    const deleteProduct = (e) => {
        unSetProducts();
        unSetErrorFunction();
        setLoadingFunction();
        setErrorFunction(null);

        const requestOptions = {
            method: 'DELETE'
        };

        fetch(`http://localhost:3001/products/${id}`, requestOptions)
            .then(async res => {
                unSetLoadingFunction();
                if (res.status === 400) {
                    setErrorFunction("Response error");
                } else {
                    window.location = "/";
                }
            })
            .catch(err => {
                unSetLoadingFunction();
                setErrorFunction(err.message);
            });
    }

    return (
        <>
            <tr>
                <td><input className="td-input" onBlur={updateProduct} type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></td>
                <td><textarea className="td-input" onBlur={updateProduct} type="text" value={description} onChange={(e) => setDescription(e.target.value)}/></td>
                <td>{formatDate(createdAt)}</td>
                <td>{formatDate(updatedAt)}</td>
                <td><button className="td-button" value={id} onClick={showMore}>Show</button></td>
                <td><button className="td-button" onClick={deleteProduct}>Delete</button></td>
            </tr>
        </>
    );
};
