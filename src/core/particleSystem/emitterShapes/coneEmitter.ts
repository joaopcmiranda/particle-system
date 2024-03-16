import { Vector3 } from "three";
import { CircleEmitter } from "./circleEmitter.ts";

export const ConeEmitter = (radius: number, height: Vector3, shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const circlePoint = CircleEmitter(radius, height, false)(new Vector3());
    if (shell) {
      const distanceToCenter = circlePoint.distanceTo(new Vector3());
      const ratio = 1 - (distanceToCenter / radius);
      const shellHeight = height.length() * ratio;
      const heightVector = height.clone().normalize().multiplyScalar(shellHeight);
      return origin.clone().add(circlePoint).add(heightVector);
    } else {
      const distanceToCenter = circlePoint.distanceTo(new Vector3());
      const ratio = 1-(distanceToCenter / radius);
      const maxHeight = height.length() * ratio;
      const randomHeight = Math.random() * maxHeight;
      const randomHeightVector = height.clone().normalize().multiplyScalar(randomHeight);
      return origin.clone().add(circlePoint).add(randomHeightVector);
    }
  };
}
