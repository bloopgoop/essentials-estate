// DEPRECATED

// import Footer from "components/Footer/Footer";
// import Navbar from "components/Navbar/Navbar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import paymentService from "services/payment/paymentAPI";
// import "./Payment.css";

// // Method of payment view. User can enter method of payment, it will be save to their account.
// // Success -> Add property view, else -> error message, retry

// function PaymentForm() {
//   const navigate = useNavigate();
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");

//   const skipFunction = (event) => {
//     console.log("Skipping payment");
//     navigate("/add-property");
//   };

//   // not implemented client sided checking
//   const handleSubmit = (event) => {
//     "use server";
//     console.log("Submitting form");
//     paymentService
//       .upload({ cardNumber, expiryDate, cvv })
//       .then((response) => {
//         console.log(response);
//         alert("Payment method saved");
//         navigate("/add-property");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert(error);
//       });

//     console.log(e);
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <Navbar />
//       <div id="payment-view">
//         <div className="payment-box">
//           <h1>Payment Information</h1>
//           <div>We accept xyz forms of payment (images)</div>
//           <form onSubmit={handleSubmit}>
//             <div className="payment-inputs">
//               <div>
//                 <label htmlFor="cardNumber">Credit Card Number:</label>
//                 <input
//                   type="text"
//                   id="cardNumber"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="expiryDate">Expiry Date:</label>
//                 <input
//                   type="text"
//                   id="expiryDate"
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="cvv">CVV:</label>
//                 <input
//                   type="text"
//                   id="cvv"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                 />
//               </div>
//             </div>

//             <button id="submit-method" type="submit">
//               Submit
//             </button>
//           </form>
//           <button onClick={skipFunction} id="skip-method">
//             Skip
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default PaymentForm;
