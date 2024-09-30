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