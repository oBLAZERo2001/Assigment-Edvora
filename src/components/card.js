import moment from "moment";

function Card({ product }) {
  const { product_name, brand_name, price, image, discription, address, time } =
    product;
  return (
    <div className="card">
      <div className="card__Flex">
        <div className="card__Flex1">
          <div className="card__Img">
            <img src={image} alt="" />
          </div>
          <div className="card__location">
            {address.city}, {address.state}
          </div>
        </div>
        <div className="card__Flex2">
          <div className="card__productName">{product_name} </div>
          <div className="card__brandName">{brand_name} </div>
          <div className="card__cost">$ {price}</div>
          <div className="card__date">
            Date: {moment(time).format("DD:MM:YYYY")}
          </div>
        </div>
      </div>
      <div className="card__description">{discription}</div>
    </div>
  );
}

export default Card;
