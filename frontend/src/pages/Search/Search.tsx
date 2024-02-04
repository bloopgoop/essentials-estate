import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "components/Footer/Footer";
import Loading from "components/Loading/Loading";
import Navbar from "components/Navbar/Navbar";
import PreviewCard from "components/PreviewCard/PreviewCard";
import propertyService from "services/property/propertyAPI";
import "./Search.css";
import { Property } from "types/property";

const searchTerms = [
  "address",
  "city",
  "state",
  "zip",
  "title",
  "description",
  "owner",
  "type",
];

const MAX_PROPERTIES = 100;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [shownProperties, setShownProperties] = useState<Property[]>([]); // properties that are shown on the page
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    if (properties.length >= MAX_PROPERTIES) {
      setHasMore(false);
      return;
    }
    propertyService
      .getRange(properties.length, properties.length + 20)
      .then((response) => {
        if (response.status === 204) {
          // no more properties to fetch
          setHasMore(false);
          return;
        }

        setProperties(properties.concat(response.data));
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  };

  const useMountEffect = (fun: () => void) => useEffect(fun, []); // eslint-disable-line react-hooks/exhaustive-deps
  useMountEffect(fetchData); // fetch data on mount

  // show matched properties first, then unmatched after
  useEffect(() => {
    if (searchTerm === "") {
      setShownProperties(properties);
      return;
    }
    let filteredProperties = [];
    let unmatchedProperties = [];
    for (let i = 0; i < properties.length; i++) {
      let hasSearchTerm = Object.keys(properties[i]).some((key) => {
        if (!searchTerms.includes(key)) {
          return false;
        }

        if (typeof properties[i].key === "number") {
          return properties[i][key]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }

        return properties[i][key]
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      if (hasSearchTerm) {
        filteredProperties.push(properties[i]);
      } else {
        unmatchedProperties.push(properties[i]);
      }
    }
    setShownProperties([...filteredProperties, ...unmatchedProperties]);
  }, [searchTerm, properties]);

  return (
    <>
      <Navbar />
      <div id="search">
        <div id="filter">
          <h1 className="text-2xl font-bold mb-5">Search for properties</h1>
          <input
            id="searchTerm"
            type="text"
            placeholder="Search by location, owner, type..."
            onChange={(event) =>
              setSearchTerm(event.target.value.toLowerCase())
            }
          />
        </div>

        <InfiniteScroll
          dataLength={properties.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p
              style={{ textAlign: "center", margin: "auto", marginTop: "3rem" }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid">
            {shownProperties.map((property, index) => (
              <div className="grid-item" key={index}>
                <PreviewCard property={property} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      <Footer />
      </div>
    </>
  );
}

export default Search;
