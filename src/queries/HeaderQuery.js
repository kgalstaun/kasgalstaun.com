import { gql } from "graphql-request";

const HeaderQuery = gql`
  query getHeader($id: String!) {
    header(where: { idPersonal: $id }) {
      text
    }
  }
`;

export default HeaderQuery;
