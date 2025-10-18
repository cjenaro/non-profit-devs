import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

// Type definitions for GraphQL operations
type SignupMutation = {
  signup: {
    user: {
      id: string;
      name: string;
      email: string;
      skills: string[];
    } | null;
    errors: string[];
  };
};

type SignupMutationVariables = {
  input: {
    name: string;
    email: string;
    password: string;
    skills: string[];
  };
};

type LoginMutation = {
  login: {
    token: {
      token: string;
    } | null;
    user: {
      id: string;
      email: string;
      name: string;
      projects: {
        id: string;
        name: string;
        description: string;
        contactEmail: string;
        status: string;
        createdAt: string;
      }[];
      skills: string[];
    } | null;
    errors: string[];
  };
};

type LoginMutationVariables = {
  input: {
    email: string;
    password: string;
  };
};

type UpdateUserMutation = {
  updateUser: {
    id: string;
    name: string;
    email: string;
    skills: string[];
  } | null;
};

type UpdateUserMutationVariables = {
  id: string;
  name?: string;
  email?: string;
  skills?: string[];
};

type ChangePasswordMutation = {
  changePassword: {
    id: string;
  } | null;
};

type ChangePasswordMutationVariables = {
  id: string;
  currentPassword: string;
  newPassword: string;
};

type AddProjectToUserMutation = {
  addProjectToUser: {
    id: string;
    name: string;
    email: string;
    projects: {
      id: string;
      name: string;
      description: string;
      contactEmail: string;
    }[];
  } | null;
};

type AddProjectToUserMutationVariables = {
  id: string;
  projectId: string;
};

type GetUserQuery = {
  user: {
    id: string;
    name: string;
    email: string;
    skills: string[];
    createdAt: string;
    updatedAt: string;
    projects: {
      id: string;
      name: string;
      description: string;
      contactEmail: string;
      createdAt: string;
    }[];
  } | null;
};

type GetUserQueryVariables = {
  id: string;
};

type GetUserProjectsQuery = {
  user: {
    projects: {
      id: string;
      name: string;
      description: string;
      contactEmail: string;
    }[];
  } | null;
};

type GetUserProjectsQueryVariables = {
  id: string;
};

// GraphQL Operations - Define outside hooks for reusability with TypedDocumentNode
const SIGNUP_MUTATION: TypedDocumentNode<
  SignupMutation,
  SignupMutationVariables
> = gql`
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

const LOGIN_MUTATION: TypedDocumentNode<
  LoginMutation,
  LoginMutationVariables
> = gql`
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

const UPDATE_USER_MUTATION: TypedDocumentNode<
  UpdateUserMutation,
  UpdateUserMutationVariables
> = gql`
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

const CHANGE_PASSWORD_MUTATION: TypedDocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
> = gql`
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

const ADD_PROJECT_TO_USER_MUTATION: TypedDocumentNode<
  AddProjectToUserMutation,
  AddProjectToUserMutationVariables
> = gql`
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

const GET_USER_QUERY: TypedDocumentNode<
  GetUserQuery,
  GetUserQueryVariables
> = gql`
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

const GET_USER_PROJECTS_QUERY: TypedDocumentNode<
  GetUserProjectsQuery,
  GetUserProjectsQueryVariables
> = gql`
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

export function useLogin(options?: any) {
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

export function useGetUser(id: string) {
  return useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });
}

export function useGetUserProjects(id: string) {
  return useQuery(GET_USER_PROJECTS_QUERY, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });
}
