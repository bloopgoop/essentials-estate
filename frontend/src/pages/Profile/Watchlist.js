import Couch from "../../assets/couch.jpg"
import Card from "../../components/WatchlistCard/WatchlistCard"
import "./Watchlist.css"

//import data from '../../property-data.json';

export default function Watchlist(){
    return(
        <>
            <h1>Watchlist</h1>
            <div id="searchsort">
                <input type="text" placeholder="Search.."/>
                <div id="sortitem">
                    <label for="sort">Sort by:</label> 
                        <select name="sort" id="sort"> 
                            <option value="recent">Recent</option>
                            <option value="A-Z">A-Z</option>  
                            <option value="low-high">low-high</option> 
                            <option value="high-low">high-low</option> 
                        </select>
                </div>
            </div>
            < Card img={Couch}/>
        </>
    )
}