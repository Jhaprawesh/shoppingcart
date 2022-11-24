import { useState, useEffect } from "react";
import Catogery from "./Catogery";
import Greet from "./Greet";
import Header from "./Header";
import Loding from "./Loding";
import Nav from "./Nav";

function Api() {
  const [product, setProduct] = useState([]); //orignal data
  const [showProducts, setShowProducts] = useState([]); // orignal data
  const [loading, setLodging] = useState(true); //loading
  const [sorting, setSorting] = useState(); // for sorting
  const [selectedBrand, setSelectedBrand] = useState("All"); // for brand
  const [selectedCategory, setSelectedCategory] = useState("All"); // for category
  const [search, setSearch] = useState(); // search
  const [cart, setCart] = useState([]); // cart

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.products);
        setShowProducts(data.products);

        setLodging(false);
        setSorting({
          brands: [...new Set(data.products?.map((product) => product.brand))],
          category: [
            ...new Set(data.products?.map((product) => product.category)),
          ],
        });
      })

      .catch((err) => console.log(err));
  }, []);

  // const handleSearch = (e) => {
  //   product.filter((item) => item.brand === e.target.value);
  //   console.log(product);
  // };

  const handleBrandChange = (e) => {
    if (e.target.value === "All") {
      selectedCategory === "All"
        ? setShowProducts(product)
        : setShowProducts(
            product.filter((item) => item.category === selectedCategory)
          );
      console.log("yaha hai", setShowProducts);
    } else {
      selectedCategory === "All"
        ? setShowProducts(
            product.filter((item) => item.brand === e.target.value)
          )
        : setShowProducts(
            product.filter(
              (item) =>
                item.brand === e.target.value &&
                item.category === selectedCategory
            )
          );
    }
    setSelectedBrand(e.target.value);
  };

  // handle cato

  const handleCategoryChange = (e) => {
    if (e.target.value === "All") {
      selectedBrand === "All"
        ? setShowProducts(product)
        : setShowProducts(
            product.filter((item) => item.brand === selectedBrand)
          );
    } else {
      selectedBrand === "All"
        ? setShowProducts(
            product.filter((item) => item.category === e.target.value)
          )
        : setShowProducts(
            product.filter(
              (item) =>
                item.category === e.target.value && item.brand === selectedBrand
            )
          );
    }
    setSelectedCategory(e.target.value);
  };
  //  handle search
  const handleFind = (e) => {
    setSearch(e.target.value);
    console.log(setSearch);
    e.target.value.length > 0
      ? setShowProducts(
          product.filter((item) =>
            item.title.toLowerCase().startsWith(e.target.value.toLowerCase())
          )
        )
      : setShowProducts(product);
    console.log(setShowProducts);
  };

  // add to cart
  const addTocart = (e) => {
    setCart(e.target.value([...cart, product]));
  };

  // more delete

  function handleDeleteClick(id) {
    const removeItem = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(removeItem);
  }

  const CartItem = ({ item, onDeleteClick }) => {
    return (
      <li>
        {item.title} - $ {item.price}{" "}
        <button onClick={() => onDeleteClick(item.id)}>x</button>
      </li>
    );
  };

  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <>
          <div>
            {cart.map((item) => {
              return (
                <>
                  <div>{item.title} </div>
                  <button onChange={(id) => handleDeleteClick(id)}>del</button>
                </>
              );
            })}
          </div>
          <Header value={search} name={cart.length} data={handleFind} />
          <div className=" container mx-auto flex justify-between">
            <Catogery cat={sorting.category} clickCat={handleCategoryChange} />
            <Nav brand={sorting.brands} click={handleBrandChange} />
          </div>

          <div className=" container mx-auto flex flex-wrap mt-5 gap-4 justify-between	">
            {showProducts.length === 0 ? (
              <div>
                <h1>No Products Found!</h1>
              </div>
            ) : (
              showProducts?.map((product, index) => (
                <div className="App">
                  <button onClick={() => setCart([...cart, product])}>
                    <p className=" capitalize"> add to cart</p>
                  </button>
                  <Greet
                    addCart={addTocart}
                    key={index}
                    title={product.title}
                    img={product.thumbnail}
                    discription={product.description}
                    price={product.price}
                    rating={product.rating}
                    stock={product.stock}
                  />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Api;
