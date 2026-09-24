import * as React from 'react'
import BellIcon from '../icons/BellIcon'
import BellOffIcon from '../icons/BellOffIcon'
import BellRingIcon from '../icons/BellRingIcon'
import { useRingOnFollow } from './useRingOnFollow'

interface Props {
  following: boolean
  onToggle: () => void
}

const classNameFor = (following: boolean, ringing: boolean) =>
  [
    'follow-toggle',
    following && 'follow-toggle--on',
    ringing && 'follow-toggle--ringing',
  ]
    .filter(Boolean)
    .join(' ')

const FollowToggle: React.FC<Props> = ({ following, onToggle }) => {
  const { ringing, stopRinging } = useRingOnFollow(following)

  return (
    <button
      type="button"
      className={classNameFor(following, ringing)}
      aria-pressed={following}
      title={following ? 'Stop email updates' : 'Get email updates'}
      onClick={onToggle}
    >
      <span className="follow-toggle__icon" onAnimationEnd={stopRinging}>
        {following ? <BellRingIcon /> : <BellIcon />}
      </span>
      <span className="follow-toggle__icon follow-toggle__icon--hover">
        <BellOffIcon />
      </span>
      <span className="follow-toggle__labels">
        <span className="follow-toggle__label follow-toggle__label--off">
          Follow
        </span>
        <span className="follow-toggle__label follow-toggle__label--on">
          Following
        </span>
        <span className="follow-toggle__label follow-toggle__label--hover">
          Unfollow
        </span>
      </span>
    </button>
  )
}

export default FollowToggle
