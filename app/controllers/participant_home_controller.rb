class ParticipantHomeController < ApplicationController
  layout 'auth'

  before_action :authenticate_user!

  def show
    @boards = Board.participated_by(current_user).order(:name)
  end
end
