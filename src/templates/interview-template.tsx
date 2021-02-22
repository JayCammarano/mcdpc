import React from 'react';
import { graphql } from 'gatsby';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import { SoundcloudEmbed } from '../components/Soundcloud';

interface IInterviewTemplate {
  data: GatsbyTypes.BlogPostByPathQuery;
}

const interviewtemplate: React.FC<IInterviewTemplate> = ({ data }) => {
  let sc;
  if (data.airtable.data.Soundcloud_Link) {
    sc = <SoundcloudEmbed url={data.airtable.data.Soundcloud_Link} />;
  }
  return (
    <section className="text-gray-700 body-font">
      <div className="container flex flex-col items-center px-4 py-6 mx-auto sm:py-12 md:py-24 md:flex-row">
        <div className="flex flex-col items-center mb-12 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            {data.airtable.data.Title}
          </h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: unified()
                .use(markdown)
                .use(html)
                .processSync(data.airtable.data.Body)
                .toString(),
            }}
          />
        </div>
        <div className="w-1/8 lg:w-1/8 md:w-1/8">
          <img
            alt={data.airtable.data.Title}
            src={data.airtable.data.Headshot[0].thumbnails.large.url}
            className="object-cover object-center w-4/5 mb-4 rounded shadow"
          />
          {sc}
        </div>
      </div>
    </section>
  );
};

export const query = graphql`
  query BlogPostByPath($slug: String!) {
    airtable(data: { slug: { eq: $slug } }) {
      data {
        Title
        Body
        Headshot {
          thumbnails {
            large {
              url
            }
          }
        }

        slug
        Soundcloud_Link
      }
    }
  }
`;

export default interviewtemplate;
