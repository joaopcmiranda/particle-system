import { ParticleSystemConfig } from "./types/particle.types.ts";
import { Scene, Vector3 } from "three";
import { ParticleManager } from "./ParticleManager.ts";
import { Particle } from "./Particle.ts";
import { getEmitterShape } from "./emitterShapes/getEmitterShape.ts";

export class Emitter {

  origin: Vector3;
  pm: ParticleManager;

  constructor(origin: Vector3, pm: ParticleManager) {
    this.origin = origin;
    this.pm = pm;
  }

  timeSinceLastEmission: number = 0;

  update = (delta: number, scene: Scene, {
    emitter,
    offset,
    particle: _particle,
    randomness
  }: ParticleSystemConfig) => {
    const nextPosition = getEmitterShape(emitter);
    this.timeSinceLastEmission += delta;
    const shiftedOrigin = this.origin.clone().add(offset);

    const particlesToEmit: Particle[] = [];
    switch (emitter.type) {
      case "CONTINUOUS":
        const delay = (1 / (emitter.emissionFrequency || 1))
        while (this.timeSinceLastEmission > delay) {
          this.timeSinceLastEmission -= delay;
          const particle = { ..._particle, position: nextPosition(shiftedOrigin) };
          particlesToEmit.push(this.pm.requestParticle(particle, randomness));

        }
        break;
      case "BURST":
        while (this.timeSinceLastEmission > (emitter.burstDelay ?? Infinity)) {
          this.timeSinceLastEmission -= emitter.burstDelay ?? 0;

          for (let i = 0; i < (emitter.burstCount ?? 0); i++) {

            const particle = { ..._particle, position: nextPosition(shiftedOrigin) };
            particlesToEmit.push(this.pm.requestParticle(particle, randomness));

          }
        }
        break;
      case "CONSTANT":
        while ((this.pm.activeParticles.length + particlesToEmit.length) < (emitter.count ?? 0)) {
          this.timeSinceLastEmission = 0;

          const particle = { ..._particle, position: nextPosition(shiftedOrigin) };
          particlesToEmit.push(this.pm.requestParticle(particle, randomness));

        }
        break;
    }

    if (particlesToEmit.length) {
      scene.add(...particlesToEmit);
    }

  }
}
