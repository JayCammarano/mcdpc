import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import slash from 'slash';

// export const createPages: GatsbyNode['createPages'] = async ({
//   graphql,
//   actions,
//   reporter,
// }) => {
//   const { createPage } = actions;

//   const { data, errors } = await graphql<any>(
//     `
//       {
//         allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
//           edges {
//             node {
//               id
//               name: sourceInstanceName
//               path: absolutePath
//               remark: childMarkdownRemark {
//                 id
//                 frontmatter {
//                   layout
//                   path
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   );
//   if (errors) {
//     console.log(errors);
//     reporter.error(errors);
//   }

//   // Create blog posts & pages.
//   const items = data.allFile.edges;
//   const posts: any[] = items.filter(({ node }) => /posts/.test(node.name));
//   posts.forEach(({ node }) => {
//     if (!node.remark) return;
//     const { path: pagePath } = node.remark.frontmatter;
//     createPage({
//       path: pagePath,
//       component: null,
//       context: null,
//     });
//   });

//   const pages: any[] = items.filter(({ node }) => /page/.test(node.name));
//   pages.forEach(({ node }) => {
//     if (!node.remark) return;
//     const { path: pagePath } = node.remark.frontmatter;
//     createPage({
//       path: pagePath,
//       component: null,
//       context: null,
//     });
//   });
// };

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve('src'), 'node_modules'],
    },
  });

  // No sourcemaps in production
  if (stage === `build-javascript`) {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(
      'src/templates/interview-template.tsx',
    );
    resolve(
      graphql(
        `
          {
            allAirtable {
              edges {
                node {
                  data {
                    slug
                  }
                }
              }
            }
          }
        `,
      ).then((result) => {
        if (result.error) {
          reject(result.error);
        }
        result.data.allAirtable.edges.forEach((edge) => {
          createPage({
            path: `interviews/${edge.node.data.slug}`,
            component: slash(blogPostTemplate),
            context: {
              slug: edge.node.data.slug,
            },
          });
        });
      }),
    );
  });
};
