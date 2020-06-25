import { useQuery } from '@apollo/react-hooks';
import useMutation from './use-mutation';
import gql from 'graphql-tag';

export function useAddProjectToUser() {
  return useMutation(
    gql`
      mutation ADD_PROJECT_TO_USER($id: ID!, $input: AddProjectInput!) {
        addProjectToUser(id: $id, input: $input) {
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
    `
  );
}

export function useSignup() {
  return useMutation(gql`
    mutation SIGNUP($input: SignupInput!) {
      signup(input: $input) {
        name
        id
        email
        skills
      }
    }
  `);
}

export function useUpdateUser() {
  return useMutation(gql`
    mutation UPDATE_USER($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        name
        email
        skills
      }
    }
  `);
}

export function useChangePassword() {
  return useMutation(gql`
    mutation CHANGE_PASSWORD($id: ID!, $input: ChangePasswordInput!) {
      changePassword(id: $id, input: $input) {
        id
      }
    }
  `);
}

export function useLogin() {
  return useMutation(gql`
    mutation LOGIN($input: LoginInput!) {
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
      }
    }
  `);
}

export function useGetUser(id) {
  return useQuery(
    gql`
      query USER($id: ID!) {
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
    `,
    { variables: { id } }
  );
}

export function useGetUserProjects(id) {
  return useQuery(
    gql`
      query USER($id: ID!) {
        user(id: $id) {
          projects {
            id
            name
            description
            contactEmail
          }
        }
      }
    `,
    { variables: { id } }
  );
}
