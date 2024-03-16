import { Particle } from "./Particle";
import { Scene } from "three";
import { ParticleParameters, ParticleRandomness } from "./types/particle.types.ts";
import { randomizeParameters } from "./util.ts";

export class ParticleManager {
  private particleCache: Particle[] = [];

  activeParticles: Particle[] = [];

  update = (delta: number, scene: Scene) => {
    this.activeParticles.forEach(particle => {
      particle.update(delta);
      if (particle.isDead) {
        this.disableParticle(particle, scene);
      }
    });
  }

  requestParticle = (_parameters: ParticleParameters, randomness: ParticleRandomness, scene?: Scene) => {

    const parameters: ParticleParameters = randomizeParameters(_parameters, randomness);

    let particle = this.particleCache.pop();

    if (particle) {
      if (particle.type !== parameters.type) {
        particle.changeGeometry(parameters.type);
      }
      particle.reset(parameters);
    } else {
      particle = new Particle(parameters.type, parameters);
    }

    particle.visible = true;
    scene?.add(particle);
    this.activeParticles.push(particle);
    return particle;
  }

  disableParticle = (particle: Particle, scene?: Scene) => {
    particle.visible = false;
    scene?.remove(particle);
    const index = this.activeParticles.indexOf(particle);
    this.activeParticles.splice(index, 1);
    this.particleCache.push(particle);
  }

  clear = () => {
    this.activeParticles.forEach(particle => {
      particle.isDead = true;
    });
  }
}
