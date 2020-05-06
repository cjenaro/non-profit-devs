import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export function useGetSkills() {
  return useQuery(gql`
    query SKILLS_QUERY {
      skills {
        id
        skill
      }
    }
  `);
}
