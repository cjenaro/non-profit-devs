import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export function useGetUser(id) {
  return useQuery(
    gql`
      query USER_QUERY($id: String!) {
        users_by_pk(id: $id) {
          email
          name
          skills
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
