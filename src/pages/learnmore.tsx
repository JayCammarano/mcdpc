import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../components/Layout';

interface ILearnMore {
  location: Location;
  data: GatsbyTypes.AllInterviewsQueryQuery;
}
const learnMore: React.FC<ILearnMore> = ({ location, data }) => {
  const featuredInterviews = data.allAirtable.nodes.map((node) => {
    if (node.data.Featured) {
      return (
        <div key={node.data.Title}>
          <Link to={`/interviews/${node.data.slug}`}>
            <img
              className="w-40 m-4"
              alt={node.data.Title}
              src={node.data.Headshot[0].thumbnails.full.url}
            />
          </Link>
        </div>
      );
    }
    return null;
  });
  const moreInterviews = data.allAirtable.nodes.map((node) => {
    if (!node.data.Featured) {
      return (
        <div key={node.data.Title}>
          <Link to={`/interviews/${node.data.slug}`}>
            <img
              className="w-40 m-4"
              alt={node.data.Title}
              src={node.data.Headshot[0].thumbnails.full.url}
            />
          </Link>
        </div>
      );
    }
    return null;
  });
  return (
    <Layout location={location}>
      <div className="container items-center px-4 py-6 mx-auto sm:py-12 md:py-24 md:flex-row">
        <div className="ml-8">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Hear Stories From The Community
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-row">{featuredInterviews}</div>
            <div className="flex flex-row">{moreInterviews}</div>
          </div>
          <button
            className="inline-flex px-6 py-2 text-lg border-0 rounded text-gold bg-darkBlue-500 focus:outline-none hover:bg-darkBlue-600"
            type="button"
          >
            View More
          </button>
        </div>
        <div className="ml-8">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Get the Facts on Decriminalization
          </h1>
        </div>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query AllInterviewsQuery {
    allAirtable(
      filter: { data: { Status: { eq: "Published" } } }
      sort: { fields: data___Featured, order: ASC }
    ) {
      nodes {
        data {
          Title
          Featured
          Headshot {
            thumbnails {
              full {
                url
              }
            }
          }
          slug
        }
      }
    }
  }
`;

export default learnMore;
