import "./Card.css"

export default function Card(props) {
    return(
        <div id="card-container">
            <img src={props.img} height={200}  className="card--image" />
            <div className="card--stats">
                {/* <img src="../images/star.png" className="card--star" /> */}
                <span>5.0</span>
            </div>
            <p>New York, New York</p>
            <p><span className="bold">From $136</span> / person</p>
        </div>
    )
}