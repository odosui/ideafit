import * as React from 'react'
import FilterSelect from '../../items/toolbar/FilterSelect'
import SearchField from '../../items/toolbar/SearchField'
import { PARTICIPANT_SORTS } from '../options/participantSorts'
import { ParticipantQuery } from '../query/participantQuery'

interface Props {
  query: ParticipantQuery
  onChange: (changes: Partial<ParticipantQuery>) => void
}

const ParticipantsToolbar: React.FC<Props> = ({ query, onChange }) => (
  <div className="items-toolbar">
    <SearchField
      label="Search participants"
      value={query.q}
      onChange={(q) => onChange({ q })}
    />
    <FilterSelect
      label="Sort"
      value={query.sort}
      options={PARTICIPANT_SORTS}
      onChange={(sort) => onChange({ sort })}
    />
  </div>
)

export default ParticipantsToolbar
