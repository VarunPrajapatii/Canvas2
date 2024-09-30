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
      const stage = document.getElementById('canvas-stage');
      const stageRect = stage.getBoundingClientRect();

      const x = clientOffset.x - stageRect.left;
      const y = clientOffset.y - stageRect.top;

      const newShape = {
        id: Date.now(),
        type: item.shapeType,
        x: x,
        y: y,
        width: 100,
        height: 100,
      };
      // setSelectedShapeId(newShape.id)
      if(item.shapeType === 'triangle'){
        // console.log(newShape.x, newShape.y, "triangles");
      }

      // Adjust points for specific shapes
      if (item.shapeType === 'line' || item.shapeType === 'arrow') {
        newShape.points = [x, y, x + 200, y]; // Horizontal line or arrow
      } else if (item.shapeType === 'triangle') {
        // console.log("before points", newShape.x, newShape.y, newShape);
        
        newShape.points = [
          x, y + 100, // Bottom left
          x + 50, y, // Top middle
          x + 100, y + 100, // Bottom right
        ];
        
        // console.log("after points", newShape.x, newShape.y, newShape);
      }
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
    // console.log(e.target);
    // console.log(e.target.getStage());

    
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
