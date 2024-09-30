/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { Rect, Line, Transformer, Arrow, Ellipse, Path } from "react-konva";

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
    const newShape = {
      ...shape,
      x: e.target.x(),
      y: e.target.y(),
    };
    onUpdateShape(newShape);
    console.log(shape.x, shape.y);

  };

  const handleTransformEnd = () => {
    console.log(shape.x, shape.y);

    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const originalX = node.x();
    const originalY = node.y();
    const originalWidth = shape.width;
    const originalHeight = shape.height;
  
    // Reset the scale to prevent compounding scaling issues
    node.scaleX(1);
    node.scaleY(1);
  
    const newShape = {
      ...shape,
      x: originalX,  // Keep the same position
      y: originalY,  // Keep the same position
      width: originalWidth * scaleX, // Adjust width based on scale
      height: originalHeight * scaleY, // Adjust height based on scale
    };
  
    // Adjust diamond shape resizing behavior
    if (shape.type === "diamond") {
      // Scale the diamond by adjusting width and height after reset
    newShape.width = originalWidth * scaleX;
    newShape.height = originalHeight * scaleY;

    // Update the path data or scaling based on width/height
    node.setAttr('scaleX', scaleX);
    node.setAttr('scaleY', scaleY);
    } else if (shape.type === "line" || shape.type === "arrow") {
      const newPoints = shape.points.map((point, index) =>
        index % 2 === 0 ? point * scaleX : point * scaleY
      );
      newShape.points = newPoints;
    } else if (shape.type === "triangle") {
      const halfWidth = newShape.width / 2;
      const halfHeight = newShape.height / 2;
  
      newShape.points = [
        originalX - halfWidth,
        originalY + halfHeight, // Bottom left
        originalX,
        originalY - halfHeight, // Top middle
        originalX + halfWidth,
        originalY + halfHeight, // Bottom right
      ];
    }
    console.log(shape.x, shape.y);

  
    onUpdateShape(newShape);
  };
  

  const renderShape = () => {
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
            width={shape.width} // Apply updated width
            height={shape.height} // Apply updated height
            scaleX={1} // Reset scaleX after transformation
            scaleY={1} // Reset scaleY after transformation
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
