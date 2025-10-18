module Mutations
  class CreateProject < BaseMutation
    description "Create a new project"

    argument :name, String, required: true
    argument :description, String, required: true
    argument :contact_email, String, required: true
    argument :status, String, required: true

    field :project, Types::ProjectType, null: true
    field :errors, [ String ], null: false

    def resolve(name:, description:, contact_email:, status:)
      project = Project.new(
        name: input[:name],
        description: input[:description],
        contact_email: input[:contact_email],
        status: input[:status]
      )

      if project.save
        { project: project, errors: [] }
      else
        { project: nil, errors: project.errors.full_messages }
      end
    end
  end
end
