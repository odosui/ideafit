require "test_helper"

class ParticipantHomeShowTest < ActionDispatch::IntegrationTest
  test "lists boards the participant posted or voted on" do
    sign_in users(:author)

    get participant_home_path

    assert_response :success
    assert_equal ["Roadmap"], participant_board_names
  end

  test "someone without activity is told to ask for a link" do
    user = User.create!(email: "new@example.com")
    sign_in user

    get participant_home_path

    assert_equal [], participant_board_names
  end

  test "signed-out visitor is sent to sign-in" do
    get participant_home_path

    assert_redirected_to new_user_session_path
  end

  private

  def participant_board_names
    json_line = response.body[/window\.participantBoards = (.*)$/, 1]
    JSON.parse(json_line).map { |board| board["name"] }
  end
end
