// The Clipboard API needs HTTPS (or localhost); fall back to a prompt elsewhere
export default async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    window.prompt('Copy this link:', text)
    return false
  }
}
