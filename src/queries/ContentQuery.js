import { gql } from "graphql-request";

const ContentQuery = gql`
  query getContent {
    contentArray {
      title
      panels {
        title
        text {
          html
        }
        image {
          url(
            transformation: {
              validateOptions: false
              image: { resize: { height: 150, width: 150 } }
            }
          )
        }
      }
      introduction {
        html
      }
    }
  }
`;

export default ContentQuery;
