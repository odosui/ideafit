class ParticipantHomeController < ApplicationController
  layout 'db'

  before_action :authenticate_user!

  def show
    @boards = Board.participated_by(current_user).order(:name)
  end
end
