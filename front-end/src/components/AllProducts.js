import React from "react";
import { useState, useEffect } from "react";
import { OnePage } from "./OnePage";

export function AllProducts() {

    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [countInPage, setCountInPage] = useState(2);
    const [page, setPage] = useState(1);
    const [countedProducts, setCountedProducts] = useState(null);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(2);

    const [filteredProducts, setFilteredProducts] = useState(null);

    const [filterTitle, setFilterTitle] = useState("");
    const [filterDescription, setFilterDescription] = useState("");

    const unSetProducts = () => {
        setProducts(null);
    }

    const changeCountInPage = (e) => {
        setCountInPage(e.target.value);
        countProducts(e.target.value, filteredProducts);
    }

    const countProducts = (newCount, filtered) => {
        const maxPage = Math.ceil(filtered.length/newCount);
        if ((page-1) * parseInt(newCount) + 1 > filtered.length) {
            const newFirst = parseInt((maxPage-1) * parseInt(newCount));
            const newLast = parseInt(newFirst + parseInt(newCount));
            setCountedProducts(filtered.slice(newFirst, newLast));
            setFirst(newFirst);
            setLast(newLast);
            if (maxPage == 0) {
                setPage(1);
            } else {
                setPage(maxPage);
            }
            
        } else {
            const newFirst = parseInt((page-1) * parseInt(newCount));
            const newLast = parseInt(newFirst + parseInt(newCount));
            setCountedProducts(filtered.slice(newFirst, newLast));
            setFirst(newFirst);
            setLast(newLast);
        }
    }

    const filterProductsByTitle = (e) => {
        const text = e.target.value;
        setFilterTitle(text);
        const newProducts0 = products.filter(product => 
            product.title.toLowerCase().includes(text));
        const newProducts = newProducts0.filter(product => 
            product.description.toLowerCase().includes(filterDescription));
        setFilteredProducts(newProducts);
        countProducts(countInPage, newProducts);
    }
    
    const filterProductsByDescription = (e) => {
        const text = e.target.value;
        setFilterDescription(text);
        const newProducts0 = products.filter(product => 
            product.description.toLowerCase().includes(text));
        const newProducts = newProducts0.filter(product => 
            product.title.toLowerCase().includes(filterTitle));
        setFilteredProducts(newProducts);
        countProducts(countInPage, newProducts);
    }

    const previousPage = () => {
        if (page > 1) {
            const newFirst = first - countInPage;
            const newLast = last - countInPage;
            setCountedProducts(filteredProducts.slice(newFirst, newLast));
            setFirst(newFirst);
            setLast(newLast);
            const newPage = parseInt(page - 1);
            setPage(newPage);
        }
    }

    const nextPage = () => {
        if (page < Math.ceil(filteredProducts.length/countInPage)) {
            const newFirst = parseInt(first) + parseInt(countInPage);
            const newLast = parseInt(last) + parseInt(countInPage);
            setCountedProducts(filteredProducts.slice(newFirst, newLast));
            setFirst(newFirst);
            setLast(newLast);
            const newPage = parseInt(page + 1);
            setPage(newPage);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const setErrorFunction = (err) => {
        setError(err);
    }

    const unSetErrorFunction = () => {
        setError(null);
    }

    const setLoadingFunction = () => {
        setLoading(true);
    }

    const unSetLoadingFunction = () => {
        setLoading(false);
    }

    const fetchProducts = () => {
        setProducts(null);
        setError(null);
        setLoading(true);

        setCountInPage(2);
        setPage(1);
        setFilterDescription("");
        setFilterTitle("");

        fetch('http://localhost:3001/products')
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setProducts(data);
                setFilteredProducts(data);
                countProducts(2, data);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    };

    const saveProductClicked = (e) => {
        setProducts(null);
        e.preventDefault();
        const product = { title, description };
        setLoading(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };

        fetch('http://localhost:3001/products', requestOptions)
            .then(async res => {
                setLoading(false);
                if (res.status === 400) {
                    setError("Response error");
                } else {
                    window.location = "/";
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message);
            });
    }

    const showMore = (e) => {
        const id = e.target.value;
        window.location = '/' + id;
    }

    return (
        <div className="content">
            <div className="all-products">
                <div className="">
                    
                    {loading && <div className="loading-div">Loading...</div>}
                    {error && <div className="error-div"><div className="error-text">{error}</div></div>}
                    {countedProducts && <div className="counted-products">
                        <div className="in-one-page">
                        <h5>Products in one page: </h5>
                        <input type="number" min="1" max={filteredProducts.length} value={countInPage} onChange={(e) => changeCountInPage(e)}/>
                    </div>
                    <div>
                        <div className="filter-by">
                        <h5>Filter by title: </h5>
                        <input value={filterTitle} type="text" onChange={filterProductsByTitle}/>
                        </div>
                        <div className="filter-by">
                        <h5>Filter by description: </h5>
                        <input value={filterDescription} type="text" onChange={filterProductsByDescription}/>
                        </div>
                    </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th>Show More</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <OnePage unSetProducts={unSetProducts} showMore={showMore} setLoadingFunction={setLoadingFunction} unSetLoadingFunction={unSetLoadingFunction} setErrorFunction={setErrorFunction} unSetErrorFunction={unSetErrorFunction} fetchProducts={fetchProducts} products={countedProducts}/>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><input className="td-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></td>
                                    <td><textarea className="td-input" value={description} onChange={(e) => setDescription(e.target.value)}/></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><input className="td-button" onClick={saveProductClicked} value="Add Product" type="submit"/></td>
                                </tr>
                            </tfoot>
                        </table>
                    <div className="page">
                        <button onClick={previousPage}>Previous Page</button>
                        <p className="page-count">{page}</p>
                        <button onClick={nextPage}>Next Page</button>
                    </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};