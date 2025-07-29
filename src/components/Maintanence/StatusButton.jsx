import React from 'react'

const StatusButton = ({ status, onChange }) => {
  const getStatusLabel = () => {
    switch (status) {
      case 1:
        return "In Progress"
      case 2:
        return "Complete"
      default:
        return "Pending"
    }
  }

  const handleClick = () => {
    const newStatus = status >= 2 ? 0 : status + 1
    onChange(newStatus)
  }

  return (
    <button onClick={handleClick}>
      {getStatusLabel()}
    </button>
  )
}

export default StatusButton
