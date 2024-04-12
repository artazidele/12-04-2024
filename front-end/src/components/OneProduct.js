import React from "react";
import { useState, useEffect } from "react";

export function OneProduct() {
    const id = window.location.href.split('/')[3];
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = () => {
        setError(null);
        setLoading(true);
        fetch('http://localhost:3001/products/' + id)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setProduct(data);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    };

    return (
        <div className="content">
            {loading && <div className="loading-div">Loading...</div>}
            {error && <div className="error-div"><div className="error-text">{error}</div></div>}
            {product && <div className="product-page">
                <h3>{product.title}</h3>
                <div className="title-bottom">Product Title</div>
                <p>{product.description}</p>
                <div className="title-bottom">Product Description</div>
            </div>}
        </div>
    );
};
