module Mutations
  class ChangePassword < BaseMutation
    include Authentication

    description "Change user password"

    argument :id, ID, required: true
    argument :current_password, String, required: true
    argument :new_password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, current_password:, new_password:)
      authenticate_user!

      user = User.find(id)

      # Authorization check
      unless current_user.id == user.id
        raise GraphQL::ExecutionError, "Not authorized to change this user's password"
      end

      if user.authenticate(current_password)
        user.password = new_password
        if user.save
          { user: user, errors: [] }
        else
          { user: nil, errors: user.errors.full_messages }
        end
      else
        { user: nil, errors: [ "Current password is incorrect" ] }
      end
    end
  end
end
