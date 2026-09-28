class Db::EmbedEmailsSerializer
  def initialize(board)
    @board = board
  end

  def as_json(*)
    {
      trust_emails: @board.workspace.trust_embed_emails,
      page_url: @board.embed_page_url,
    }
  end
end
