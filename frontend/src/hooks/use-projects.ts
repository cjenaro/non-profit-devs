import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

// Type definitions for GraphQL operations
type GetProjectsQuery = {
  projects: {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    status: string;
    users: {
      id: string;
      name: string;
      email: string;
    }[];
  }[];
};

type GetProjectsQueryVariables = {};

type GetProjectQuery = {
  project: {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    status: string;
    users: {
      id: string;
      name: string;
      email: string;
    }[];
  } | null;
};

type GetProjectQueryVariables = {
  id: string;
};

type CreateProjectMutation = {
  createProject: {
    project: {
      name: string;
      description: string;
      status: string;
      slug: string;
    };
  } | null;
};

type CreateProjectMutationVariables = {
  name: string;
  description: string;
  contactEmail: string;
  status: string;
};

type AddUserToProjectMutation = {
  addUserToProject: {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
    users: {
      id: string;
      name: string;
      email: string;
    }[];
  } | null;
};

type AddUserToProjectMutationVariables = {
  id: string;
  userId: string;
};

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
`;

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
`;

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
`;

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
`;

// Custom hooks - Use the operations defined above
export default function useProjects() {
  return useQuery(GET_PROJECTS_QUERY);
}

export function useGetProject(id: string) {
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
