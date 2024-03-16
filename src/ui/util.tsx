import { GravityDecayFactor, Parameters } from "./ParameterPanel.tsx";
import { ParticleSystemConfig } from "../core/particleSystem/types/particle.types.ts";
import { Color, Vector3 } from "three";
import {
  EmitterShape,
  EmitterType,
  EmitterTypeBurst,
  EmitterTypeConstant,
  EmitterTypeContinuous
} from "../core/particleSystem/types/emitter.types.ts";

export const convertParametersToParticleSystemConfig = (parameters: Parameters, target?: ParticleSystemConfig): ParticleSystemConfig => {
  const gravityDecayFactor =
    parameters.gravityDecayFactor === undefined ? 0 :
    parameters.gravityDecayFactor === GravityDecayFactor.LINEAR ? 1 :
      parameters.gravityDecayFactor === GravityDecayFactor.QUADRATIC ? 2 :
        parameters.gravityDecayFactor === GravityDecayFactor.CUBIC ? 3 : 0;

  if (target) {
    target.offset = parameters.emitter.offset.clone();

    target.randomness.startSize = parameters.randomStartSizeModifier;
    target.randomness.endSize = parameters.randomEndSizeModifier;
    target.randomness.velocity = parameters.randomVelocityModifier;
    target.randomness.startColor = parameters.randomStartColor;
    target.randomness.endColor = parameters.randomEndColor;
    target.randomness.timeToLive = parameters.randomTimeToLiveModifier;
    target.randomness.chaoticMovement = parameters.chaoticMovement;

    target.particle.type = parameters.geometryType;
    target.particle.wireframe = parameters.wireframe;
    target.particle.startSize = parameters.particleStartSize;
    target.particle.endSize = parameters.particleEndSize;
    target.particle.velocity = parameters.velocity;
    target.particle.acceleration = parameters.acceleration?.clone() ?? new Vector3();
    target.particle.gravity = parameters.gravity ?? 0;
    target.particle.gravityCenter = parameters.gravityCenter?.clone() ?? new Vector3();
    target.particle.gravityDecayFactor = gravityDecayFactor;
    target.particle.friction = parameters.friction ?? 0;
    target.particle.startColor = parameters.startColor && new Color((parameters.startColor)) || new Color(0xFFFFFF);
    target.particle.endColor = parameters.endColor && new Color(parameters.endColor) || target.particle.startColor;
    target.particle.startTransparency = parameters.startTransparency ?? 100;
    target.particle.endTransparency = parameters.endTransparency;
    target.particle.timeToLive = parameters.timeToLive;
    target.particle.chaoticMovement = parameters.chaoticMovement;

    target.emitter.type = parameters.emitter.type;
    switch (parameters.emitter.type) {
      case EmitterType.CONSTANT:
        (target.emitter as EmitterTypeConstant).count = parameters.emitter.typeParameters[EmitterType.CONSTANT].count;
        break;
      case EmitterType.BURST:
        (target.emitter as EmitterTypeBurst).burstCount = parameters.emitter.typeParameters[EmitterType.BURST].burstCount;
        (target.emitter as EmitterTypeBurst).burstDelay = parameters.emitter.typeParameters[EmitterType.BURST].burstDelay;
        break;
      case EmitterType.CONTINUOUS:
        (target.emitter as EmitterTypeContinuous).emissionFrequency = parameters.emitter.typeParameters[EmitterType.CONTINUOUS].emissionFrequency;
        break;
    }
    target.emitter.shape = parameters.emitter.shape;
    if (parameters.emitter.shape === EmitterShape.LINE && target.emitter.shape === EmitterShape.LINE) {
      target.emitter.vector = parameters.emitter.shapeParameters[EmitterShape.LINE].direction;
      target.emitter.length = parameters.emitter.shapeParameters[EmitterShape.LINE].length;
    } else if (parameters.emitter.shape === EmitterShape.CIRCLE && target.emitter.shape === EmitterShape.CIRCLE) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].radius;
      target.emitter.normal = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].normal;
      target.emitter.edge = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].edge;
    } else if (parameters.emitter.shape === EmitterShape.SQUARE && target.emitter.shape === EmitterShape.SQUARE) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.SQUARE].dimensions;
      target.emitter.edge = parameters.emitter.shapeParameters[EmitterShape.SQUARE].edge;
    } else if (parameters.emitter.shape === EmitterShape.RECTANGLE && target.emitter.shape === EmitterShape.RECTANGLE) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.RECTANGLE].dimensions;
      target.emitter.edge = parameters.emitter.shapeParameters[EmitterShape.RECTANGLE].edge;
    } else if (parameters.emitter.shape === EmitterShape.ELLIPSE && target.emitter.shape === EmitterShape.ELLIPSE) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.ELLIPSE].dimensions;
      target.emitter.edge = parameters.emitter.shapeParameters[EmitterShape.ELLIPSE].edge;
    } else if (parameters.emitter.shape === EmitterShape.RING && target.emitter.shape === EmitterShape.RING) {
      target.emitter.innerRadius = parameters.emitter.shapeParameters[EmitterShape.RING].innerRadius;
      target.emitter.outerRadius = parameters.emitter.shapeParameters[EmitterShape.RING].outerRadius;
      target.emitter.normal = parameters.emitter.shapeParameters[EmitterShape.RING].normal;
    } else if (parameters.emitter.shape === EmitterShape.SPHERE && target.emitter.shape === EmitterShape.SPHERE) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.SPHERE].radius;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.SPHERE].shell;
    } else if (parameters.emitter.shape === EmitterShape.HEMISPHERE && target.emitter.shape === EmitterShape.HEMISPHERE) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].radius;
      target.emitter.normal = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].normal;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].shell;
    } else if (parameters.emitter.shape === EmitterShape.ELLIPSOID && target.emitter.shape === EmitterShape.ELLIPSOID) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.ELLIPSOID].dimensions;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.ELLIPSOID].shell;
    } else if (parameters.emitter.shape === EmitterShape.CYLINDER && target.emitter.shape === EmitterShape.CYLINDER) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].radius;
      target.emitter.height = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].height;
      target.emitter.axis = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].axis;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].shell;
      target.emitter.closed = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].closed;
    } else if (parameters.emitter.shape === EmitterShape.CAPSULE && target.emitter.shape === EmitterShape.CAPSULE) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].radius;
      target.emitter.height = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].height;
      target.emitter.axis = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].axis;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].shell;
    } else if (parameters.emitter.shape === EmitterShape.CONE && target.emitter.shape === EmitterShape.CONE) {
      target.emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CONE].radius;
      target.emitter.height = parameters.emitter.shapeParameters[EmitterShape.CONE].height;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CONE].shell;
    } else if (parameters.emitter.shape === EmitterShape.PARALLELEPIPED && target.emitter.shape === EmitterShape.PARALLELEPIPED) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.PARALLELEPIPED].shell;
    } else if (parameters.emitter.shape === EmitterShape.CUBE && target.emitter.shape === EmitterShape.CUBE) {
      target.emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.CUBE].dimensions;
      target.emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CUBE].shell;
    }
    return target

  } else {
    const obj: Omit<ParticleSystemConfig, 'emitter'> = {
      offset: parameters.emitter.offset.clone(),
      randomness: {
        startSize: parameters.randomStartSizeModifier,
        endSize: parameters.randomEndSizeModifier,
        velocity: parameters.randomVelocityModifier,
        startColor: parameters.randomStartColor,
        endColor: parameters.randomEndColor,
        timeToLive: parameters.randomTimeToLiveModifier,
        chaoticMovement: parameters.chaoticMovement
      },
      particle: {
        type: parameters.geometryType,
        wireframe: parameters.wireframe,
        startSize: parameters.particleStartSize,
        endSize: parameters.particleEndSize,
        velocity: parameters.velocity,
        acceleration: parameters.acceleration ?? new Vector3(),
        gravity: parameters.gravity ?? 0,
        gravityCenter: parameters.gravityCenter ?? new Vector3(),
        gravityDecayFactor: gravityDecayFactor,
        friction: parameters.friction ?? 0,
        startColor: parameters.startColor && new Color((parameters.startColor)) || new Color(0xFFFFFF),
        endColor: parameters.endColor && new Color(parameters.endColor) || new Color(0xFFFFFF),
        startTransparency: parameters.startTransparency ?? 100,
        endTransparency: parameters.endTransparency,
        timeToLive: parameters.timeToLive,
        chaoticMovement: parameters.chaoticMovement
      }
    }

    const emitter: any = {}
    emitter.type = parameters.emitter.type;
    switch (parameters.emitter.type) {
      case EmitterType.CONSTANT:
        (emitter as EmitterTypeConstant).count = parameters.emitter.typeParameters[EmitterType.CONSTANT].count;
        break;
      case EmitterType.BURST:
        (emitter as EmitterTypeBurst).burstCount = parameters.emitter.typeParameters[EmitterType.BURST].burstCount;
        (emitter as EmitterTypeBurst).burstDelay = parameters.emitter.typeParameters[EmitterType.BURST].burstDelay;
        break;
      case EmitterType.CONTINUOUS:
        (emitter as EmitterTypeContinuous).emissionFrequency = parameters.emitter.typeParameters[EmitterType.CONTINUOUS].emissionFrequency;
        break;
    }
    emitter.shape = parameters.emitter.shape;
    if (parameters.emitter.shape === EmitterShape.LINE && emitter.shape === EmitterShape.LINE) {
      emitter.vector = parameters.emitter.shapeParameters[EmitterShape.LINE].direction;
      emitter.length = parameters.emitter.shapeParameters[EmitterShape.LINE].length;
    } else if (parameters.emitter.shape === EmitterShape.CIRCLE && emitter.shape === EmitterShape.CIRCLE) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].radius;
      emitter.normal = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].normal;
      emitter.edge = parameters.emitter.shapeParameters[EmitterShape.CIRCLE].edge;
    } else if (parameters.emitter.shape === EmitterShape.SQUARE && emitter.shape === EmitterShape.SQUARE) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.SQUARE].dimensions;
      emitter.edge = parameters.emitter.shapeParameters[EmitterShape.SQUARE].edge;
    } else if (parameters.emitter.shape === EmitterShape.RECTANGLE && emitter.shape === EmitterShape.RECTANGLE) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.RECTANGLE].dimensions;
      emitter.edge = parameters.emitter.shapeParameters[EmitterShape.RECTANGLE].edge;
    } else if (parameters.emitter.shape === EmitterShape.ELLIPSE && emitter.shape === EmitterShape.ELLIPSE) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.ELLIPSE].dimensions;
      emitter.edge = parameters.emitter.shapeParameters[EmitterShape.ELLIPSE].edge;
    } else if (parameters.emitter.shape === EmitterShape.RING && emitter.shape === EmitterShape.RING) {
      emitter.innerRadius = parameters.emitter.shapeParameters[EmitterShape.RING].innerRadius;
      emitter.outerRadius = parameters.emitter.shapeParameters[EmitterShape.RING].outerRadius;
      emitter.normal = parameters.emitter.shapeParameters[EmitterShape.RING].normal;
    } else if (parameters.emitter.shape === EmitterShape.SPHERE && emitter.shape === EmitterShape.SPHERE) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.SPHERE].radius;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.SPHERE].shell;
    } else if (parameters.emitter.shape === EmitterShape.HEMISPHERE && emitter.shape === EmitterShape.HEMISPHERE) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].radius;
      emitter.normal = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].normal;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.HEMISPHERE].shell;
    } else if (parameters.emitter.shape === EmitterShape.ELLIPSOID && emitter.shape === EmitterShape.ELLIPSOID) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.ELLIPSOID].dimensions;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.ELLIPSOID].shell;
    } else if (parameters.emitter.shape === EmitterShape.CYLINDER && emitter.shape === EmitterShape.CYLINDER) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].radius;
      emitter.height = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].height;
      emitter.axis = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].axis;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CYLINDER].shell;
    } else if (parameters.emitter.shape === EmitterShape.CAPSULE && emitter.shape === EmitterShape.CAPSULE) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].radius;
      emitter.height = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].height;
      emitter.axis = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].axis;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CAPSULE].shell;
    } else if (parameters.emitter.shape === EmitterShape.CONE && emitter.shape === EmitterShape.CONE) {
      emitter.radius = parameters.emitter.shapeParameters[EmitterShape.CONE].radius;
      emitter.height = parameters.emitter.shapeParameters[EmitterShape.CONE].height;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CONE].shell;
    } else if (parameters.emitter.shape === EmitterShape.PARALLELEPIPED && emitter.shape === EmitterShape.PARALLELEPIPED) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.PARALLELEPIPED].shell;
    } else if (parameters.emitter.shape === EmitterShape.CUBE && emitter.shape === EmitterShape.CUBE) {
      emitter.dimensions = parameters.emitter.shapeParameters[EmitterShape.CUBE].dimensions;
      emitter.shell = parameters.emitter.shapeParameters[EmitterShape.CUBE].shell;
    }

    return {
      ...obj,
      emitter
    }
  }

}
