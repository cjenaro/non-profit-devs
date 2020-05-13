import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const PROJECTS_QUERY = gql`
  query ALL_PROJECTS {
    projects {
      id
      name
      description
      contactEmail
      createdAt
      updatedAt
      users {
        name
        email
        id
      }
    }
  }
`;

export default function useProjects() {
  return useQuery(PROJECTS_QUERY);
}

export function useAddUserToProject() {
  return useMutation(
    gql`
      mutation ADD_USER_TO_PROJECT($id: ID!, $input: AddUserInput!) {
        addUserToProject(id: $id, input: $input) {
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
    `
  );
}

export function useCreateProject() {
  return useMutation(gql`
    mutation CREATE_PROJECT($input: CreateProjectInput!) {
      createProject(input: $input) {
        id
        name
        description
      }
    }
  `);
}
