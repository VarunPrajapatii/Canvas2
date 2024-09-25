/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Rect, Circle, Line, Transformer, Arrow } from 'react-konva';

const KonvaShape = ({ shape, isSelected, onSelect, onUpdateShape }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    // console.log("x: ", e.target.x(), "  y: ", e.target.y())
    // const newShape = {
    //   ...shape,
    //   x: e.target.x(),
    //   y: e.target.y(),
    // };
    // console.log(newShape);
    // if(newShape.type === "triangle"){
    //   null
    // }else{
    //   onUpdateShape(newShape);
    // }
    
  };
  
  // const handleTransformEnd = () => {
  //   const node = shapeRef.current;
  //   const scaleX = node.scaleX();
  //   const scaleY = node.scaleY();

  //   // Get the original position
  //   const originalX = node.x();
  //   const originalY = node.y();
    
  //   // Get the original dimensions after scaling
  //   const originalWidth = shape.width; // Use original width
  //   const originalHeight = shape.height; // Use original height

  //   // Reset scale back to 1
  //   node.scaleX(1);
  //   node.scaleY(1);

  //   // Create a new shape object
  //   const newShape = {
  //       ...shape,
  //       x: shape.initialX !== undefined ? shape.initialX : originalX, // Keep original x for the first resize
  //       y: shape.initialY !== undefined ? shape.initialY : originalY, // Keep original y for the first resize
  //       width: originalWidth * scaleX, // Scale width
  //       height: originalHeight * scaleY, // Scale height
  //   };

  //   // Set the initial position if not already set
  //   if (shape.initialX === undefined && shape.initialY === undefined) {
  //       newShape.initialX = originalX;
  //       newShape.initialY = originalY;
  //   }
    
  //   // Update points based on shape type
  //   if (shape.type === 'line' || shape.type === 'arrow') {
  //       newShape.points = [
  //           newShape.x, newShape.y, // Start point remains fixed
  //           newShape.x + newShape.width, newShape.y // End point adjusted
  //       ];

  //   } else if (shape.type === 'triangle') {
  //       newShape.points = [
  //           newShape.x, newShape.y + newShape.height, // Bottom left
  //           newShape.x + newShape.width / 2, newShape.y, // Top middle
  //           newShape.x + newShape.width, newShape.y + newShape.height, // Bottom right
  //       ];
  //   }
  //   onUpdateShape(newShape);
  // };

  const handleTransformEnd = () => {
  const node = shapeRef.current;
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // Get the original position
  const originalX = node.x();
  const originalY = node.y();
  
  // Get the original dimensions before scaling
  const originalWidth = shape.width;
  const originalHeight = shape.height;

  // Reset the scale back to 1 (to prevent compounding scaling)
  node.scaleX(1);
  node.scaleY(1);

  // Create a new shape object
  const newShape = {
    ...shape,
    x: originalX, // Keep the original x
    y: originalY, // Keep the original y
    width: originalWidth * scaleX, // Adjust width based on scaleX
    height: originalHeight * scaleY, // Adjust height based on scaleY
  };

  // Update points based on shape type
  if (shape.type === 'line' || shape.type === 'arrow') {
    // Lines and arrows need to update their points
    const newPoints = shape.points.map((point, index) => 
      index % 2 === 0
        ? point * scaleX
        : point * scaleY
    );
    newShape.points = newPoints;

  } else if (shape.type === 'triangle') {
    // Triangles need to recalculate their points
    newShape.points = [
      newShape.x, newShape.y + newShape.height, // Bottom left
      newShape.x + newShape.width / 2, newShape.y, // Top middle
      newShape.x + newShape.width, newShape.y + newShape.height, // Bottom right
    ];
  }

  // Update the shape with the new dimensions/points
  onUpdateShape(newShape);
};

  

  const renderShape = () => {
    switch (shape.type) {
      case 'rect':
        return (
          <Rect
            ref={shapeRef}
            {...shape}
            draggable
            stroke="black"
            fill="grey"
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case 'circle':
        return (
          <Circle
            ref={shapeRef}
            {...shape}
            radius={shape.width / 2}
            draggable
            stroke="black"
            fill="red"
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case 'triangle':
        return (
          <Line
            ref={shapeRef}
            points={[
              shape.x, shape.y + shape.height, // Bottom left
              shape.x + shape.width / 2, shape.y, // Top middle
              shape.x + shape.width, shape.y + shape.height, // Bottom right
            ]}
            closed
            stroke="black"
            fill="yellow"
            draggable
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case 'line':
        return (
          <Line
            ref={shapeRef}
            points={shape.points}
            stroke="black"
            draggable
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case 'arrow':
        return (
          <Arrow
            ref={shapeRef}
            points={shape.points}
            stroke="black"
            draggable
            pointerLength={10}
            pointerWidth={10}
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderShape()}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default KonvaShape;
