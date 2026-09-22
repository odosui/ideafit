admin = User.create!(email: "e2e-admin-#{SecureRandom.hex(6)}@example.com")
Workspace.create!(name: "E2E workspace").add_member(admin)

puts admin.email
