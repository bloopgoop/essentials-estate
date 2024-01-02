import "./AssetCard.css";

export default function Card(props) {
  return (
    <div id="Assetcard--container">
      <div>
        <img
          src={props.img}
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
