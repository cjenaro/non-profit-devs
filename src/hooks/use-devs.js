import { useQuery } from "@apollo/react-hooks";
import useMutation from "./use-mutation";
import gql from "graphql-tag";

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
        token
      }
    }
  `);
}

export function useLogin() {
  return useMutation(gql`
    mutation LOGIN($input: LoginInput!) {
      login(input: $input) {
        token
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
          }
        }
      }
    `,
    { variables: { id } }
  );
}
