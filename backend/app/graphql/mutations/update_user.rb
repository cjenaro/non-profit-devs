module Mutations
  class UpdateUser < BaseMutation
    description "Update user profile"

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false
    argument :skills, [ Types::SkillType ], required: false

    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, name: nil, email: nil, skills: nil)
      user = User.find(id)

      updates = {}
      updates[:name] = name if name
      updates[:email] = email if email
      updates[:skills] = skills if skills
      if user.update(updates)
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
