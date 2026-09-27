# Finds the boards and items the current user takes part in, hiding those they may not touch.
module BoardParticipation
  private

  def participating_board
    permitted!(Board.find_by_pid!(params[:board_pid]))
  end

  def participating_item
    Item.find(params[:item_id] || params[:id]).tap { |item| permitted!(item.board) }
  end

  def permitted!(board)
    raise ActiveRecord::RecordNotFound unless BoardParticipationPolicy.allowed?(current_user, board)

    board
  end
end
