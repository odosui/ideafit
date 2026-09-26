const CARD_TYPE = 'application/x-ideafit-item'

export const putCard = (transfer: DataTransfer, id: number) => {
  transfer.setData(CARD_TYPE, String(id))
  transfer.effectAllowed = 'move'
}

export const carriesCard = (transfer: DataTransfer) =>
  transfer.types.includes(CARD_TYPE)

export const takeCard = (transfer: DataTransfer) =>
  Number(transfer.getData(CARD_TYPE)) || null
