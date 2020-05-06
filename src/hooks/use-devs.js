import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export function useGetUser(id) {
  return useQuery(
    gql`
      query USER_QUERY($id: String!) {
        users_by_pk(id: $id) {
          email
          name
          userskills {
            userSkills {
              skill
            }
          }
          userProjects {
            userProjects {
              description
              contact
              id
              name
              slug
              projectstatuses {
                statusProject {
                  status
                }
              }
            }
          }
        }
      }
    `,
    { variables: { id } }
  );
}

export function useAddSkillToUser() {
  return useMutation(
    gql`
      mutation ADD_SKILL_TO_USER($dev: String!, $skill: uuid!) {
        insert_userskills(objects: { dev: $dev, skill: $skill }) {
          returning {
            dev
            skill
          }
        }
      }
    `
  );
}

export function useUpdateUser() {
  return useMutation(gql`
    mutation UPDATE_USER($id: String!, $email: String!, $name: String!) {
      update_users(
        where: { id: { _eq: $id } }
        _set: { email: $email, name: $name }
      ) {
        returning {
          email
          name
          id
        }
      }
    }
  `);
}
