# The page on the host site that embeds this board. Emails to the site's users link there.
module Board::EmbedPage
  extend ActiveSupport::Concern

  included do
    normalizes :embed_page_url, with: ->(url) { url.strip.presence }
    validates :embed_page_url, format: { with: %r{\Ahttps?://\S+\z}i, message: "must start with http:// or https://" }, allow_nil: true
  end
end
