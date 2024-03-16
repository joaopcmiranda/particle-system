import { ParticleManager } from "./ParticleManager.ts";
import { Scene, Vector3 } from "three";
import { ParticleSystemConfig } from "./types/particle.types.ts";
import { Emitter } from "./Emitter.ts";

export class ParticleSystem {

  pm: ParticleManager
  emitter: Emitter
  config: ParticleSystemConfig;

  constructor(origin: Vector3, config: ParticleSystemConfig) {
    this.config = config;
    this.pm = new ParticleManager();
    this.emitter = new Emitter(origin.clone(), this.pm);
  }

  update = (delta: number, scene: Scene) => {
    this.emitter.update(delta, scene, this.config);
    this.pm.update(delta, scene);
  }

  clear = () => {
    this.pm.clear();
  }
}

