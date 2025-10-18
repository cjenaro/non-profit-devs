module Authentication
  def current_user
    return @current_user if defined?(@current_user)

    @current_user = authenticate_user_from_token
  end

  def authenticate_user!
    raise GraphQL::ExecutionError, "Authentication required" unless current_user
  end

  private

  def authenticate_user_from_token
    token = context[:token]
    return nil unless token

    decoded = JWT.decode(
      token,
      Rails.application.secret_key_base,
      true,
      algorithm: "HS256"
    )

    user_id = decoded[0]["user_id"]
    User.find_by(id: user_id)
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
