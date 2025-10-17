const gql = (...a) => String.toString(a);
function useQuery() {}

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
