import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export function useGetSkills() {
  return useQuery(gql`
    query SKILLS {
      __type(name: "Skill") {
        name
        enumValues {
          name
        }
      }
    }
  `);
}
