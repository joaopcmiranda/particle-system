import { Vector3 } from "three";

export const ParallelepipedeEmitter = (dimensions: [Vector3, Vector3, Vector3], shell: boolean = true): (origin: Vector3) => Vector3 => {
  return (origin: Vector3) => {
    if (!shell) {
      const randomFactor = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      return origin.clone().add(
        dimensions[0].clone().multiplyScalar(randomFactor.x).add(
          dimensions[1].clone().multiplyScalar(randomFactor.y).add(
            dimensions[2].clone().multiplyScalar(randomFactor.z)
          )
        )
      );
    } else {
      const randomFixedFace = Math.floor(Math.random() * 6);
      // 0: -x, 1: +x, 2: -y, 3: +y, 4: -z, 5: +z

      let x: number;
      let y: number;
      let z: number;

      if (randomFixedFace === 0) {
        x = -0.5;
        y = Math.random() - 0.5;
        z = Math.random() - 0.5;
      } else if (randomFixedFace === 1) {
        x = 0.5;
        y = Math.random() - 0.5;
        z = Math.random() - 0.5;
      } else if (randomFixedFace === 2) {
        x = Math.random() - 0.5;
        y = -0.5;
        z = Math.random() - 0.5;
      } else if (randomFixedFace === 3) {
        x = Math.random() - 0.5;
        y = 0.5;
        z = Math.random() - 0.5;
      } else if (randomFixedFace === 4) {
        x = Math.random() - 0.5;
        y = Math.random() - 0.5;
        z = -0.5;
      } else {
        x = Math.random() - 0.5;
        y = Math.random() - 0.5;
        z = 0.5;
      }

      return origin.clone().add(
        dimensions[0].clone().multiplyScalar(x).add(
          dimensions[1].clone().multiplyScalar(y).add(
            dimensions[2].clone().multiplyScalar(z)
          )
        )
      );
    }
  }
}
