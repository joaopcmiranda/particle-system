import { Vector3 } from "three";

export enum EmitterType {
  CONSTANT = "CONSTANT",
  BURST = "BURST",
  CONTINUOUS = "CONTINUOUS",
}

export enum EmitterShape {
  // 0D
  POINT = "POINT",
  // 1D
  LINE = "LINE",
  // 2D
  CIRCLE = "CIRCLE",
  ELLIPSE = "ELLIPSE",
  RECTANGLE = "RECTANGLE",
  SQUARE = "SQUARE",
  RING = "RING",
  // 3D
  SPHERE = "SPHERE",
  HEMISPHERE = "HEMISPHERE",
  ELLIPSOID = "ELLIPSOID",
  CYLINDER = "CYLINDER",
  CONE = "CONE",
  PARALLELEPIPED = "PARALLELEPIPED",
  CUBE = "CUBE",
  CAPSULE = "CAPSULE",
}

export type EmitterTypeConstant = {
  type: EmitterType.CONSTANT;
  count?: number;
};

export type EmitterTypeBurst = {
  type: EmitterType.BURST;
  burstCount?: number;
  burstDelay?: number;
};

export type EmitterTypeContinuous = {
  type: EmitterType.CONTINUOUS;
  emissionFrequency?: number;
};

export type EmitterShapePoint = {
  shape: EmitterShape.POINT;
};

export type EmitterShapeLine = {
  shape: EmitterShape.LINE;
  vector: Vector3;
  length?: number;
};

export type EmitterShapeCircle = {
  shape: EmitterShape.CIRCLE;
  radius: number;
  normal: Vector3;
  edge?: boolean;
};

export type EmitterShapeSquare = {
  shape: EmitterShape.SQUARE;
  dimensions: [Vector3, Vector3];
  edge?: boolean;
};

export type EmitterShapeRectangle = {
  shape: EmitterShape.RECTANGLE;
  dimensions: [Vector3, Vector3];
  edge?: boolean;
};

export type EmitterShapeEllipse = {
  shape: EmitterShape.ELLIPSE;
  dimensions: [Vector3, Vector3];
  edge?: boolean;
};

export type EmitterShapeRing = {
  shape: EmitterShape.RING;
  innerRadius: number;
  outerRadius: number;
  normal: Vector3;
};

export type EmitterShapeSphere = {
  shape: EmitterShape.SPHERE;
  radius: number;
  shell?: boolean;
};

export type EmitterShapeHemisphere = {
  shape: EmitterShape.HEMISPHERE;
  radius: number;
  normal: Vector3;
  shell?: boolean;
};

export type EmitterShapeEllipsoid = {
  shape: EmitterShape.ELLIPSOID;
  dimensions: [Vector3, Vector3, Vector3];
  shell?: boolean;
};

export type EmitterShapeCylinder = {
  shape: EmitterShape.CYLINDER;
  radius: number;
  height: number;
  axis: Vector3;
  shell?: boolean;
  closed?: boolean;
};

export type EmitterShapeCapsule = {
  shape: EmitterShape.CAPSULE;
  radius: number;
  height: number;
  axis: Vector3;
  shell?: boolean;
};

export type EmitterShapeCone = {
  shape: EmitterShape.CONE;
  radius: number;
  height: Vector3;
  shell?: boolean;
};

export type EmitterShapeParallelepiped = {
  shape: EmitterShape.PARALLELEPIPED;
  dimensions: [Vector3, Vector3, Vector3];
  shell?: boolean;
};

export type EmitterShapeCube = {
  shape: EmitterShape.CUBE;
  dimensions: [Vector3, Vector3, Vector3];
  shell?: boolean;
};

export type EmitterConfig = (
  EmitterTypeConstant |
  EmitterTypeBurst |
  EmitterTypeContinuous
  ) & (
  EmitterShapePoint |
  EmitterShapeLine |
  EmitterShapeCircle |
  EmitterShapeSquare |
  EmitterShapeRectangle |
  EmitterShapeEllipse |
  EmitterShapeRing |
  EmitterShapeSphere |
  EmitterShapeHemisphere |
  EmitterShapeEllipsoid |
  EmitterShapeCylinder |
  EmitterShapeCapsule |
  EmitterShapeCone |
  EmitterShapeParallelepiped |
  EmitterShapeCube
  );
