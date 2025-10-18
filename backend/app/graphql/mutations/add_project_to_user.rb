module Mutations
  class AddProjectToUser < BaseMutation
    description "Add a project to a user"

    argument :id, ID, required: true
    argument :project_id, ID, required: true

    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, project_id:)
      user = User.find(id)
      project = Project.find(project_id)

      user.projects << project unless user.projects.include?(project)

      if user.save
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
