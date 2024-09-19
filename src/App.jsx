import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ShapeBar from './components/ShapeBar';
import Canvas from './components/Canvas';
 


const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>  
      <div className="flex h-screen">
        <ShapeBar />
        <Canvas />
      </div>
    </DndProvider>
  );
};

export default App;
