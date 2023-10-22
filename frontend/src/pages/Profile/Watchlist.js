import Couch from "../../assets/couch.jpg"
import Card from "../../components/WatchlistCard/WatchlistCard"
import "./Watchlist.css"

export default function Watchlist(){
    return(
        <>
            <h1>Watchlist</h1>
            < Card img={Couch}/>
        </>
    )
}