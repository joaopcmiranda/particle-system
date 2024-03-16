import { Vector3 } from "three";

export const CircleEmitter = (radius: number, _normal: Vector3, edge: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randRadius = edge ? radius : Math.sqrt(Math.random()) * radius;
    return randomPointInCircleAtRadius(randRadius, _normal, origin);
  };
}

export const randomPointInCircleAtRadius = (radius: number, _normal: Vector3, origin: Vector3): Vector3 => {
  let normal = _normal.clone().normalize();
  if (normal.length() === 0) {
    normal = new Vector3(0, 1, 0);
  }

  const randomNormalisedPoint = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();

  randomNormalisedPoint.cross(normal).normalize();

  return origin.clone().add(randomNormalisedPoint.multiplyScalar(radius));
}
