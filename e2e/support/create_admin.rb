puts User.create!(email: "e2e-admin-#{SecureRandom.hex(6)}@example.com", admin: true).email
