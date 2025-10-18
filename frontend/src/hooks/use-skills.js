import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// GraphQL Operations - Define outside hooks for reusability
const GET_SKILLS_QUERY = gql`
  query GetSkills {
    __type(name: "Skill") {
      name
      enumValues {
        name
        description
      }
    }
  }
`;

// Custom hooks - Use the operations defined above
export function useGetSkills() {
  const { data, loading, error } = useQuery(GET_SKILLS_QUERY);

  // Transform the introspection data into a more usable format
  const skills =
    data?.__type?.enumValues?.map((enumValue) => ({
      value: enumValue.name,
      label: enumValue.description || enumValue.name,
    })) || [];

  return {
    skills,
    loading,
    error,
  };
}
