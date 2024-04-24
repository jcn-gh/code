import React from 'react';

const ChildComponent = ({ childState, toggleChildState }) => {
  return (
    <div>
      <h2>Estado del hijo: {childState ? 'Activo' : 'Inactivo'}</h2>
    </div>
  );
};

export default ChildComponent;