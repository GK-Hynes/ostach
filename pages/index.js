import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../utils";

export default function Home({ properties }) {
  return (
    <>
      <h1>Óstach</h1>
      <div className="main">
        <div className="feed-container">
          <h2>Places to stay near you</h2>
          <div className="feed">
            {properties.map((property) => (
              <Link href={`property/${property.slug.current}`}>
                <div key={property._id} className="card">
                  <img src={urlFor(property.mainImage)} alt={property.name} />
                  <p>
                    {property.reviews.length} review
                    {isMultiple(property.reviews.length)}
                  </p>
                  <h3>{property.title}</h3>
                  <p>€{property.pricePerNight} per night</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="map"></div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "property"]`;
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: []
      }
    };
  } else {
    return {
      props: {
        properties
      }
    };
  }
}
