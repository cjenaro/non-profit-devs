import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const PROJECTS_QUERY = gql`
  query PROJECTS_QUERY {
    projects {
      id
      description
      contact
      name
      slug
      projectstatuses {
        statusProject {
          status
        }
      }
      projectusers {
        user {
          email
          id
          name
          userskills {
            userSkills {
              skill
            }
          }
        }
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
      mutation ADD_USER_TO_PROJECT($dev: String!, $project: uuid!) {
        insert_projectusers(objects: { dev: $dev, project: $project }) {
          returning {
            dev
            project
          }
        }
      }
    `
  );
}

export function useAddStatusToProject() {
  return useMutation(
    gql`
      mutation ADD_STATUS_TO_PROJECT($project: uuid!, $status: uuid!) {
        insert_projectstatus(objects: { project: $project, status: $status }) {
          returning {
            project
            status
          }
        }
      }
    `
  );
}

export function useCreateProject() {
  return useMutation(gql`
    mutation ADD_PROJECT(
      $contact: String!
      $description: String!
      $name: String!
      $slug: String!
    ) {
      insert_projects(
        objects: {
          contact: $contact
          description: $description
          name: $name
          slug: $slug
        }
      ) {
        returning {
          id
        }
      }
    }
  `);
}
