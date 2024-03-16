import { Vector3 } from "three";
import { CircleEmitter } from "./circleEmitter.ts";

export const CylinderEmitter = (radius: number, height: number, axis: Vector3, shell: boolean = true, closed: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {

    const normalisedAxis = axis.clone().normalize();
    const circleEdgePoint = CircleEmitter(radius, axis, true)(new Vector3());
    const circlePoint = CircleEmitter(radius, axis, false)(new Vector3());

    if (shell) {
      const isOnSide = !closed || Math.random() < (height / (height + 2 * radius));
      const _height = isOnSide ? (Math.random() - 0.5) * height : Math.random() > 0.5 ? height / 2 : -height / 2;
      const radialPoint = isOnSide ? circleEdgePoint : circlePoint;
      return origin.clone().add(radialPoint).add(normalisedAxis.multiplyScalar(_height));
    } else {
      const radialPoint = circlePoint;
      const _height = (Math.random() - 0.5) * height;
      return origin.clone().add(radialPoint).add(normalisedAxis.multiplyScalar(_height));
    }
  };
}
