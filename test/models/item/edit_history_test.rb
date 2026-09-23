require "test_helper"

class Item::EditHistoryTest < ActiveSupport::TestCase
  setup { @item = items(:dark_mode) }

  test "updates the item and remembers what it said before" do
    @item.update!(text: "Easier on the eyes")

    @item.edit!(title: "Night mode", text: "For late owls", by: users(:author))

    assert_equal ["Night mode", "For late owls"], [@item.reload.title, @item.text]
    edit = @item.edits.last
    assert_equal users(:author), edit.user
    assert_equal ["Dark mode", "Easier on the eyes"], [edit.previous_title, edit.previous_text]
  end

  test "records nothing when nothing changed" do
    @item.edit!(title: @item.title, text: @item.text, by: users(:author))

    assert_empty @item.edits
  end

  test "records nothing when the title is blank" do
    assert_raises(ActiveRecord::RecordInvalid) do
      @item.edit!(title: "", text: "No title", by: users(:author))
    end

    assert_empty @item.edits
    assert_equal "Dark mode", @item.reload.title
  end

  test "is deleted along with the item" do
    @item.edit!(title: "Night mode", text: nil, by: users(:author))

    assert_difference("Item::Edit.count", -1) { @item.destroy! }
  end
end
