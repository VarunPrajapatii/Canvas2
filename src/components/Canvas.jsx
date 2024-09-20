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

      // Adjust points for specific shapes
      if (item.shapeType === 'line' || item.shapeType === 'arrow') {
        newShape.points = [0, 0, 100, 0]; // Horizontal line or arrow
      } else if (item.shapeType === 'triangle') {
        newShape.points = [0, 100, 50, 0, 100, 100]; // Triangle points
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
