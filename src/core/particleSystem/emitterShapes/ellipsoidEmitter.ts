import { Vector3 } from "three";

export const EllipsoidEmitter = (dimensions: [Vector3, Vector3, Vector3], shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    const randomPointOnCircle = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()

    const distanceToEdge = shell ? 1 : Math.pow(Math.random(), 1 / 3);

    const x = dimensions[0].clone().multiplyScalar(randomPointOnCircle.x);
    const y = dimensions[1].clone().multiplyScalar(randomPointOnCircle.y);
    const z = dimensions[2].clone().multiplyScalar(randomPointOnCircle.z);

    const point = x.add(y).add(z).multiplyScalar(distanceToEdge);

    return origin.clone().add(point);
  }
}
