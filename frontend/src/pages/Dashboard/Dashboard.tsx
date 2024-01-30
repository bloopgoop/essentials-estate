// DEPRECATED


// import Footer from "components/Footer/Footer";
// import Navbar from "components/Navbar/Navbar";
// import { useEffect, useState } from "react";
// import propertyService from "services/property/propertyAPI";
// import "./Dashboard.css";
// import Liked from "./LikedSection/LikedSection";
// import Recommendation from "./RecommendationSection/RecommendationSection";
// import Search from "./SearchSection/SearchSection";
// import SimilarItems from "./SimilarItemsSection/SimilarItemsSection";

// // Dashboard should show recommended property listings, liked properties,
// // Normally you'll have two components: ThingThatLoadsData and ChildThatShowsData.

// export default function Root() {
//   // state that holds the list of properties
//   const [properties, setProperties] = useState([]);

//   // call api on first render
//   useEffect(() => {
//     console.log("useEffect called");
//     propertyService
//       .getAll()
//       .then((properties) => {
//         setProperties(properties);
//         console.log(properties);
//       })
//       .catch((error) => {
//         alert(`Error fetching properties: ${error}`);
//       });
//   }, []);

//   return (
//     <>
//       <button>get more data</button>

//       <div id="dashboard">
//         <Navbar />
//         <Recommendation property={properties[0]} />
//         <SimilarItems properties={properties} />
//         <Liked properties={properties} />
//         <Search />
//       </div>
//       <Footer />
//     </>
//   );
// }
