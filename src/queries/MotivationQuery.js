import { gql } from "graphql-request";

const MotivationQuery = gql`
  query getMotivation() {
    motivations(first: 1) {
        letter,
        info { html }
    }
  }
`;

export default MotivationQuery;
