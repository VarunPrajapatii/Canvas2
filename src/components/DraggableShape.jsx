import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableShape = ({ shapeType, icon: Icon }) => {
  if (!Icon) {
    console.error(`Icon not found for shapeType: ${shapeType}`);
    return null;  // Prevent rendering if the icon is undefined
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'SHAPE',
    item: { shapeType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="p-2 cursor-pointer">
      <Icon size={32} color={isDragging ? 'gray' : 'black'} />
    </div>
  );
};


export default DraggableShape;
  