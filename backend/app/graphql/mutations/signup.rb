module Mutations
  class Signup < BaseMutation
    description "Create a new user account"

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :skills, [ Types::SkillType ], required: true

    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(name:, email:, password:, skills:)
      user = User.new(
        name: input[:name],
        email: input[:email],
        password: input[:password],
        skills: input[:skills]
      )

      if user.save
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
