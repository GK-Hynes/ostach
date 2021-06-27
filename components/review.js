import { urlFor } from "../sanity";

export default function Review({ review }) {
  return (
    <div className="review-box">
      <h2>{review.rating}</h2>
      <h3>{review.traveller.name}</h3>
      <img
        className="review-image"
        src={urlFor(review.traveller.image)
          .width(100)
          .height(100)
          .crop("focalpoint")
          .auto("format")}
        alt={review.traveller}
      />
    </div>
  );
}
