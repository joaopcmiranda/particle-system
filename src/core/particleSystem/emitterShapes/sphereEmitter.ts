import { Vector3 } from "three";

export const SphereEmitter = (radius: number, shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randomNormalisedPoint = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    const randRadius = shell ? radius : Math.pow(Math.random(), 1 / 3) * radius;
    return origin.clone().add(randomNormalisedPoint.multiplyScalar(randRadius));
  };
}
