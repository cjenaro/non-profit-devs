import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

// GraphQL Operations - Define outside hooks for reusability
const GET_PROJECTS_QUERY = gql`
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
`;

const GET_PROJECT_QUERY = gql`
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
`;

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject(
    $name: String!
    $description: String!
    $contactEmail: String!
    $status: String!
  ) {
    createProject(
      name: $name
      description: $description
      contactEmail: $contactEmail
      status: $status
    ) {
      id
      name
      description
      status
      slug
    }
  }
`;

const ADD_USER_TO_PROJECT_MUTATION = gql`
  mutation AddUserToProject($id: ID!, $userId: ID!) {
    addUserToProject(id: $id, userId: $userId) {
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
`;

// Custom hooks - Use the operations defined above
export default function useProjects() {
  return useQuery(GET_PROJECTS_QUERY);
}

export function useGetProject(id) {
  return useQuery(GET_PROJECT_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });
}

export function useCreateProject() {
  return useMutation(CREATE_PROJECT_MUTATION);
}

export function useAddUserToProject() {
  return useMutation(ADD_USER_TO_PROJECT_MUTATION);
}
