import { gql } from "graphql-request";

const PanelsQuery = gql`
  query getContent {
    panelPages {
      title
      text {
        html
      }
      panels {
        title
        role
        period
        text {
          html
        }
      }
    }
  }
`;

export default PanelsQuery;
