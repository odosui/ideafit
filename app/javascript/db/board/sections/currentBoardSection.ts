import { BOARD_SECTIONS, BoardSection, DEFAULT_BOARD_SECTION } from './boardSections'

const sectionSegment = (pathname: string) => pathname.split('/')[4]

export const currentBoardSection = (): BoardSection => {
  const key = sectionSegment(window.location.pathname) ?? DEFAULT_BOARD_SECTION
  return (
    BOARD_SECTIONS.find((section) => section.key === key) ?? BOARD_SECTIONS[0]
  )
}
