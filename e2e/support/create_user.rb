puts User.create!(email: "e2e-user-#{SecureRandom.hex(6)}@example.com").email
