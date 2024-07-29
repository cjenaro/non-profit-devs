import { useQuery } from '@apollo/react-hooks';
const gql = (...a) => String.toString(a)

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
