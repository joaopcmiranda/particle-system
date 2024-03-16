import { Vector3 } from "three";

export const LineEmitter = (vector: Vector3, _length?: number): (origin: Vector3) => Vector3 => {
  let length = _length ?? vector.length();
  const unit = vector.clone().normalize();
  return (origin: Vector3) => {
    return origin.clone().add(unit.clone().multiplyScalar(Math.random() * length));
  };
};
