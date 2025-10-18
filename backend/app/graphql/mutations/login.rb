module Mutations
  class Login < BaseMutation
    description "Authenticate user and return JWT token"

    argument :email, String, required: true
    argument :password, String, required: true

    field :token, Types::TokenType, null: true
    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(email:, password:)
      user = User.find_by(email: email)

      if user&.authenticate(password)
        token = generate_token(user)
        {
          token: { token: token },
          user: user,
          errors: []
        }
      else
        { token: nil, user: nil, errors: [ "Invalid email or password" ] }
      end
    end

    private

    def generate_token(user)
      payload = {
        user_id: user.id,
        exp: 24.hours.from_now.to_i
      }

      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
end
