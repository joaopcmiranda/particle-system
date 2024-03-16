import { Box3, BufferGeometry, Color, Euler, Matrix4, Mesh, MeshBasicMaterial, Vector3 } from "three";

import { GeometryType, ParticleParameters } from "./types/particle.types.ts";
import { cloneParticleParameters, getGeometry } from "./util";

export class Particle extends Mesh<BufferGeometry, MeshBasicMaterial> {
  type: GeometryType;

  private velocity: Vector3 = new Vector3();
  private acceleration: Vector3 = new Vector3();
  private gravity: number = 0;
  private gravityCenter: Vector3 = new Vector3();
  private gravityDecayFactor: number = 0;
  private friction: number = 0;
  private chaoticMovement: Vector3 = new Vector3();

  private startSize: number = 1;
  private size: number = 1;
  private endSize: number = 1;
  private variableSize: boolean = false;

  private startColor: Color = new Color(1, 1, 1);
  private endColor: Color = this.startColor.clone();
  private variableColor: boolean = false;
  private startTransparency: number = 100;
  private endTransparency: number = 100;

  private createdOn: number = Date.now();
  private timeToLive: number = 1000;
  isDead: boolean = false;

  private resetParameters: ParticleParameters;
  private resetTransform: {
    scale: Vector3;
    position: Vector3;
    rotation: Euler;
  }

  constructor(geometryType: GeometryType, params: Partial<ParticleParameters> = {}) {
    super(getGeometry(geometryType), new MeshBasicMaterial());

    this.type = geometryType;

    const defaults: ParticleParameters = {
      type: GeometryType.CUBE,
      position: new Vector3(),
      velocity: new Vector3(),
      acceleration: new Vector3(),
      gravity: 0,
      gravityCenter: new Vector3(),
      gravityDecayFactor: 0,
      friction: 0,
      wireframe: false,
      startColor: new Color(1, 1, 1),
      startTransparency: 1,
      startSize: 1,
      timeToLive: 1000,
      chaoticMovement: new Vector3()
    }

    const parameters: ParticleParameters = { ...defaults, ...params };

    this.resetParameters = cloneParticleParameters(parameters) ?? {};
    this.resetTransform = {
      scale: this.scale.clone(),
      position: this.position.clone(),
      rotation: this.rotation.clone()
    }


    this.setParameters(parameters);
  }


  private setParameters(parameters: ParticleParameters) {
    this.setPhysicsParameters(
      parameters.friction,
      parameters.acceleration,
      parameters.velocity,
      parameters.position,
      parameters.chaoticMovement,
      parameters.gravity,
      parameters.gravityCenter,
      parameters.gravityDecayFactor
    );
    this.setColorParameters(parameters.startColor, parameters.endColor);
    this.setSizeParameters(parameters.startSize, parameters.endSize);
    this.setTransparencyParameters(parameters.startTransparency, parameters.endTransparency);
    this.setOtherParameters(parameters.timeToLive, parameters.wireframe);
  }

  private setPhysicsParameters(
    friction: number | undefined,
    acceleration: Vector3 | undefined,
    velocity: Vector3 | undefined,
    position: Vector3 | undefined,
    chaoticMovement: Vector3 | undefined,
    gravity: number | undefined,
    gravityCenter: Vector3 | undefined,
    gravityDecayFactor: number
  ) {
    this.friction = friction ?? 0;
    position && this.position.copy(position);
    velocity && this.velocity.copy(velocity);
    acceleration && this.acceleration.copy(acceleration).multiplyScalar(.001);
    chaoticMovement && this.chaoticMovement.copy(chaoticMovement);
    this.gravity = gravity ?? 0;
    gravityCenter && this.gravityCenter.copy(gravityCenter);
    this.gravityDecayFactor = gravityDecayFactor ?? 0;
  }

  private setColorParameters(startColor: Color | undefined, endColor: Color | undefined) {
    if (startColor) {
      this.material.color = startColor;
      this.startColor = startColor;
      this.endColor = endColor || startColor;
      this.variableColor = this.startColor.getHex() !== this.endColor?.getHex();
    }
  }

