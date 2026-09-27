workspace = Board.find_by!(pid: ARGV.fetch(0)).workspace
workspace.regenerate_embed_secret!

puts workspace.embed_secret
