import { useEffect, useRef } from "react";
import Card from "./card";

function Product({ products, brandName }) {
  const wrapper = useRef();
  // const left = () => {
  //   const scrollContainer = wrapper.current;

  //   scrollContainer.scrollLeft += -210;
  // };
  const right = () => {
    const scrollContainer = wrapper.current;

    scrollContainer.scrollLeft += 200;
  };

  //  !  scrolling
  useEffect(() => {
    const scrollContainer = wrapper.current;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }, []);

  return (
    <div className="product">
      <div className="product__title">{brandName}</div>
      <div className="scrollBox">
        {/* <div onClick={left} className="leftArrow">
          <img src="assets/left.png" alt="" />
        </div> */}
        <div className="wrapper" ref={wrapper}>
          {products.map((product) =>
            product.brand_name === brandName ? (
              <Card
                product={product}
                key={`${product.brand_name}${product.img}${product.time}`}
              />
            ) : (
              ""
            )
          )}
        </div>
        <div className="wrapper__arrow rightArrow" onClick={right}>
          <img src="assets/right.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Product;
