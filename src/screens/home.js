import { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import Product from "../components/product";
import "./home.css";

function Home() {
  const [product, setProduct] = useState(null);
  const [filterProduct, setFilterProduct] = useState(null);

  const [distinctBrandNames, setDistinctBrandNames] = useState(null);

  const [distinctProductNames, setDistinctProductNames] = useState(null);
  const [distinctStates, setDistinctStates] = useState(null);
  const [distinctCities, setDistinctCities] = useState(null);

  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [selectorDropDownProductName, setSelectorDropDownProductName] =
    useState(false);
  const [selectorDropDownState, setSelectorDropDownState] = useState(false);
  const [selectorDropDownCity, setSelectorDropDownCity] = useState(false);

  // ! get product
  useEffect(() => {
    getProduct()
      .then((product) => {
        setProduct(product);
        findDistinctBrandNames(product);
        findDistinctProductNames(product);
        findDistinctStates(product);
        findDistinctCities(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (filterProduct) {
      findDistinctProductNames(filterProduct);
      findDistinctStates(filterProduct);
      findDistinctCities(filterProduct);
    }
  }, [filterProduct]);

  // ! filter product

  useEffect(() => {
    var result = product;

    if (selectedProductName) {
      result = result.filter(
        (product) => product.product_name === selectedProductName
      );
    }
    if (selectedState) {
      result = result.filter(
        (product) => product.address.state === selectedState
      );
    }
    if (selectedCity) {
      result = result.filter(
        (product) => product.address.city === selectedCity
      );
    }
    setFilterProduct(result);
  }, [product, selectedCity, selectedProductName, selectedState]);

  useEffect(() => {
    if (filterProduct) {
      findDistinctBrandNames(filterProduct);
    }
  }, [filterProduct]);

  //  !  distinct data

  const findDistinctBrandNames = (data) => {
    const result = [];
    const map = new Map();
    for (const item of data) {
      if (!map.has(item.brand_name)) {
        map.set(item.brand_name, true);
        result.push(item.brand_name);
      }
    }
    setDistinctBrandNames(result);
  };
  const findDistinctProductNames = (data) => {
    const result = [];
    const map = new Map();
    for (const item of data) {
      if (!map.has(item.product_name)) {
        map.set(item.product_name, true);
        result.push(item.product_name);
      }
    }
    setDistinctProductNames(result);
  };
  const findDistinctStates = (data) => {
    const result = [];
    const map = new Map();
    for (const item of data) {
      if (!map.has(item.address.state)) {
        map.set(item.address.state, true);
        result.push(item.address.state);
      }
    }
    setDistinctStates(result);
  };

  const findDistinctCities = (data) => {
    const result = [];
    const map = new Map();
    for (const item of data) {
      if (!map.has(item.address.city)) {
        map.set(item.address.city, true);
        result.push(item.address.city);
      }
    }
    setDistinctCities(result);
  };

  return (
    <div className="body">
      <div className="filterBox">
        <div className="filerBox__head">filter</div>
        {/*    Products*/}
        <div>
          <div
            className="filerBox__select"
            onClick={() => {
              setSelectorDropDownProductName(!selectorDropDownProductName);
            }}
          >
            Products
            <div className="selectIcon">
              <img src="assets/drop.png" alt="" />
            </div>
          </div>
          {distinctProductNames && selectorDropDownProductName ? (
            <div className="filerBox__options__container">
              {distinctProductNames.map((productName) => (
                <div
                  className="filerBox__options"
                  onClick={() => {
                    setSelectedProductName(productName);
                    setSelectorDropDownProductName(false);
                  }}
                >
                  {productName}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/*    State*/}
        <div
          className="filerBox__select"
          onClick={() => {
            setSelectorDropDownState(!selectorDropDownState);
          }}
        >
          State
          <div className="selectIcon">
            <img src="assets/drop.png" alt="" />
          </div>
        </div>
        {distinctStates && selectorDropDownState
          ? distinctStates.map((state) => (
              <div
                className="filerBox__options"
                onClick={() => {
                  setSelectedState(state);
                  setSelectorDropDownState(false);
                }}
              >
                {state}
              </div>
            ))
          : ""}
        {/*    City*/}
        <div
          className="filerBox__select"
          onClick={() => {
            setSelectorDropDownCity(!selectorDropDownCity);
          }}
        >
          City
          <div className="selectIcon">
            <img src="assets/drop.png" alt="" />
          </div>
        </div>
        {distinctCities && selectorDropDownCity
          ? distinctCities.map((city) => (
              <div
                className="filerBox__options"
                onClick={() => {
                  setSelectedCity(city);
                  setSelectorDropDownCity(false);
                }}
              >
                {city}
              </div>
            ))
          : ""}
      </div>
      <div className="productListBox">
        <div className="head">Edvora</div>
        <div className="title">Products</div>

        {filterProduct && distinctBrandNames ? (
          distinctBrandNames.map((brandName) => (
            <Product products={filterProduct} brandName={brandName} />
          ))
        ) : (
          <div className="title">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Home;
