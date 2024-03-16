import { Vector3 } from "three";

export const RectangleEmitter = (width: Vector3, height: Vector3, edge: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    if (edge) {
      const randomFixedEdge = Math.floor(Math.random() * 4);

      let widthFactor: number;
      let heightFactor: number;

      if (randomFixedEdge === 0) {
        widthFactor = -0.5;
        heightFactor = Math.random() - 0.5;
      } else if (randomFixedEdge === 1) {
        widthFactor = 0.5;
        heightFactor = Math.random() - 0.5;
      } else if (randomFixedEdge === 2) {
        widthFactor = Math.random() - 0.5;
        heightFactor = -0.5;
      } else {
        widthFactor = Math.random() - 0.5;
        heightFactor = 0.5;
      }

      return origin.clone().add(
        width.clone().multiplyScalar(widthFactor).add(
          height.clone().multiplyScalar(heightFactor)
        )
      );

    } else {
      const widthPart = width.clone().multiplyScalar(Math.random() - 0.5);
      const heightPart = height.clone().multiplyScalar(Math.random() - 0.5);

      return origin.clone().add(widthPart).add(heightPart);
    }
  };
}
