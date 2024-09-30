import React from 'react';
import DraggableShape from './DraggableShape';
// Import only valid icons
import { Square, Circle, Triangle, Minus, ArrowRight, ChevronUp, Diamond, ChevronRight } from 'lucide-react';


const shapes = [
    { shapeType: 'rect', icon: Square },
    { shapeType: 'circle', icon: Circle },
    { shapeType: 'triangle', icon: Triangle },
    { shapeType: 'line', icon: Minus },
    { shapeType: 'arrow', icon: ArrowRight },
    { shapeType: 'diamond', icon: Diamond },
    // Replace Parallelogram and IconName with valid icons or remove them
];

const ShapeBar = () => {
  return (
    <div
      className="fixed top-36 left-4 bg-gray-200 p-3 rounded-lg shadow-lg space-y-6 border border-gray-400"
      style={{ zIndex: 10 }}
    >
      {shapes.map((shape) => (
        <DraggableShape key={shape.shapeType} shapeType={shape.shapeType} icon={shape.icon} />
      ))}
    </div>
  );
};

export default ShapeBar;
