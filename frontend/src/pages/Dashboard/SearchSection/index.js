import { Link } from "react-router-dom";
import "./styles.css";

export default function SearchSection() {
  return (
    <section id="search-section">
      <h3>
        Not what you're looking for? <Link to={"#"}>Click here</Link> to view
        more properties.
      </h3>
      <button>Search</button>
    </section>
  );
}
