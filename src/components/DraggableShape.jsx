import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableShape = ({ shapeType, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SHAPE',
    item: { shapeType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="p-2 cursor-pointer">
      {/* Render the LucidIcon here */}
      <Icon size={32} color={isDragging ? 'gray' : 'black'} />
    </div>
  );
};

export default DraggableShape;
