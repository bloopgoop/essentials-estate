import PreviewCard from "components/PreviewCard/PreviewCard";
import { Property } from "types/property";
import "./SimilarItemsSection.css";

export default function SimilarItems({ properties }: { properties: Property[] }) { 
  const firstFour = properties.slice(0, 4);

  if (!properties) return <h1>Loading...</h1>;

  return (
    <div id="similar-items-wrapper">
      <section id="similar-items-section">
        <h1>Similar Properties</h1>
        <ul>
          <div className="dir-btn dir-left">&lt;</div>
          <div className="dir-btn dir-right">&gt;</div>
          {firstFour.map((property, index) => (
            <li key={index}>
              <PreviewCard property={property} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
