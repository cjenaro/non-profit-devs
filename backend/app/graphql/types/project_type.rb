# frozen_string_literal: true

module Types
  class ProjectType < Types::BaseObject
    description "A nonprofit project"

    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :contact_email, String, null: false
    field :slug, String, null: false
    field :status, Types::ProjectStatusType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :users, [ Types::UserType ], null: false

    def users
      dataloader.with(Sources::AssociationLoader, Project, :users).load(object.id)
    end
  end
end
