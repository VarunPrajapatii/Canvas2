import React from 'react';
import DraggableShape from './DraggableShape';
import { Square, Circle, Triangle, Minus, ArrowRight } from 'lucide-react';

const shapes = [
  { shapeType: 'rect', icon: Square },
  { shapeType: 'circle', icon: Circle },
  { shapeType: 'triangle', icon: Triangle },
  { shapeType: 'line', icon: Minus },
  { shapeType: 'arrow', icon: ArrowRight },
];

const ShapeBar = () => {
  return (
    <div
      className="fixed top-36 left-4  bg-gray-200 p-3 rounded-lg shadow-lg space-y-6 border border-gray-400"
      style={{ zIndex: 10 }}
    >
      {shapes.map((shape) => (
        <DraggableShape key={shape.shapeType} shapeType={shape.shapeType} icon={shape.icon} />
      ))}
    </div>
  );
};

export default ShapeBar;
