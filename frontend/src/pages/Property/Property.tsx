import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import propertyService from "services/property/propertyAPI";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Gallery from "components/Gallery/Gallery";
import "./Property.css";
import axios from "services/axiosConfigs";
import AuthContext from "context/AuthContext";
import RentalButton from "./RentalButton";
import Footer from "components/Footer/Footer";
import Loading from "components/Loading/Loading";
import Comment from "components/Comment/Comment";
import star from "assets/star.svg";
import OwnerInfo from "./OwnerInfo/OwnerInfo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import RatingForm from "./RatingForm";
import { Rating } from "types/rating";

const Property = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // let { user, logoutUser } = useContext(AuthContext);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Get ratings and average rating
    // catch any errors and redirect to error page
    const request = axios.get(`property/rating/${id}`);
    request.then((response) => setAvgRating(response.data.average_value));
    request.then((response) => setRatings(response.data.ratings.reverse()));

    // Get property info on load, changes after every update to property id or auth.user
    propertyService
      .getOne(id)
      .then((response) => {
        setProperty(response.data);
        if (auth.user) {
          setIsOwner(response.data.ownerID === auth.user.user_id);
        }
      })
      .catch((error) => {
        console.error("Error making GET request:", error);
        navigate("/error");
      });
  }, [id, auth.user, navigate]);

  const handleGet = (event) => {
    event.preventDefault();
    const request = axios.get(`property/rating/${id}`);
    request
      .then((response) => {
        setAvgRating(response.data.average_value);
        setRatings(response.data.ratings.reverse());
      })
      .catch((error) => {
        console.error("Error making GET request:", error);
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("stars", stars);
    formData.append("propertyID", id);
    formData.append("comment", comment);
    formData.append("token", auth.authTokens.access);
    const request = axios.post(`property/rating/${id}`, formData);
    request
      .then((response) => {
        console.log("Success:", response.data);
        // Updates comments and rating every post
        handleGet(event);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  const handlePut = (event, ratingId, userID) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", ratingId);
    formData.append("userID", userID);
    formData.append("comment", comment);
    formData.append("stars", stars);
    const request = axios.put(`property/rating/${id}`, formData);
    request
      .then((response) => {
        console.log("Success:", response.data);
        // Updates any updated comments
        handleGet(event);
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleDelete = (event, ratingId, userID) => {
    event.preventDefault();
    const requestData = { id: ratingId, user_id: userID };
    const request = axios.delete(`property/rating/${id}`, {
      data: requestData,
    });
    request
      .then((response) => {
        console.log("Success:", response.data);
        // Updates any updated comments
        handleGet(event);
      })
      .catch((error) => {
        console.log("Error making DELETE request:", error);
        alert("CAN'T DELETE OTHER USERS COMMENTS!");
      });
  };

  // REMOVE LATER, FOR TESTING checkGroup
  //   const checkGroup = (event) => {
  //     try {
  //       const formData = new FormData();
  //       const request = axios.post("property/checkGroup/admin", formData);
  //       request.then((response) => console.log(response.data));
  //     } catch (error) {
  //       console.log(`ERROR: ${error}`);
  //     }

  // REMOVE LATER, FOR TESTING checkGroup
  // const checkGroup = (event) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("username", user.username);
  //     formData.append("user_id", user.user_id);
  //     const request = axios.post("property/checkGroup/admin", formData);
  //     request.then((response) => console.log(response.data));
  //   } catch (error) {
  //     console.log(`ERROR: ${error}`);
  //   }
  // };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 100;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Navbar />
      {property ? (
        <div>
          <main className="max-w-7xl m-auto w-11/12 mt-10">
            <h1 className="text-4xl font-bold">
              {property.title
                ? property.title
                : property.address + " " + property.zip}
            </h1>
            <div className="split-container my-4">
              <p>{`City: ${property.city}`}</p>

              <i className="flex items-center">
                <img
                  src={star}
                  alt="star"
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.25rem",
                  }}
                />
                {property.stars}
              </i>
            </div>
            <Gallery photos={property.photos} />

            {auth.user && !isOwner ? (
              <RentalButton propertyID={id} className="mt-4 float-right" />
            ) : null}

            <OwnerInfo ownerID={property.ownerID} />

            <h2 className="text-2xl font-bold mt-20">Property Information</h2>
            <Table>
              <TableCaption>A list of property information</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Owner</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell>123 Main st</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">City</TableCell>
                  <TableCell>Brooklyn</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">State</TableCell>
                  <TableCell>New York</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Rent</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell className="text-right">$ per month</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Bedrooms</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Bathrooms</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Garage</TableCell>
                  <TableCell>{property.garage}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Area</TableCell>
                  <TableCell>{property.sqft}</TableCell>
                  <TableCell className="text-right">sqft</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Lot Size:</TableCell>
                  <TableCell>{property.lotsize}</TableCell>
                  <TableCell className="text-right">acres</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Type</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <h2 className="text-2xl font-bold mt-20">Ratings</h2>
            <RatingForm ratings={ratings} setRatings={setRatings}></RatingForm>
            {ratings
              .slice(itemOffset, itemOffset + itemsPerPage)
              .map((rating, key) => (
                <div key={key}>
                  {console.log(rating)}
                  <Comment
                    rating={rating}
                    handlePut={handlePut}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={itemsPerPage}
              pageCount={Math.ceil(ratings.length / itemsPerPage)}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              activeClassName="active"
              pageLinkClassName="page-link"
              previousLinkClassName="prev-link"
              nextLinkClassName="next-link"
            />
            {/* <img src={property.photos[0]} alt="Property" /> */}
            {/* <label htmlFor="rating">Avg rating:</label>
            <div id="rating">{avgRating}</div> */}
          <Footer />
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Property;
