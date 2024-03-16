import { Vector3 } from "three";
import { HemisphereEmitter } from "./hemisphereEmitter.ts";
import { CylinderEmitter } from "./cylinderEmitter.ts";

export const CapsuleEmitter = (radius: number, height: number, _axis: Vector3, shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {

    const axis = _axis.clone().normalize();

    const topCapNormal = axis.clone();
    const topCapPoint = HemisphereEmitter(radius, topCapNormal, shell)(origin.clone().add(axis.clone().multiplyScalar(height / 2)));

    const cylinderPoint = CylinderEmitter(radius, height, axis, shell, false)(origin);

    const bottomCapNormal = axis.clone().negate();
    const bottomCapPoint = HemisphereEmitter(radius, bottomCapNormal, shell)(origin.clone().add(axis.clone().multiplyScalar(-height / 2)));

    const totalHeight = height + 2 * radius;
    const randomAxisPosition = Math.random() * totalHeight;
    const isOnCylinder = randomAxisPosition > radius && randomAxisPosition < height + radius;

    return isOnCylinder ? cylinderPoint : randomAxisPosition > height + radius ? topCapPoint : bottomCapPoint;

  };
}
