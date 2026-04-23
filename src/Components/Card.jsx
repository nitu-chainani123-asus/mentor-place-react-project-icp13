import "../styles/Card.css";

const Card = ({ title, value, type }) => {
  return (
    <div className={`card card-${type}`}>
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Card;