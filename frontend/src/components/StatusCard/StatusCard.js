import "./StatusCard.css"

export default function Card(props) {
    return(
        <>  
            <div id="Statuscard--container">
                <div>
                    <img src={props.img} height={250}  className="Statuscard--image" />
                </div>
                <div id="Statuscard--infocontainer">
                    <div id="Statuscard--info">
                        <h2>Property Name</h2>
                        <p>New York, NY</p>
                    </div>    
                    <div>
                        <h3>Current Status: </h3>
                    </div>
                </div>
            </div>
        </>
    )
}