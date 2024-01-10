import "./AssetCard.css";

export default function Card(props) {
  console.log(props.owner);

  if (!props) return <h1>Loading...</h1>;

  return (
    <div id="Assetcard--container">
      <div>
        <img
          // src={props.photos[0].img}
          height={250}
          className="Assetcard--image"
          alt={props.title}
        />
      </div>
      <div id="Assetcard--info">
        <h2>Property Name</h2>
        <p>5 *****</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis est
          ipsum, vulputate ac tortor in, tempus ullamcorper est.
        </p>
        <p>New York, NY</p>
      </div>
    </div>
  );
}
