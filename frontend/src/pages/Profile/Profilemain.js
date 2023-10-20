import Person from "../../assets/person.jpg"

export default function Profilemain(){
    return(
    <div id="profile-box">
      <img src={Person} height={260} width={260}/>
      <div className="items">
        <h1>First Last</h1>
        <p>Username:</p>
        <p>Email:</p>
        <p>Phone:</p>
        <p>DOB:</p>
      </div>
    </div>
)}
