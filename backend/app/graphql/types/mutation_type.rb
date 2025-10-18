# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :add_project_to_user, mutation: Mutations::AddProjectToUser
    field :add_user_to_project, mutation: Mutations::AddUserToProject
    field :create_project, mutation: Mutations::CreateProject
    field :change_password, mutation: Mutations::ChangePassword
    field :update_user, mutation: Mutations::UpdateUser
    field :login, mutation: Mutations::Login
    field :signup, mutation: Mutations::Signup
  end
end
