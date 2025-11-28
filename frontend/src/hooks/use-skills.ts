import { gql, type TypedDocumentNode } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

// Type definitions for GraphQL operations
type GetSkillsQuery = {
  __type: {
    name: string
    enumValues: {
      name: string
      description: string | null
    }[]
  } | null
}

// GraphQL Operations - Define outside hooks for reusability with TypedDocumentNode
const GET_SKILLS_QUERY: TypedDocumentNode<GetSkillsQuery> = gql`
  query GetSkills {
    __type(name: "Skill") {
      name
      enumValues {
        name
        description
      }
    }
  }
`

// Custom hooks - Use the operations defined above
export function useGetSkills() {
  const { data, loading, error } = useQuery(GET_SKILLS_QUERY)

  // Transform the introspection data into a more usable format
  const skills =
    data?.__type?.enumValues?.map(
      (enumValue: { name: string; description: string | null }) => ({
        value: enumValue.name,
        label: enumValue.description || enumValue.name,
      })
    ) || []

  return {
    skills,
    loading,
    error,
  }
}
