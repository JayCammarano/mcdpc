/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { GatsbyConfig } from 'gatsby';
import {
  siteMetadata,
  manifestOptions,
  googleAnalytics,
  pathPrefix,
  googleFonts,
} from './config/SiteConfig';

const config: GatsbyConfig = {
  siteMetadata,
  pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: 'src/types/gatsby-types.d.ts',
        emitSchema: {
          'src/__generated__/gatsby-introspection.json': true,
          'src/__generated__/gatsby-schema.graphql': true,
        },
        emitPluginDocuments: {
          'src/__generated__/gatsby-plugin-documents.graphql': true,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images/`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: googleAnalytics,
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [require('tailwindcss')()],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-fonts-v2',
      options: {
        fonts: googleFonts,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.YOUR_AIRTABLE_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: process.env.YOUR_AIRTABLE_BASE_ID,
            tableName: process.env.YOUR_TABLE_NAME,
            // can leave off queryName, mapping or tableLinks if not needed
          },
        ],
      },
    },
  ],
};

export default config;
