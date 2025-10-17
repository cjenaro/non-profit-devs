module Types
  class AuthPayloadType < Types::BaseObject
    description "Authentication payload with token and user"

    field :token, Types::TokenType, null: false
    field :user, Types::UserType, null: false
  end
end
