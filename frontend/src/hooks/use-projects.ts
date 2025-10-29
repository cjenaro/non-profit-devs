import { gql, type TypedDocumentNode } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import type {
  AddUserToProjectMutation,
  AddUserToProjectMutationVariables,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from '../generated/graphql'

// GraphQL Operations - Define outside hooks for reusability with TypedDocumentNode
const GET_PROJECTS_QUERY: TypedDocumentNode<
  GetProjectsQuery,
  GetProjectsQueryVariables
> = gql`
  query GetProjects {
    projects {
      id
      name
      description
      contactEmail
      createdAt
      updatedAt
      slug
      status
      users {
        id
        name
        email
      }
    }
  }
`

const GET_PROJECT_QUERY: TypedDocumentNode<
  GetProjectQuery,
  GetProjectQueryVariables
> = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      contactEmail
      createdAt
      updatedAt
      slug
      status
      users {
        id
        name
        email
      }
    }
  }
`

const CREATE_PROJECT_MUTATION: TypedDocumentNode<
  CreateProjectMutation,
  CreateProjectMutationVariables
> = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        name
        description
        status
        slug
      }
    }
  }
`

const ADD_USER_TO_PROJECT_MUTATION: TypedDocumentNode<
  AddUserToProjectMutation,
  AddUserToProjectMutationVariables
> = gql`
  mutation AddUserToProject($input: AddUserToProjectInput!) {
    addUserToProject(input: $input) {
      project {
        id
        name
        description
        contactEmail
        users {
          id
          name
          email
        }
      }
    }
  }
`

// Custom hooks - Use the operations defined above
export default function useProjects() {
  return useQuery(GET_PROJECTS_QUERY)
}

export function useGetProject(id: string) {
  return useQuery(GET_PROJECT_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  })
}

export function useCreateProject() {
  return useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CREATE_PROJECT_MUTATION
  )
}

export function useAddUserToProject() {
  return useMutation(ADD_USER_TO_PROJECT_MUTATION)
}
