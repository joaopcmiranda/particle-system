import { BoxGeometry, Color, SphereGeometry, TetrahedronGeometry, TorusGeometry, Vector3 } from "three";
import { GeometryType, ParticleParameters, ParticleRandomness } from "./types/particle.types.ts";

export const getGeometry = (() => {

  const sphereGeometry = new SphereGeometry(1, 16, 16)
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  const pyramidGeometry = new TetrahedronGeometry(1);
  const torusGeometry = new TorusGeometry(1, 1 / 3);

  return (geometry: GeometryType) => {

    switch (geometry) {
      case GeometryType.CUBE:
        return cubeGeometry;
      case GeometryType.SPHERE:
        return sphereGeometry;
      case GeometryType.TORUS:
        return torusGeometry;
      case GeometryType.PYRAMID:
        return pyramidGeometry;
      default:
        return cubeGeometry;
    }
  }
})();

export const randomizeParameters = (particleParameters: ParticleParameters, randomness: ParticleRandomness) => {
  // randomStartSizeModifier?: number;
  const startSize = randomize(particleParameters.startSize, randomness.startSize);
  // randomEndSizeModifier?: number;
  const endSize = randomize(particleParameters.endSize, randomness.endSize);
  // randomVelocityModifier?: Vector3;
  const velocity = randomize(particleParameters.velocity, randomness.velocity);
  // randomStartColor?: boolean;
  const startColor = randomness.startColor ? new Color(Math.random(), Math.random(), Math.random()) : particleParameters.startColor;
  // randomStartColor?: boolean;
  const endColor = randomness.endColor ? new Color(Math.random(), Math.random(), Math.random()) : particleParameters.endColor;
  // randomTimeToLiveModifier?: number;
  const timeToLive = randomize(particleParameters.timeToLive, randomness.timeToLive);
  // chaoticMovement?: Vector3;
  const chaoticMovement = randomness.chaoticMovement;

  return {
    ...particleParameters,
    startSize,
    endSize,
    velocity,
    startColor,
    endColor,
    timeToLive,
    chaoticMovement
  }
}

const randomize = <Input extends number | Vector3 | undefined>(input: Input, randomness: number | Vector3 | undefined): Input => {
  if (input === undefined) { return input; }
  if (!randomness || randomness === 0) { return input; }
  if (typeof input === "number" && typeof randomness === "number") {
    return <Input>(input + (Math.random() - .5) * randomness);
  } else if (input instanceof Vector3 && randomness instanceof Vector3) {
    return <Input>input.clone().add(
      new Vector3(
        (Math.random() - .5) * randomness.x,
        (Math.random() - .5) * randomness.y,
        (Math.random() - .5) * randomness.z
      )
    )
  }
  return input;
}

export const cloneParticleParameters = (particleParameters: ParticleParameters) => {
  return {
    ...particleParameters,
    position: particleParameters.position?.clone(),
    velocity: particleParameters.velocity.clone(),
    acceleration: particleParameters.acceleration.clone(),
    startColor: particleParameters.startColor.clone(),
    endColor: particleParameters.endColor?.clone(),
    chaoticMovement: particleParameters.chaoticMovement?.clone(),
  }
}
