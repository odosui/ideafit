# The headers Gmail and Yahoo expect for one-click unsubscribe (RFC 8058).
module OneClickUnsubscribe
  private

  def one_click_unsubscribe(url)
    headers["List-Unsubscribe"] = "<#{url}>"
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"
  end
end
