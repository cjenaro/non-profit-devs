# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # Field: user(id: ID!)
    field :user, Types::UserType, null: true do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    # Field: users
    field :users, [Types::UserType], null: false do
      description "List all users"
    end

    def users
      User.all
    end

    # Field: project(id: ID!)
    field :project, Types::ProjectType, null: true do
      description "Find a project by ID"
      argument :id, ID, required: true
    end

    def project(id:)
      Project.find(id)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    # Field: projects
    field :projects, [Types::ProjectType], null: false do
      description "List all projects"
    end

    def projects
      Project.all
    end
  end
end
