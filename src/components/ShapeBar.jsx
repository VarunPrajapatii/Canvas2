import React from 'react';
import ShapeItem from './DraggableShape';
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
      className="fixed top-4 left-4 w-24 bg-white p-4 rounded-lg shadow-lg space-y-4 border border-gray-300"
      style={{ zIndex: 10 }}
    >
      {shapes.map((shape) => (
        <ShapeItem key={shape.shapeType} shapeType={shape.shapeType} icon={shape.icon} />
      ))}
    </div>
  );
};

export default ShapeBar;
