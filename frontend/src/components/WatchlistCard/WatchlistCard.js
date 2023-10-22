import "./WatchlistCard.css"

export default function Card(props) {
    return(
        <div id="Watchlistcard--container">
            <div>
                <img src={props.img} height={250}  className="Watchlistcard--image" />
            </div>
            <div id="Watchlistcard--info">
                <h2>Property Name</h2>
                <p>5 *****</p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Duis est ipsum, vulputate ac tortor in, tempus ullamcorper 
                est.
                </p>
                <p>New York, NY</p>
                <button>See Property</button>
            </div>    
        </div>
    )
}