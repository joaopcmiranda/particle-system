import { Vector3 } from "three";

export const HemisphereEmitter = (radius: number, _normal: Vector3, shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randomNormalisedPoint = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();

    let normal = _normal.clone().normalize();
    if (normal.length() === 0) {
      normal = new Vector3(0, 1, 0);
    }
    randomNormalisedPoint.add(normal).normalize();

    const randRadius = shell ? radius : Math.pow(Math.random(), 1 / 3) * radius;
    return origin.clone().add(randomNormalisedPoint.multiplyScalar(randRadius));
  };
}
