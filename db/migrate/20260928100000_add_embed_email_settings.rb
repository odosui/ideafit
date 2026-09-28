class AddEmbedEmailSettings < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :trust_embed_emails, :boolean, default: false, null: false
    add_column :boards, :embed_page_url, :string
  end
end
