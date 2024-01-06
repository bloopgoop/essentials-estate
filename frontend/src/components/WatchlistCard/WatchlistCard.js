import "./WatchlistCard.css";

export default function Card({ props }) {
  if (!props) return <h1>Loading...</h1>;

  return (
    <div id="Watchlistcard--container">
      <div>
        <img
          src={[props.photos[0]]}
          height={250}
          width={250}
          alt="Property"
          className="Watchlistcard--image"
        />
      </div>
      <div id="Watchlistcard--info">
        <h2>{props.title}</h2>
        <p>5 *****</p>
        <p>{props.description}</p>
        <p>
          {props.city}, {props.state}
        </p>
        <button>See Property</button>
      </div>
    </div>
  );
}
