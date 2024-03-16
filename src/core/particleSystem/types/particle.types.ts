import { Color, Vector3 } from "three";
import { EmitterConfig } from "./emitter.types.ts";

export enum GeometryType {
  CUBE = "CUBE",
  SPHERE = "SPHERE",
  TORUS = "TORUS",
  PYRAMID = "PYRAMID",
}


export type ParticleSystemConfig = {
  particle: ParticleParameters;
  randomness: ParticleRandomness;
  offset: Vector3;
  emitter: EmitterConfig;
};

export type ParticleParameters = {
  type: GeometryType;
  wireframe: boolean;

  startSize: number;
  endSize?: number;

  position?: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  friction: number;
  gravity: number;
  gravityCenter: Vector3;
  gravityDecayFactor: number;

  startColor: Color;
  endColor?: Color;

  startTransparency: number;
  endTransparency?: number;

  timeToLive: number;

  chaoticMovement?: Vector3;
};

export type ParticleRandomness = {
  startSize?: number;
  endSize?: number;
  velocity?: Vector3;
  startColor?: boolean;
  endColor?: boolean;
  timeToLive?: number;
  chaoticMovement?: Vector3;
};
