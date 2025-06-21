import React from 'react';

type Porops = { 
  location: string 
}

const TestComponent = (props: Porops) => {
  const refCount = React.useRef(0);
  refCount.current++;
  
  return (<div style={{ position: 'relative' }}>
    <p style={{ 
      margin: 0,
      opacity: 0.5,
      padding: '3px',
      whiteSpace: 'nowrap', 
      fontSize: '12px', 
      position: 'absolute', 
      top: 0, 
      left: 0,
      backgroundColor: '#FFFFFF',
      zIndex: 2
    }}>{props.location}, Ref Count: {refCount.current}</p>
  </div>);
};

export default TestComponent;