# Inline colors for emails, matching the app's palette.
module MailColors
  STATUS_BADGES = {
    "planned" => { background: "#e0f2fe", text: "#075985" },
    "in_progress" => { background: "#fef3c7", text: "#92400e" },
    "done" => { background: "#dcfce7", text: "#166534" },
    "rejected" => { background: "#fee2e2", text: "#991b1b" },
  }.freeze

  BOARD_ACCENTS = {
    "teal" => "#0f766e",
    "indigo" => "#4f46e5",
    "terracotta" => "#c2410c",
    "ink" => "#1d4ed8",
    "plum" => "#7e22ce",
  }.freeze
end
