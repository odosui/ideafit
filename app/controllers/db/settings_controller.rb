class Db::SettingsController < ApplicationController
  layout 'db'

  before_action :authenticate_user!

  def show; end
end
