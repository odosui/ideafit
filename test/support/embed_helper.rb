module EmbedHelper
  def identity_jwt(secret, exp: 1.hour.from_now, algorithm: "HS256", **claims)
    JWT.encode({ id: "site-42", exp: exp.to_i, **claims }, secret, algorithm)
  end

  def embed_user(workspace = workspaces(:main), external_id: "site-42", **attributes)
    workspace.embed_users.create!(external_id:, **attributes)
  end

  def embed_session_headers(user)
    { "Authorization" => "Bearer #{user.generate_token_for(:embed_session)}" }
  end
end
