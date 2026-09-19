module ApplicationHelper
  def js_data
    res = {
      env: Rails.env,
      flash: flash.present? ? flash.to_hash : nil,
    }

    res
  end

end
