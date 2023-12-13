import Couch from "../../assets/couch.jpg"
import Card from "../../components/WatchlistCard/WatchlistCard"
import "./Assets.css"

export default function Assets(){
    return(
        <>
            <h1>Assets</h1>
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
            <div id="asset-container">
                <div className="asset-item">
                    <Card img={Couch}/>
                    <Card img={Couch}/>
                    <Card img={Couch}/>
                </div>
            </div>
        </>
    )
}