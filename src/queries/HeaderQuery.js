import { gql } from "graphql-request";

const HeaderQuery = gql`
  query getHeader($id: ID!) {
    header(where: { id: $id }) {
      text
    }
  }
`;

export default HeaderQuery;
