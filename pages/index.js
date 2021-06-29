import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../utils";

export default function Home({ properties }) {
  return (
    <>
      <main className="main">
        <div className="feed-container">
          <h2 className="heading-main">Places to stay near you</h2>
          <div className="feed">
            {properties.map((property) => (
              <Link
                key={property._id}
                href={`property/${property.slug.current}`}
              >
                <div className="card">
                  <div className="card-top">
                    <img src={urlFor(property.mainImage)} alt={property.name} />
                  </div>
                  <div className="card-body">
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <p>€{property.pricePerNight} per night</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="map"></div>
        </div>
      </main>
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
