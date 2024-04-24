# Problema Checkpoint 14

Crear una función (en React) y pasarla como “props” a un componente para cambiar su estado. Además implementa un iniciador que permita ejecutar esta función de manera repetitiva.

## Solución

[CodeSandbox](https://codesandbox.io/p/sandbox/checkpoint-14-v72j44)

1. Crear una función en el componente principal (padre) que actualice el estado del componente hijo.
2. Pasar esta función como una “prop” al componente hijo.
3. Implementar un iniciador en el componente principal que llame a esta función de manera repetitiva.

### El componente principal (padre)

```jsx
import React, { useEffect, useState } from ‘react’;
import ChildComponent from ’./ChildComponent’;

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
```

### El componente hijo

```jsx
import React from ‘react’;

const ChildComponent = ({ childState, toggleChildState }) => {
  return (
    <div>
      <h2>Estado del hijo: {childState ? ‘Activo’ : ‘Inactivo’}</h2>
    </div>
  );
};

export default ChildComponent;
```

El componente padre (*ParentComponent*) tiene una función `toggleChildState` que alterna el estado del componente hijo (*ChildComponent*). Se pasa esta función como una “prop” llamada **toggleChildState** al componente hijo, junto con el estado actual **childState**. Además, se implementa un iniciador usando **useEffect** para llamar a `toggleChildState`, repetitivamente, cada segundo.
