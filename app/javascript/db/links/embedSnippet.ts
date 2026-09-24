export const embedSnippet = (pid: string) => {
  const origin = window.location.origin

  return [
    `<script id="ideafit" src="${origin}/embed.js" data-board="${pid}"></script>`,
    `<button onclick="IdeaFit.show()">Feedback</button>`,
  ].join('\n')
}
