import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Stage, Layer } from 'react-konva';
import KonvaShape from './KonvaShape';

const Canvas = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'SHAPE',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      // console.log(clientOffset);
      // monitor.getClientOffset() retrieves the current mouse position (or the position of the dragged item) in the viewport. 
      // This returns an object with properties x and y, representing the mouse coordinates relative to the entire browser window.
      const stage = document.getElementById('canvas-stage');
      const stageRect = stage.getBoundingClientRect();
      // getBoundingClientRect() returns a DOMRect object containing the size of the element and its position relative to the viewport. 
      // This includes properties like top, left, width, and height.
      // The top and left properties are particularly important here, as they tell us the distance from the top-left corner of the viewport to the top-left corner of the canvas-stage
      // const x = clientOffset.x 
      // const y = clientOffset.y 
      const x = clientOffset.x - stageRect.left;
      const y = clientOffset.y - stageRect.top;
      console.log(stageRect);
      
      console.log("clientOffset.x: ", clientOffset.x, "stageRect.left: ", stageRect.left, "x: ",x)
      console.log("clientOffset.y: ", clientOffset.y, "stageRect.top: ", stageRect.top, "y: ",y)
      
      const newShape = {
        id: Date.now(),
        type: item.shapeType,
        x: x,
        y: y,
        width: 100,
        height: 100,
      };
      // console.log(newShape);
      
      // Adjust points for specific shapes
      if (item.shapeType === 'line' || item.shapeType === 'arrow') {
        newShape.points = [x, y, x + 200, y]; // Horizontal line or arrow
      } else if (item.shapeType === 'triangle') {
        newShape.points = [
          x, y + 100, // Bottom left
          x + 50, y, // Top middle
          x + 100, y + 100, // Bottom right
        ];
      }
      // else if (item.shapeType === 'triangle') {
      //   newShape.points = [0, 200, 200, 200, 100, 100]; // Triangle points
      // }

      setShapes((prevShapes) => [...prevShapes, newShape]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const updateShape = (updatedShape) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === updatedShape.id ? updatedShape : shape))
    );
  };

  const handleStageClick = (e) => {
    // console.log(e);
    if (e.target === e.target.getStage()) {
      setSelectedShapeId(null);
    }
  };

  return (
    <div
      ref={drop}
      className="relative w-screen h-screen"
      style={{
        background: 'white',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                          linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }}
    >
      <Stage id="canvas-stage" width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
        <Layer>
          {shapes.map((shape) => (            
            <KonvaShape
              key={shape.id}
              shape={shape}
              isSelected={shape.id === selectedShapeId}
              onSelect={() => setSelectedShapeId(shape.id)}
              onUpdateShape={updateShape}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
