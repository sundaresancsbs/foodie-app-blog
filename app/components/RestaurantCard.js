export default function RestaurantCard({ name, image, details, price }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {details && <p className="details">{details}</p>}
      {price && <p className="price">{price}</p>}
    </div>
  );
}
