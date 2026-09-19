import { animated, useSpring } from '@react-spring/web'
import * as React from 'react'

const Voter: React.FC<{
  voted: boolean
  onClick: () => void
  count: number
}> = ({ voted, onClick, count }) => {
  const { x } = useSpring({
    x: voted ? 1 : 0,
    config: { duration: 250 },
  })

  const styles = {
    transform: x
      .interpolate({
        range: [0, 0.25, 0.5, 0.75, 1],
        output: [1, 0.97, 0.9, 1.5, 1],
      })
      .interpolate((x) => `scale(${x})`),
  }

  return (
    <button className={`voter ${voted ? 'voted' : ''}`} onClick={onClick}>
      <i className="ti-angle-up" />
      <animated.span className="vote-count" style={styles}>
        {count}
      </animated.span>
    </button>
  )
}

export default Voter
