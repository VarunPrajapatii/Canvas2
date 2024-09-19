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
      const offset = monitor.getSourceClientOffset(); // Position where the item is dropped
      addShape(item.shapeType, offset);                // Adds the shape to the canvas
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addShape = (shapeType, offset) => {
    setShapes((prevShapes) => [
      ...prevShapes,
      { id: Date.now(), type: shapeType, x: offset.x, y: offset.y, width: 100, height: 100 },
    ]);
  };

  const updateShape = (updatedShape) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === updatedShape.id ? updatedShape : shape))
    );
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedShapeId(null); // Deselect when clicking outside
    }
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  return (
    <div ref={drop} className="flex-grow relative"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                          linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',  // You can adjust the grid size here
        backgroundPosition: '0 0',
      }}
    >
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick} onWheel={handleWheel}>
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
