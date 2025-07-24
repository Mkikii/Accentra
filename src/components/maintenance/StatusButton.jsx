import React, { useState } from 'react'

const StatusButton = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((prevCount) => (prevCount >= 2 ? 0 : prevCount + 1))
  }

  const getStatusLabel = () => {
    switch (count) {
      case 1:
        return "In Progress"
      case 2:
        return "Complete"
      default:
        return "Pending"
    }
  }

  return (
    <button onClick={handleClick}>
      {getStatusLabel()}
    </button>
  )
}

export default StatusButton
