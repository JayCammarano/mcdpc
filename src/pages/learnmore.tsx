import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../components/Layout';

interface ILearnMore {
  location: Location;
  data: GatsbyTypes.AllInterviewsQueryQuery;
}
const learnMore: React.FC<ILearnMore> = ({ location, data }) => {
  const interviews = data.allAirtable.edges.map((node) => {
    const sluggifiedTitle = node.node.data.Title.toLowerCase().replace(
      /[^a-zA-Z0-9-_]/g,
      '-',
    );
    return (
      <div key={sluggifiedTitle}>
        <Link to={`/interviews/${sluggifiedTitle}`}>
          <img
            className="w-40 m-4"
            alt={node.node.data.Title}
            src={node.node.data.Headshot[0].url}
          />
        </Link>
      </div>
    );
  });
  return (
    <Layout location={location}>
      <div className="container items-center px-4 py-6 mx-auto sm:py-12 md:py-24 md:flex-row">
        <div className="ml-8">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Hear Stories From The Community
          </h1>
          <div className="flex flex-row">{interviews}</div>
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
      sort: { fields: data___ID, order: DESC }
    ) {
      edges {
        node {
          data {
            ID
            Headshot {
              url
            }
            Title
          }
        }
      }
    }
  }
`;

export default learnMore;
