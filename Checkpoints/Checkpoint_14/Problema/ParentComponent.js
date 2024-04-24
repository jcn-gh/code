import React, { useEffect, useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [childState, setChildState] = useState(false)

  const toggleChildState = () => {
    setChildState(prevState => !prevState)
  }

  // Iniciador para llamar a la función repetitivamente
  useEffect(() => {
    const interval = setInterval(() => {
      toggleChildState()
    }, 1000) // Cambia el estado cada segundo
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <ChildComponent
        childState={childState}
        toggleChildState={toggleChildState}
      />
    </div>
  )
}

export default ParentComponent;