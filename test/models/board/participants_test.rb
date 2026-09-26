require "test_helper"

class Board::ParticipantsTest < ActiveSupport::TestCase
  setup do
    items(:dark_mode).update_columns(created_at: 5.days.ago)
    items(:export_csv).update_columns(created_at: 4.days.ago)
    items(:crash_on_login).update_columns(created_at: 3.days.ago)
    items(:spam).update_columns(created_at: 2.days.ago)
    votes(:author_likes_dark_mode).update_columns(created_at: 1.day.ago)
    votes(:owner_likes_dark_mode).update_columns(created_at: 6.days.ago)
    votes(:author_hits_crash).update_columns(created_at: 7.days.ago)
  end

  def participants(**options)
    Board::Participants.new(boards(:roadmap), **options).to_a
  end

  def emails(**options)
    participants(**options).map { |participant| participant.user.email }
  end

  test "everyone who posted or voted, most recently active first" do
    assert_equal %w[author@example.com stranger@example.com owner@example.com], emails
  end

  test "counts each person's items and votes on the board" do
    author = participants.find { |participant| participant.user == users(:author) }

    assert_equal 2, author.items_count
    assert_equal 2, author.votes_count
    assert_equal votes(:author_likes_dark_mode).reload.created_at, author.last_active_at
  end

  test "sorts by items and by votes" do
    assert_equal "owner@example.com", emails(sort: "most_items").last
    assert_equal "author@example.com", emails(sort: "most_votes").first
  end

  test "searches by name or email" do
    users(:stranger).update!(name: "Sam Stranger")

    assert_equal %w[stranger@example.com], emails(query: "sam")
    assert_equal %w[owner@example.com], emails(query: "owner@")
  end

  test "ignores activity on other boards" do
    other = boards(:side_project).items.create!(user: users(:board_owner), kind: "idea", title: "Elsewhere")
    other.votes.create!(user: users(:board_owner))

    owner = participants.find { |participant| participant.user == users(:board_owner) }
    assert_equal 0, owner.items_count
    assert_equal 1, owner.votes_count
  end
end
