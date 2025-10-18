module Types
  class TokenType < Types::BaseObject
    description "JWT authentication token"

    field :token, String, null: false
  end
end
