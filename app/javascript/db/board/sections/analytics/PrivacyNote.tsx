import * as React from 'react'

const PrivacyNote: React.FC = () => (
  <p className="analytics-page__privacy">
    <i className="fas fa-user-shield" aria-hidden="true" />
    Counted from the items and votes already on this board. No visitor tracking,
    no cookies, no per-person figures.
  </p>
)

export default PrivacyNote
