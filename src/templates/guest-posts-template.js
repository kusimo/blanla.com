// @flow
import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import TemplateWrapper from '../components/TemplateWrapper';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import MovableSidebarContent from '../components/MovableSidebarContent';

type Props = {|
  +data: Object,
  +pageContext: Object,
|};

const GuestPostsTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = `Guest Posts - ${siteTitle}`;

  return (
    <TemplateWrapper>
      <Layout title={pageTitle} description={siteSubtitle}>
        <Sidebar />
        <Page
          title="More Posts"
          description={
            <>
              <p style={{ marginBottom: 0 }}>
                While posts in my <Link to="/">Blog</Link> section are all written by me, posts in
                this section were written by either:
              </p>
              <ul style={{ marginBottom: 0 }}>
                <li>
                  <b>Co-Authors</b>, who helped me write the post, or
                </li>
                <li>
                  <b>Guest Authors</b>, who wrote the post independently.
                </li>
              </ul>
              <p>
                I still <b>personally review and edit every guest post I publish</b>, meaning I
                believe these are all quality articles! If you're interested in guesting posting or
                co-authoring a post with me, feel free to{' '}
                <Link to="/about/#contact-me">get in touch</Link>.
              </p>
            </>
          }
        >
          <Feed edges={edges} />
        </Page>
      </Layout>
      <MovableSidebarContent mobile />
    </TemplateWrapper>
  );
};

export const query = graphql`
  query GuestPostsTemplate {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { ne: true }, guestAuthor: { ne: null } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
            dateFormatted
          }
          frontmatter {
            guestAuthor
            guestCoAuthor
            guestAuthorLink
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default GuestPostsTemplate;