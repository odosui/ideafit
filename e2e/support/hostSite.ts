import { Page } from '@playwright/test'
import { createServer } from 'http'
import { AddressInfo } from 'net'

// A customer's site embedding the board with one script tag. It runs on 127.0.0.1,
// another site than the board's localhost, just as a real embed is cross-site.
async function serveHostPage(page: Page, html: string) {
  const server = createServer((_request, response) => {
    response.setHeader('Content-Type', 'text/html')
    response.end(html)
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  page.on('close', () => server.close())
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}/`
}

export async function openHostSite(
  page: Page,
  { baseURL, pid, token }: { baseURL: string; pid: string; token?: string },
) {
  const tokenAttribute = token ? ` data-token="${token}"` : ''
  const url = await serveHostPage(
    page,
    `<!doctype html><html><body>
      <script id="ideafit" src="${baseURL}/embed.js" data-board="${pid}"${tokenAttribute}></script>
      <button onclick="IdeaFit.show()">Feedback</button>
    </body></html>`,
  )
  await page.goto(url)
  await page.getByRole('button', { name: 'Feedback' }).click()
  return page.frameLocator('iframe')
}
