require "test_helper"

class ParticipantHomeShowTest < ActionDispatch::IntegrationTest
  test "lists boards the participant posted or voted on" do
    sign_in users(:author)

    get participant_home_path

    assert_response :success
    assert_select ".auth-boards a", text: "Roadmap", count: 1
  end

  test "someone without activity is told to ask for a link" do
    user = User.create!(email: "new@example.com")
    sign_in user

    get participant_home_path

    assert_select ".auth-boards", count: 0
    assert_match "Ask the board owner", response.body
  end

  test "signed-out visitor is sent to sign-in" do
    get participant_home_path

    assert_redirected_to new_user_session_path
  end
end
