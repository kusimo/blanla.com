// @flow
import { graphql } from 'gatsby';
import * as React from 'react';

import Author from '../Author';
import Content from '../Content';
import Discuss from '../Discuss';
import Share from '../Share';
import Comments from './Comments';
import styles from './Post.module.scss';
import ReadMore from './ReadMore';
import Tags from './Tags';

type PostType = {
  +fields: Object,
  +frontmatter: {
    +description: string,
    +discussLinkTwitter?: string,
    +discussLinkHN?: string,
    +discussLinkReddit?: string,
    +guestAuthor?: ?string,
    +guestCoAuthor?: ?boolean,
    +guestAuthorLink?: ?string,
    +img: string,
    +isML: boolean,
    +isWeb: boolean,
    +slug: string,
    +tags?: string,
    +title: string,
  },
  +htmlAst: Object,
};

type Props = {|
  +post: PostType,
  +prevPost?: PostType,
  +nextPost?: PostType,
  +contentFooter?: React.Node,
  +hideDescription?: boolean,
|};

const Post = ({ post, prevPost, nextPost, headings, contentFooter, hideDescription }: Props) => {
  const {
    tags,
    title,
    img,
    featuredImage,
    description,
    isML,
    isWeb,
    slug,
    discussLinkTwitter,
    discussLinkHN,
    discussLinkReddit,
    guestAuthor,
    guestCoAuthor,
    guestAuthorLink,
  } = post.frontmatter;
  const { dateFormatted, dateModifiedFormatted } = post.fields;

  const { htmlAst } = post;

  return (
    <div className={styles['post']}>
      <Content
        htmlAst={htmlAst}
        title={title}
        img={img}
        slug={slug}
        postNav={headings}
        featuredImage={featuredImage}
        subtitle={hideDescription ? null : description}
        dateFormatted={dateFormatted}
        dateModifiedFormatted={dateModifiedFormatted}
        footer={contentFooter}
        guestAuthor={guestAuthor}
        guestCoAuthor={guestCoAuthor}
        guestAuthorLink={guestAuthorLink}
      />
        {featuredImage !== null
        ? <div className={styles['post__viewSource']}>
        <p>
          <>
            Photo from{' '}
            <a
              href="https://github.com/kusimo/blanla.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source on Github
            </a>
            .
          </>
        </p>
      </div>
        : ''
        }

      <div className={styles['post__footer']}>
        {tags && <Tags tags={tags} tagSlugs={post.fields.tagSlugs} />}
        <div className={styles['post__authorContainer']}>
          <Author showBio showTwitter />
        </div>
        {prevPost && nextPost && <ReadMore prevPost={prevPost} nextPost={nextPost} />}
        <Share url={slug} title={title} />
        <Discuss twitter={discussLinkTwitter} hn={discussLinkHN} reddit={discussLinkReddit} />
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment PostFragment on MarkdownRemark {
    ...ContentFragment
    ...ReadMoreFragment
    frontmatter {
      ...DiscussFragment
      ...SubscribeFormFragment
    }
  }
`;

export default Post;
