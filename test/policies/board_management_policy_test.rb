require "test_helper"

class BoardManagementPolicyTest < ActiveSupport::TestCase
  test "the board owner may manage it" do
    assert BoardManagementPolicy.allowed?(users(:board_owner), boards(:roadmap))
  end

  test "any member of the board's workspace may manage it" do
    workspaces(:main).add_member(users(:stranger))

    assert BoardManagementPolicy.allowed?(users(:stranger), boards(:roadmap))
  end

  test "others and visitors may not" do
    assert_not BoardManagementPolicy.allowed?(users(:author), boards(:roadmap))
    assert_not BoardManagementPolicy.allowed?(users(:stranger), boards(:roadmap))
    assert_not BoardManagementPolicy.allowed?(nil, boards(:roadmap))
  end

  test "scope holds only the boards a user may manage" do
    assert_equal [boards(:roadmap)], BoardManagementPolicy.scope(users(:board_owner)).to_a
    assert_empty BoardManagementPolicy.scope(users(:author))
    assert_empty BoardManagementPolicy.scope(nil)
  end
end
