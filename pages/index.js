import { sanityClient } from "../sanity";

export default function Home({ properties }) {
  return <h1>Óstach</h1>;
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
