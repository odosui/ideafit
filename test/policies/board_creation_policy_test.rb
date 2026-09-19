require "test_helper"

class BoardCreationPolicyTest < ActiveSupport::TestCase
  test "admins may create boards" do
    assert BoardCreationPolicy.allowed?(users(:board_owner))
  end

  test "participants and visitors may not" do
    assert_not BoardCreationPolicy.allowed?(users(:author))
    assert_not BoardCreationPolicy.allowed?(nil)
  end
end
