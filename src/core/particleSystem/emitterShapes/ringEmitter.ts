import { Vector3 } from "three";
import { randomPointInCircleAtRadius } from "./circleEmitter.ts";

export const RingEmitter = (internalRadius: number, externalRadius: number, _normal: Vector3): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randomRadius = internalRadius + Math.sqrt(Math.random()) * (externalRadius - internalRadius);
    return randomPointInCircleAtRadius(randomRadius, _normal, origin);
  };
}
