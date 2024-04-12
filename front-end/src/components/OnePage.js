import React from 'react';
import { ProductRow } from "./ProductRow";

export function OnePage(props) {

    const products = props.products;
    const fetchProducts = props.fetchProducts;
    const setLoadingFunction = props.setLoadingFunction;
    const unSetLoadingFunction = props.unSetLoadingFunction;
    const setErrorFunction = props.setErrorFunction;
    const unSetErrorFunction = props.unSetErrorFunction;
    const showMore = props.showMore;
    const unSetProducts = props.unSetProducts;

    return (
        <>
            {products.map((product) => (
                <ProductRow unSetProducts={unSetProducts} showMore={showMore} setLoadingFunction={setLoadingFunction} unSetLoadingFunction={unSetLoadingFunction} setErrorFunction={setErrorFunction} unSetErrorFunction={unSetErrorFunction} key={ product._id } fetchProducts={fetchProducts} product={product}/>
            ))}
        </>
    );
};
