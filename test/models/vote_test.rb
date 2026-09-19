require "test_helper"

class VoteTest < ActiveSupport::TestCase
  test "keeps the item's votes_count in sync" do
    item = items(:export_csv)

    vote = item.votes.create!(user: users(:stranger))
    assert_equal 1, item.reload.votes_count

    vote.destroy!
    assert_equal 0, item.reload.votes_count
  end

  test "a user votes for an item only once" do
    duplicate = Vote.new(user: users(:author), item: items(:dark_mode))

    assert_not duplicate.valid?
  end

  test "the database rejects duplicate votes" do
    assert_raises ActiveRecord::RecordNotUnique do
      Vote.insert_all!([{ user_id: users(:author).id, item_id: items(:dark_mode).id }])
    end
  end
end
