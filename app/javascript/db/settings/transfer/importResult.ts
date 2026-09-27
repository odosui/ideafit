export interface ImportSummary {
  users: number
  items: number
  votes: number
}

export type ImportResult = ImportSummary | { success: false; error: string }

export const isImportSummary = (
  result: ImportResult | null | undefined,
): result is ImportSummary => !!result && 'items' in result

export const describeImport = ({ items, votes, users }: ImportSummary) =>
  `Imported ${items} items, ${votes} votes and ${users} people.`
