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
    const newShape = {
      ...shape,
      x: e.target.x(),
      y: e.target.y(),
    };
    onUpdateShape(newShape);
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    const newShape = {
      ...shape,
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY,
    };

    if (shape.type === 'line' || shape.type === 'arrow') {
      newShape.points = [0, 0, newShape.width, 0]; // Maintain horizontal line/arrow
    } else if (shape.type === 'triangle') {
      newShape.points = [
        0, newShape.height,
        newShape.width / 2, 0,
        newShape.width, newShape.height,
      ];
    }

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
