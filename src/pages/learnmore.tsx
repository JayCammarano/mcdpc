import React from 'react';
import { Layout } from '../components/Layout';

interface ILearnMore {
  location: Location;
}
const learnMore: React.FC<ILearnMore> = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="container flex flex-row items-center px-4 py-6 mx-auto sm:py-12 md:py-24 md:flex-row">
        <div>
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Hear Stories From The Community
          </h1>
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Get the Facts on Decriminalization
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default learnMore;
