import { gql } from "graphql-request";

const ContentQuery = gql`
  query getContent {
    contentArray {
      title
      text {
        html
      }
      panels {
        title
        location
        role
        period
        text {
          html
        }
      }
    }
  }
`;

export default ContentQuery;
