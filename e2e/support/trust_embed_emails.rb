Board.find_by!(pid: ARGV.fetch(0)).workspace.update!(trust_embed_emails: true)
