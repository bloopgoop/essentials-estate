import Couch from "../../assets/couch.jpg"
import Card from "../../components/Card/Card"
import "./Assets.css"

export default function Assets(){
    return(
        <>
            <h1>Assets</h1>
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