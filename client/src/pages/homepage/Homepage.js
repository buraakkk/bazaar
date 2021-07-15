import React from 'react';
import productsInfo from '../../components/mock-data';
import Products from '../../components/productList/productList';

function Homepage() {
  productsInfo.sort(function sortProductsByDateDesc(a, b) {
    const dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateB - dateA;
  });
  const sortedProductsByDate = productsInfo.slice(0, 10);
  return (
    <div>
      <h1>See What is New</h1>
      <Products products={sortedProductsByDate} />
    </div>
  );
}
export default Homepage;
