import Link from "next/link";
import { sanityClient } from "../../sanity";
import { isMultiple } from "../../utils";
import Image from "../../components/image";
import Review from "../../components/review";
import Map from "../../components/map";

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
      <h2>{title}</h2>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />
        <div className="sub-images-section">
          {images.map((image) => (
            <Image
              key={image._key}
              identifier="image"
              image={image}
              className="sub-image"
            />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="information">
          <h2>
            {propertyType} hosted by {host?.name}
          </h2>
          <h3>
            {bedrooms} bedroom{isMultiple(bedrooms)} - {beds} bed
            {isMultiple(beds)}
          </h3>
          <hr />
          <h4>Enhanced Clean</h4>
          <p>This host is committed to our 5-step enhanced cleaning process.</p>
          <h4>Amenities for everyday living</h4>
          <p>
            This host has equipped this property for long stays - kitchen,
            shampoo, hairdryer included.
          </p>
          <h4>House Rules</h4>
          <p>
            This property isn't suitable for pets and the host does not allow
            parties or smoking.
          </p>
        </div>
        <div className="price-box">
          <h2>€{pricePerNight}</h2>
          <h3>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </h3>
          <Link href="/">
            <button className="button">Change Dates</button>
          </Link>
        </div>
      </div>
      <hr />
      <h4>{description}</h4>
      <hr />
      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>
      {reviewAmount > 0 &&
        reviews.map((review) => <Review key={review._key} review={review} />)}
      <hr />
      <h2>Location</h2>
      <Map location={location} />
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

  const {
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
  } = property;

  if (!property) {
    return {
      props: null,
      notFound: true
    };
  } else {
    return {
      props: {
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
      }
    };
  }
}
