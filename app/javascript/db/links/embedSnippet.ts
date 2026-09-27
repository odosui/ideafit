const scriptTag = (pid: string, attributes = '') =>
  `<script id="ideafit" src="${window.location.origin}/embed.js" data-board="${pid}"${attributes}></script>`

const FEEDBACK_BUTTON = `<button onclick="IdeaFit.show()">Feedback</button>`

export const embedSnippet = (pid: string) =>
  [scriptTag(pid), FEEDBACK_BUTTON].join('\n')

export const identifiedEmbedSnippet = (pid: string) =>
  [
    scriptTag(pid, ' data-token="TOKEN_FROM_YOUR_SERVER"'),
    FEEDBACK_BUTTON,
  ].join('\n')
