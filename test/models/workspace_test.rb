require "test_helper"

class WorkspaceTest < ActiveSupport::TestCase
  test "primary is the first workspace" do
    assert_equal Workspace.order(:id).first, Workspace.primary
  end

  test "primary is created on a fresh install" do
    Workspace.destroy_all

    assert_difference -> { Workspace.count }, 1 do
      Workspace.primary
    end
  end

  test "knows its members" do
    assert workspaces(:main).member?(users(:board_owner))
    assert_not workspaces(:main).member?(users(:author))
    assert_not workspaces(:main).member?(nil)
  end

  test "adds a member once" do
    workspace = workspaces(:main)

    assert_difference -> { workspace.memberships.count }, 1 do
      2.times { workspace.add_member(users(:author)) }
    end
  end
end
