# Stands in for reading the inbox: prints a fresh sign-in token for ARGV[0].
puts User.find_by!(email: ARGV.fetch(0)).generate_token_for(:magic_link)