  private setSizeParameters(startSize: number | undefined, endSize: number | undefined) {
    this.size = 1;
    this.startSize = startSize ?? 1;
    this.endSize = endSize ?? startSize ?? 1;

    this.variableSize = !!(this.startSize && this.endSize && this.startSize !== this.endSize);
    this.resize(this.startSize);
  }

  private setTransparencyParameters(startTransparency: number | undefined, endTransparency: number | undefined) {
    this.material.transparent = !!startTransparency;
    this.material.opacity = startTransparency ?? 1;
    this.startTransparency = startTransparency ?? 100;
    this.endTransparency = endTransparency ?? startTransparency ?? 1;
  }

  private setOtherParameters(timeToLive: number | undefined, wireframe: boolean | undefined) {
    timeToLive && (this.timeToLive = timeToLive);
    this.material.wireframe = !!wireframe;
  }

  reset(newParameters?: ParticleParameters) {

    const parameters = Object.assign({}, this.resetParameters, newParameters);

    this.resetParameters = cloneParticleParameters(parameters) ?? {};

    this.scale.copy(this.resetTransform.scale);
    this.position.copy(this.resetTransform.position);
    this.rotation.copy(this.resetTransform.rotation);

    this.setParameters(parameters);

    this.isDead = false;
    this.createdOn = Date.now();
  }

  changeGeometry(type: GeometryType) {
    if (type !== this.type) {
      this.type = type;
    }
    this.geometry = getGeometry(this.type);
  }

  resize(newSize: number = 1) {
    const currentSize = this.size;
    if (newSize === currentSize) return;

    const boundingBox = new Box3().setFromObject(this);
    const center = new Vector3();
    boundingBox.getCenter(center);
    this.applyMatrix4(new Matrix4().makeTranslation(-center.x, -center.y, -center.z))

    const matrix = new Matrix4().makeScale(newSize / currentSize, newSize / currentSize, newSize / currentSize);
    this.size = newSize;
    this.applyMatrix4(matrix);

    this.applyMatrix4(new Matrix4().makeTranslation(center.x, center.y, center.z));
  }


  update(delta: number) {
    // Movement
    this.position.add(this.velocity.clone().multiplyScalar(delta));

    const friction = this.velocity.clone().multiplyScalar(this.friction * delta);
    this.velocity.sub(friction);

    this.velocity.add(this.acceleration.clone().multiplyScalar(delta));

    if (this.chaoticMovement.length() > 0) {
      const chaoticMovement = this.chaoticMovement.clone().multiply(new Vector3(
        (Math.random() - .5),
        (Math.random() - .5),
        (Math.random() - .5)
      )).multiplyScalar(delta);
      this.velocity.add(chaoticMovement);
    }

    // Gravity
    if (this.gravity !== 0) {
      const vectorToGravityCenter = this.gravityCenter.clone().sub(this.position)
      const distanceToGravityCenter = vectorToGravityCenter.length();
      const directionToGravityCenter = vectorToGravityCenter.normalize();
      const decayFactor = Math.pow(distanceToGravityCenter, this.gravityDecayFactor);
      const gravityForce = this.gravity / decayFactor;
      this.velocity.add(directionToGravityCenter.multiplyScalar(gravityForce * delta));
    }

    // Variable proprieties
    const lifePercentage = (Date.now() - this.createdOn) / this.timeToLive;

    if (this.variableColor) {
      this.material.color = this
        .startColor
        .clone()
        .lerp(this.endColor, lifePercentage);
    }

    this.material.opacity = (this.startTransparency + (this.endTransparency - this.startTransparency) * lifePercentage) / 100;

    if (this.variableSize) {
      this.resize(this.startSize + (this.endSize - this.startSize) * lifePercentage);
    }

    // Dead check
    if (this.timeToLive && Date.now() - this.createdOn > this.timeToLive) {
      this.isDead = true;
    }
  }

}

