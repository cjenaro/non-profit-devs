# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :skills, [ Types::SkillType ], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :projects, [ Types::ProjectType ], null: false

    def projects
      dataloader.with(Sources::AssociationLoader, User, :projects).load(object.id)
    end
  end
end
