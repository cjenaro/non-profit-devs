import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

// GraphQL Operations - Define outside hooks for reusability
const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        id
        name
        email
        skills
      }
      errors
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token {
        token
      }
      user {
        id
        email
        name
        projects {
          id
          name
          description
          contactEmail
          status
          createdAt
        }
        skills
      }
      errors
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $skills: [SkillType]
  ) {
    updateUser(id: $id, name: $name, email: $email, skills: $skills) {
      id
      name
      email
      skills
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword(
    $id: ID!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
    }
  }
`;

const ADD_PROJECT_TO_USER_MUTATION = gql`
  mutation AddProjectToUser($id: ID!, $projectId: ID!) {
    addProjectToUser(id: $id, projectId: $projectId) {
      id
      name
      email
      projects {
        id
        name
        description
        contactEmail
      }
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      skills
      createdAt
      updatedAt
      projects {
        id
        name
        description
        contactEmail
        createdAt
      }
    }
  }
`;

const GET_USER_PROJECTS_QUERY = gql`
  query GetUserProjects($id: ID!) {
    user(id: $id) {
      projects {
        id
        name
        description
        contactEmail
      }
    }
  }
`;

// Custom hooks - Use the operations defined above
export function useSignup() {
  return useMutation(SIGNUP_MUTATION);
}

export function useLogin(options) {
  return useMutation(LOGIN_MUTATION, options);
}

export function useUpdateUser() {
  return useMutation(UPDATE_USER_MUTATION);
}

export function useChangePassword() {
  return useMutation(CHANGE_PASSWORD_MUTATION);
}

export function useAddProjectToUser() {
  return useMutation(ADD_PROJECT_TO_USER_MUTATION);
}

export function useGetUser(id) {
  return useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });
}

export function useGetUserProjects(id) {
  return useQuery(GET_USER_PROJECTS_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });
}
