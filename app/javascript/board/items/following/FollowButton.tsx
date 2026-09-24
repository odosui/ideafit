import * as React from 'react'
import Button from '../../../shared/Button'

interface Props {
  following: boolean
  onClick: () => void
}

const FollowButton: React.FC<Props> = ({ following, onClick }) => (
  <Button
    className="btn--ghost btn--sm"
    title={following ? 'Stop email updates' : 'Get email updates'}
    onClick={onClick}
  >
    <i className="ti-bell"></i> {following ? 'Unfollow' : 'Follow'}
  </Button>
)

export default FollowButton
