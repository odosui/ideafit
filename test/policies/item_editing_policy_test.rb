require "test_helper"

class ItemEditingPolicyTest < ActiveSupport::TestCase
  test "the author may edit a fresh item" do
    assert ItemEditingPolicy.allowed?(users(:author), items(:dark_mode))
  end

  test "nobody else may, not even the board manager" do
    assert_not ItemEditingPolicy.allowed?(users(:board_owner), items(:dark_mode))
    assert_not ItemEditingPolicy.allowed?(users(:stranger), items(:dark_mode))
    assert_not ItemEditingPolicy.allowed?(nil, items(:dark_mode))
  end

  test "the author may not edit once the status has changed" do
    assert_not ItemEditingPolicy.allowed?(users(:stranger), items(:crash_on_login))
  end

  test "the author may not edit once an admin touched the status, even if it is fresh again" do
    item = items(:dark_mode)
    item.change_status!("planned", by: users(:board_owner))
    item.change_status!("fresh", by: users(:board_owner))

    assert_not ItemEditingPolicy.allowed?(users(:author), item)
  end
end
