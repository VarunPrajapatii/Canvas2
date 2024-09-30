/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
import {
  Rect,
  Circle,
  Line,
  Transformer,
  Arrow,
  Ellipse,
  Path,
} from "react-konva";

const KonvaShape = ({ shape, isSelected, onSelect, onUpdateShape }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  // console.log(shapeRef);
  // console.log(trRef);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    console.log("second shape.x/y", shape.x, shape.y);
  }, [isSelected]);

  const handleDragEnd = (e) => {
    console.log(e.target.x(), e.target.y(), "this one");
    console.log("in drag", shape.x, shape.y);

    const newShape = {
      ...shape,
      x: e.target.x(),
      y: e.target.y(),
    };
    onUpdateShape(newShape);
    // console.log(e.target.x(), e.target.y());
  };

  // const handleTransformEnd = () => {
  //   const node = shapeRef.current;
  //   const scaleX = node.scaleX();
  //   const scaleY = node.scaleY();`

  //   // Get the original position
  //   const originalX = node.x();
  //   const originalY = node.y();

  //   // Get the original dimensions before scaling
  //   const originalWidth = shape.width;
  //   const originalHeight = shape.height;

  //   // Reset the scale back to 1 (to prevent compounding scaling)
  //   node.scaleX(1);
  //   node.scaleY(1);

  //   // Create a new shape object
  //   const newShape = {
  //     ...shape,
  //     x: originalX, // Keep the original x
  //     y: originalY, // Keep the original y
  //     width: originalWidth * scaleX, // Adjust width based on scaleX
  //     height: originalHeight * scaleY, // Adjust height based on scaleY
  //   };

  //   // Update points based on shape type
  //   if (shape.type === "line" || shape.type === "arrow") {
  //     // Lines and arrows need to update their points
  //     const newPoints = shape.points.map((point, index) =>
  //       index % 2 === 0 ? point * scaleX : point * scaleY
  //     );
  //     newShape.points = newPoints;
  //   } else if (shape.type === "triangle") {
  //     // Triangles need to recalculate their points
  //     const halfWidth = newShape.width / 2;
  //     const halfHeight = newShape.height / 2;

  //     // Maintain the center point of the triangle and recalculate the points
  //     newShape.points = [
  //       originalX - halfWidth, originalY + halfHeight, // Bottom left
  //       originalX, originalY - halfHeight, // Top middle
  //       originalX + halfWidth, originalY + halfHeight, // Bottom right
  //     ];
  //   } else if (shape.type === "diamond") {
  //     // Define the points for a diamond shape
  //     const halfWidth = newShape.width / 2;
  //     const halfHeight = newShape.height / 2;
  //     newShape.points = [
  //       newShape.x + halfWidth,
  //       newShape.y, // Top middle
  //       newShape.x + newShape.width,
  //       newShape.y + halfHeight, // Right middle
  //       newShape.x + halfWidth,
  //       newShape.y + newShape.height, // Bottom middle
  //       newShape.x,
  //       newShape.y + halfHeight, // Left middle
  //     ];
  //   }

  //   onUpdateShape(newShape);
  // };

  const handleTransformEnd = () => {
    console.log("in transform", shape.x, shape.y);

    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Get the original position (center point)
    const originalX = node.x();
    const originalY = node.y();
    const originalWidth = shape.width;
    const originalHeight = shape.height;

    console.log(
      "originalX",
      originalX,
      "originalY",
      originalY,
      "originalWidth",
      originalWidth,
      "originalHeight",
      originalHeight
    );

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

    // Update points specifically for the triangle
    if (shape.type === "line" || shape.type === "arrow") {
      // Lines and arrows need to update their points
      const newPoints = shape.points.map((point, index) =>
        index % 2 === 0 ? point * scaleX : point * scaleY
      );
      newShape.points = newPoints;
    } else if (shape.type === "triangle") {
      // Maintain the center point of the triangle and recalculate the points
      const halfWidth = newShape.width / 2;
      const halfHeight = newShape.height / 2;

      // Triangle points based on center (originalX, originalY)
      newShape.points = [
        originalX - halfWidth,
        originalY + halfHeight, // Bottom left
        originalX,
        originalY - halfHeight, // Top middle
        originalX + halfWidth,
        originalY + halfHeight, // Bottom right
      ];
    }

    onUpdateShape(newShape);
  };

  const renderShape = () => {
    // console.log(shape);

    switch (shape.type) {
      case "rect":
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
      case "circle":
        return (
          <Ellipse
            ref={shapeRef}
            {...shape}
            draggable
            stroke="black"
            fill="red"
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case "triangle":
        return (
          <Line
            ref={shapeRef}
            points={shape.points}
            closed
            stroke="black"
            fill="yellow"
            draggable
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case "line":
        return (
          <Line
            ref={shapeRef}
            points={shape.points}
            stroke="blue"
            strokeWidth={2}
            draggable
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case "arrow":
        return (
          <Arrow
            ref={shapeRef}
            points={shape.points}
            stroke="green"
            fill="green"
            draggable
            onClick={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        );
      case "diamond":
        return (
          <Path
            ref={shapeRef}
            data="M 50,0 L 100,50 L 50,100 L 0,50 Z" // Example diamond path
            x={shape.x}
            y={shape.y}
            scaleX={shape.width / 100}
            scaleY={shape.height / 100}
            fill="pink"
            stroke="purple"
            draggable
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
