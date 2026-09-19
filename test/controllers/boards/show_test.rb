require "test_helper"

class BoardsShowTest < ActionDispatch::IntegrationTest
  test "renders the board page" do
    get "/b/roadmap0pid"

    assert_response :success
    assert_select "title", "Roadmap · Ideafit"
    assert_select "body[data-board-name=?]", "Roadmap"
    assert_select "body[data-color-scheme=?]", "teal"
  end

  test "renders the board page for each kind" do
    %w[ideas bugs questions].each do |kind|
      get "/b/roadmap0pid/#{kind}"

      assert_response :success
    end
  end

  test "unknown kind returns 404" do
    get "/b/roadmap0pid/nope"

    assert_response :not_found
  end

  test "unknown pid returns 404" do
    get "/b/nope"

    assert_response :not_found
  end
end
