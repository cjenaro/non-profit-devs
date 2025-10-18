module Mutations
  class AddUserToProject < BaseMutation
    description "Add a user to a project"

    argument :id, ID, required: true
    argument :user_id, ID, required: true

    field :project, Types::ProjectType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, user_id:)
      project = Project.find(id)
      user = User.find(user_id)

      project.users << user unless project.users.include?(user)

      if project.save
        { project: project, errors: [] }
      else
        { project: nil, errors: project.errors.full_messages }
      end
    end
  end
end
