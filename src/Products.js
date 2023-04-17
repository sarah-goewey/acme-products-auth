import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ()=> {
  const { products } = useSelector(state => state);
  return (
    <div>
      <ul>
        {
          products.map( product => {
            return (
              <li key={ product.id }>
                { product.name }
                { !!product.inStock && <em> is in stock</em>}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
