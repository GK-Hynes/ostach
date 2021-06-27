import { sanityClient } from "../../sanity";
import { isMultiple } from "../../utils";
import Image from "../../components/image";

export default function Property({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews
}) {
  const reviewAmount = reviews.length;
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />
        <div className="sub-images-section">
          {images.map((_key, image) => (
            <Image key={_key} identifier="image" image={image} />
          ))}
        </div>
      </div>
      <h2>{propertyType}</h2>
      <h3>
        {bedrooms} bedroom{isMultiple(bedrooms)} - {beds} bed{isMultiple(beds)}
      </h3>
      <hr />
      <h4>Enhanced Clean</h4>
      <p>This host is committed to our 5-step enhanced cleaning process.</p>
      <h4>Amenities for everyday living</h4>
      <p>
        This host has equipped this property for long stays - kitchen, shampoo,
        hairdryer included.
      </p>
      <h4>House Rules</h4>
      <p>
        This property isn't suitable for pets and the host does not allow
        parties or smoking.
      </p>

      <div className="price-box">
        <h2>€{pricePerNight}</h2>
        <h3>
          {reviewAmount} review{isMultiple(reviewAmount)}
        </h3>
        <button className="button" onClick={() => {}}>
          Change Dates
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(pageContext) {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id, 
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews
      }
    };
  }
}
