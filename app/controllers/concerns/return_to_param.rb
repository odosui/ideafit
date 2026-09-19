module ReturnToParam
  private

  def return_to_param
    path = params[:return_to].to_s
    path if path.start_with?("/") && !path.start_with?("//") && !path.include?("\\")
  end
end
