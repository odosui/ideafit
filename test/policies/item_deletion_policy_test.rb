require "test_helper"

class ItemDeletionPolicyTest < ActiveSupport::TestCase
  test "the author and the board manager may delete an item" do
    assert ItemDeletionPolicy.allowed?(users(:author), items(:dark_mode))
    assert ItemDeletionPolicy.allowed?(users(:board_owner), items(:dark_mode))
  end

  test "others and visitors may not" do
    assert_not ItemDeletionPolicy.allowed?(users(:stranger), items(:dark_mode))
    assert_not ItemDeletionPolicy.allowed?(nil, items(:dark_mode))
  end
end
