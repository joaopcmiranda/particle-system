import { Vector2, Vector3 } from "three";

export const EllipseEmitter = (dimensions: [Vector3, Vector3], edge: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randomPointOnCircle = new Vector2(Math.random() - 0.5, Math.random() - 0.5).normalize()

    const distanceToEdge = edge ? 1 : Math.sqrt(Math.random());

    const x = dimensions[0].clone().multiplyScalar(randomPointOnCircle.x);
    const y = dimensions[1].clone().multiplyScalar(randomPointOnCircle.y);

    const point = x.add(y).multiplyScalar(distanceToEdge);

    return origin.clone().add(point);
  }
}
