require "test_helper"

class BoardsEmbeddingTest < ActionDispatch::IntegrationTest
  test "board pages can be framed by any site by default" do
    get "/b/roadmap0pid"

    assert_nil response.headers["X-Frame-Options"]
    assert_includes response.headers["Content-Security-Policy"], "frame-ancestors *"
  end

  test "board pages can be framed only by the allowed domains when set" do
    ENV["EMBED_ALLOWED_DOMAINS"] = "acme.com"
    get "/b/roadmap0pid"

    assert_includes response.headers["Content-Security-Policy"], "frame-ancestors 'self' acme.com"
  ensure
    ENV.delete("EMBED_ALLOWED_DOMAINS")
  end

  test "other pages still refuse framing" do
    get "/sign_in"

    assert_equal "SAMEORIGIN", response.headers["X-Frame-Options"]
  end

  test "embed mode is passed to the page" do
    get "/b/roadmap0pid?embed=1"

    assert_select "body[data-embedded=?]", "true"
  end

  test "regular mode is the default" do
    get "/b/roadmap0pid"

    assert_select "body[data-embedded=?]", "false"
  end
end
