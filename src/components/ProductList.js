import { useCallback, useEffect, useState } from 'react';
export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState('http://localhost:8000/products');
  // set laoding state
  const [loading, setLoading] = useState(false);

  // using useCallback hook to control dependencies for which its function is defined outside it's own scope
  const fetchProducts = useCallback(async () => {
    // changes the function to true so the precedence could run
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      // changes the function to false so the precedence terminates
      setLoading(false);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [url]);

  // using the url dependency for the asynchronous action
  useEffect(() => {
    //IT IS FINE INSIDE, JUST HAVING AN ILLUSTRATION OF WHAT TO BE USED IF IT'S FUNCTION IS DEFINED OUTSIDE
    //   const fetchProducts = async () => {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setProducts(data);
    //   };
    fetchProducts();
    console.log('-');
  }, [fetchProducts]);

  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setProducts(data));
  //   }, [url]);

  return (
    <section>
      {/* rendering the loading action */}
      {loading && <p>Loading products</p>}
      <div className="filter">
        <button onClick={() => setUrl('http://localhost:8000/products')}>
          All
        </button>
        <button
          onClick={() => setUrl('http://localhost:8000/products?in_stock=true')}
        >
          Instock
        </button>
      </div>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <p className="id">{product.id}</p>
          <p id="name">{product.name}</p>
          <p className="info">
            <span className="price">${product.price}</span>
            <span className={product.in_stock ? 'instock' : 'unavailable'}>
              {product.in_stock ? 'In Stock' : 'Unavailable'}
            </span>
          </p>
        </div>
      ))}
    </section>
  );
};
