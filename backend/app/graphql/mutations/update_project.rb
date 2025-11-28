module Mutations
  class UpdateProject < BaseMutation
    include Authentication

    description "Update a project"

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :contact_email, String, required: false
    argument :status, String, required: false

    field :project, Types::ProjectType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, name: nil, description: nil, contact_email: nil, status: nil)
      authenticate_user!

      project = Project.find(id)

      # Only allow updating if user is part of the project or is admin (for now, allow if user is in project)
      unless project.users.include?(context[:current_user])
        return { project: nil, errors: [ "You don't have permission to update this project" ] }
      end

      update_params = {}
      update_params[:name] = name if name.present?
      update_params[:description] = description if description.present?
      update_params[:contact_email] = contact_email if contact_email.present?
      update_params[:status] = status if status.present?

      if project.update(update_params)
        { project: project, errors: [] }
      else
        { project: nil, errors: project.errors.full_messages }
      end
    end
  end
end
