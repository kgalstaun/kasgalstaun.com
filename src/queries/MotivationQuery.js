import { gql } from "graphql-request";

const MotivationQuery = gql`
  query getMotivation($id: String!) {
    motivations(where: { idPersonal: $id }) {
      title
      letter
      info {
        html
      }
    }
  }
`;

export default MotivationQuery;
