import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { Layout } from '../components/Layout';

interface IHomepageProps {
  location: Location;
  data: GatsbyTypes.HomepageQueryQuery;
}

const HomePage: React.FC<IHomepageProps> = ({ location, data }) => (
  <Layout location={location}>
    <section className="text-gray-700 body-font">
      <div className="container flex flex-col items-center px-4 py-6 mx-auto sm:py-12 md:py-24 md:flex-row">
        <div className="flex flex-col items-center mb-12 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Meet substance use with compassion not fear.
          </h1>
          <p className="mb-8 leading-relaxed">
            Historically, we have met drug use with fear and aggression. We know
            these methods do not stop drug use, they only penalize it, and the
            most vulnerable among us pay the price. It's time to embrace an
            attitude of compassion and decriminalize all drugs in the state of
            Massachusetts.
          </p>
          <div className="flex justify-center">
            <a href="/learnmore">
              <button
                className="inline-flex px-6 py-2 text-lg border-0 rounded text-gold bg-darkBlue-500 focus:outline-none hover:bg-darkBlue-600"
                type="button"
              >
                Learn More
              </button>
            </a>
            <button
              className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300"
              type="button"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <Img
            fluid={data.headerImage.childImageSharp.fluid}
            alt="Abstract image by Gradienta on Unsplash"
            className="object-cover object-center w-full h-full rounded shadow"
          />
        </div>
      </div>
    </section>
  </Layout>
);

export const query = graphql`
  query HomepageQuery {
    site {
      siteMetadata {
        buildContext
        version
      }
    }
    siteBuildMetadata {
      buildTime
    }
    headerImage: file(
      relativePath: { eq: "placeholder-images/unsplash-gradienta.png" }
    ) {
      childImageSharp {
        fluid(quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default HomePage;
