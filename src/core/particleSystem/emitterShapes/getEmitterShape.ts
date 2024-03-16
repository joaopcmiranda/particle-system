import { EmitterConfig, EmitterShape } from "../types/emitter.types.ts";
import { Vector3 } from "three";
import { ParallelepipedeEmitter } from "./parallelepipedeEmitter.ts";
import { ConeEmitter } from "./coneEmitter.ts";
import { CapsuleEmitter } from "./capsuleEmitter.ts";
import { CylinderEmitter } from "./cylinderEmitter.ts";
import { EllipsoidEmitter } from "./ellipsoidEmitter.ts";
import { HemisphereEmitter } from "./hemisphereEmitter.ts";
import { RingEmitter } from "./ringEmitter.ts";
import { SphereEmitter } from "./sphereEmitter.ts";
import { EllipseEmitter } from "./ellipseEmitter.ts";
import { RectangleEmitter } from "./rectangleEmitter.ts";
import { LineEmitter } from "./lineEmitter.ts";
import { CircleEmitter } from "./circleEmitter.ts";


export const getEmitterShape = (emitter: EmitterConfig): (origin: Vector3) => Vector3 => {
  switch (emitter.shape) {
    case EmitterShape.POINT:
      return (origin: Vector3) => origin;
    case EmitterShape.LINE:
      return LineEmitter(emitter.vector, emitter.length);
    case EmitterShape.CIRCLE:
      return CircleEmitter(emitter.radius, emitter.normal, emitter.edge);
    case EmitterShape.SQUARE:
      return RectangleEmitter(emitter.dimensions[0], emitter.dimensions[1], emitter.edge);
    case EmitterShape.RECTANGLE:
      return RectangleEmitter(emitter.dimensions[0], emitter.dimensions[1], emitter.edge);
    case EmitterShape.ELLIPSE:
      return EllipseEmitter(emitter.dimensions, emitter.edge);
    case EmitterShape.RING:
      return RingEmitter(emitter.innerRadius, emitter.outerRadius, emitter.normal);
    case EmitterShape.SPHERE:
      return SphereEmitter(emitter.radius, emitter.shell);
    case EmitterShape.HEMISPHERE:
      return HemisphereEmitter(emitter.radius, emitter.normal, emitter.shell);
    case EmitterShape.ELLIPSOID:
      return EllipsoidEmitter(emitter.dimensions, emitter.shell);
    case EmitterShape.CYLINDER:
      return CylinderEmitter(emitter.radius, emitter.height, emitter.axis, emitter.shell,emitter.closed);
    case EmitterShape.CAPSULE:
      return CapsuleEmitter(emitter.radius, emitter.height, emitter.axis, emitter.shell);
    case EmitterShape.CONE:
      return ConeEmitter(emitter.radius, emitter.height, emitter.shell);
    case EmitterShape.PARALLELEPIPED:
      return ParallelepipedeEmitter(emitter.dimensions, emitter.shell);
    case EmitterShape.CUBE:
      return ParallelepipedeEmitter(emitter.dimensions, emitter.shell);
  }
};

