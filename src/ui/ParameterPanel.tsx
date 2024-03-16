import React, { useCallback, useState } from "react";
import _ from 'lodash';
import { LogarithmicRange } from "./components/LogarithmicRange.tsx";
import { Range } from "./components/Range.tsx";
import { Select } from "./components/Select.tsx";
import { Vector3 } from "three";
import { Optional } from "./components/Optional.tsx";
import { Checkbox } from "./components/Checkbox.tsx";
import { Numeric } from "./components/Numeric.tsx";
import { Vector3Input } from "./components/Vector3Input.tsx";
import styles from "../style.module.scss";
import { GeometryType } from "../core/particleSystem/types/particle.types.ts";
import { EmitterParameterPanel, EmitterParameters } from "./EmitterParameterPanel.tsx";
import { EmitterShape, EmitterType } from "../core/particleSystem/types/emitter.types.ts";

export const limits = {
  particleSize: { min: 0.01, max: 1 },
  timeToLive: { min: 100, max: 100000 },
  transparency: { min: 0, max: 100 },
  emitter: {
    emissionFrequency: { min: 1, max: 2000 },
    burstDelay: { min: 0.01, max: 10 }
  }
}

export enum GravityDecayFactor {
  NONE ,
  LINEAR ,
  QUADRATIC ,
  CUBIC
}

export type Parameters = {
  // Simulation
  paused: boolean;
  wireframe: boolean;

  // Particle
  geometryType: GeometryType;

  particleStartSize: number;
  randomStartSizeModifier?: number;
  particleEndSize?: number;
  randomEndSizeModifier?: number;

  timeToLive: number;
  randomTimeToLiveModifier?: number;

  randomStartColor: boolean;
  startColor?: string;
  randomEndColor: boolean;
  endColor?: string;

  startTransparency?: number;
  endTransparency?: number;

  // Movement
  velocity: Vector3;
  randomVelocityModifier?: Vector3;
  acceleration?: Vector3;
  gravity?: number;
  gravityCenter?: Vector3;
  gravityDecayFactor?: GravityDecayFactor;
  friction?: number;
  chaoticMovement: Vector3;

  // Emitter
  emitter: EmitterParameters;

}

export const ParameterPanel = ({ initialParameters, onUpdateParameters: _onUpdateParameters, onClear }: {
  initialParameters: Parameters,
  onUpdateParameters: (newParams: Parameters) => void,
  onClear: () => void
}) => {
  const [parameters, setParameters] = useState<Parameters>(initialParameters);
  const [preset, setPreset] = useState<keyof typeof presets>("Custom");
  const onUpdateParameters = useCallback((newParams: Parameters, isPreset: boolean = false) => {
    if(!isPreset) setPreset("Custom")
    setParameters(newParams);
    _onUpdateParameters(newParams);
  }, [_onUpdateParameters]);

  const debouncedOnUpdateParameters = useCallback(_.debounce(onUpdateParameters, 500), [onUpdateParameters]);

  return (
    <div className={styles.parameterPanel}>
      <button onClick={onClear}>Clear Particles</button>
      <br />
      <Checkbox
        label="Paused"
        value={parameters.paused}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, paused: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
      />
      <Select
        label="Preset"
        options={(Object.keys(presets).map((key) => ({ value: key, label: key })))}
        value={preset}
        onChange={(value) => {
          setPreset(value)
          const newParams = presets[value]
          setParameters(newParams);
          onUpdateParameters(newParams, true);
        }}
      />
      <h4>Emitter</h4>
      <EmitterParameterPanel
        emitterParams={parameters.emitter}
        onUpdateEmitterParams={
          (newEmitterParams) => {
            const newParams: Parameters = { ...parameters, emitter: newEmitterParams }
            setParameters(newParams);
            onUpdateParameters(newParams)
          }
        }
      />
      <h4>Particle</h4>
      <Select
        label="Geometry"
        options={
          Object.keys(GeometryType).map((key) => {
            return { value: key, label: key }
          })
        }
        value={parameters.geometryType}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, geometryType: value as GeometryType }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        isTabbed={true}
      />
      <br/>
      <Checkbox
        label="Wireframe"
        value={parameters.wireframe}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, wireframe: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <LogarithmicRange
        label="Size"
        min={limits.particleSize.min}
        max={limits.particleSize.max}
        scale={1000}
        precision={4}
        value={parameters.particleStartSize}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, particleStartSize: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
      />
      <br />
      <Optional
        label={"Random Size Modifier"}
        value={parameters.randomStartSizeModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomStartSizeModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )}
      />
      <br />
      <Optional
        label={"End Size"}
        value={parameters.particleEndSize}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, particleEndSize: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <Optional
        label={"Random End Size Modifier"}
        value={parameters.randomEndSizeModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomEndSizeModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <LogarithmicRange
        label="Time to Live"
        min={limits.timeToLive.min}
        max={limits.timeToLive.max}
        scale={1000}
        value={parameters.timeToLive}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, timeToLive: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Random Time to Live Modifier"}
        value={parameters.randomTimeToLiveModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomTimeToLiveModifier: value }
          setParameters(newParams);
          debouncedOnUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <Checkbox
        label="Random Start Color"
        value={parameters.randomStartColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomStartColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      {!parameters.randomStartColor && <>
          <Optional
              label={"Start Color"}
              value={parameters.startColor}
              onChange={(value) => {
                const newParams: Parameters = { ...parameters, startColor: value }
                setParameters(newParams);
                onUpdateParameters(newParams)
              }}
              content={(value, onChange) => (
                <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
              )} />
          <br />
      </>}
      <Optional
        label={"End Color"}
        value={parameters.endColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, endColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
        )} />
      <Checkbox
        label="Random End Color"
        value={parameters.randomEndColor}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomEndColor: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Start Transparency"}
        value={parameters.startTransparency}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, startTransparency: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Range
            min={limits.transparency.min}
            max={limits.transparency.max}
            value={value}
            onChange={onChange}
          />
        )} />
      <br />
      <Optional
        label={"End Transparency"}
        value={parameters.endTransparency}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, endTransparency: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Range
            min={limits.transparency.min}
            max={limits.transparency.max}
            value={value}
            onChange={onChange}
          />
        )} />
      <h4>Movement</h4>
      <Vector3Input
        label="Initial Velocity"
        value={parameters.velocity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, velocity: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Random Initial Velocity Modifier"}
        value={parameters.randomVelocityModifier}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, randomVelocityModifier: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Vector3Input value={value} onChange={onChange} />
        )} />
      <br />
      <Vector3Input
        label="Chaotic Movement"
        value={parameters.chaoticMovement}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, chaoticMovement: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }} />
      <br />
      <Optional
        label={"Friction"}
        value={parameters.friction}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, friction: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />
      <h4>Gravity</h4>
      <Optional
        label={"Gravity (to a point)"}
        value={parameters.gravity}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, gravity: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Numeric value={value} onChange={onChange} />
        )} />
      <br />{
      !!parameters.gravity && <>
            <Vector3Input
                label="Gravity center"
                value={parameters.gravityCenter ?? new Vector3(0, 0, 0)}
                onChange={(value) => {
                  const newParams: Parameters = { ...parameters, gravityCenter: value }
                  setParameters(newParams);
                  onUpdateParameters(newParams)
                }} />
            <br />
            <Select
                label="Gravity decay factor"
                options={
                  Object.keys(GravityDecayFactor).filter((key)=> isNaN(Number(key))).map((key) => {
                    return { value: key, label: key }
                  })
                }
                value={parameters.gravityDecayFactor}
                onChange={(value) => {
                  const newParams: Parameters = { ...parameters, gravityDecayFactor: GravityDecayFactor[value] as unknown as GravityDecayFactor }
                  setParameters(newParams);
                  onUpdateParameters(newParams)
                }}
                isTabbed={true}
            />
            <br />
        </>
    }
      <Optional
        label={"Global gravity (homogeneous field)"}
        value={parameters.acceleration}
        onChange={(value) => {
          const newParams: Parameters = { ...parameters, acceleration: value }
          setParameters(newParams);
          onUpdateParameters(newParams)
        }}
        content={(value, onChange) => (
          <Vector3Input value={value} onChange={onChange} />
        )} />
      <br />
    </div>
  )
}


export const parametersDefaults: Parameters = {
  // Simulation
  paused: false,
  wireframe: false,

  // Particle
  geometryType: GeometryType.CUBE,
  particleStartSize: 0.1,
  randomStartSizeModifier: 0,
  particleEndSize: undefined,
  randomEndSizeModifier: 0,
  timeToLive: 300,
  randomTimeToLiveModifier: 0,
  randomStartColor: false,
  startColor: "#ffffff",
  randomEndColor: false,
  endColor: undefined,
  startTransparency: 100,
  endTransparency: 100,

  // Movement
  velocity: new Vector3(0, 0, 0),
  randomVelocityModifier: new Vector3(0, 0, 0),
  friction: 0,
  acceleration: new Vector3(0, 0, 0),
  chaoticMovement: new Vector3(0, 0, 0),
  gravity: 0,
  gravityDecayFactor: GravityDecayFactor.NONE,
  gravityCenter: new Vector3(0, 0, 0),

  // Emitter
  emitter: {
    offset: new Vector3(0, 0, 0),

    type: EmitterType.CONSTANT,
    typeParameters: {
      [EmitterType.CONSTANT]: {
        count: 500
      },
      [EmitterType.BURST]: {
        burstCount: 100,
        burstDelay: 1
      },
      [EmitterType.CONTINUOUS]: {
        emissionFrequency: 100
      }
    },

    shape: EmitterShape.CAPSULE,
    shapeParameters: {
      [EmitterShape.POINT]: {},
      [EmitterShape.LINE]: {
        direction: new Vector3(1, 0, 0),
        length: 10
      },
      [EmitterShape.CIRCLE]: {
        radius: 10,
        normal: new Vector3(0, 1, 0),
        edge: true
      },
      [EmitterShape.SQUARE]: {
        dimensions: [new Vector3(10, 0, 0), new Vector3(0, 10, 0)],
        edge: true
      },
      [EmitterShape.RECTANGLE]: {
        dimensions: [new Vector3(10, 0, 0), new Vector3(0, 20, 0)],
        edge: true
      },
      [EmitterShape.ELLIPSE]: {
        dimensions: [new Vector3(10, 10, 10), new Vector3(10, 0, -4)],
        edge: true
      },
      [EmitterShape.RING]: {
        innerRadius: 4,
        outerRadius: 6,
        normal: new Vector3(0, 0, 1)
      },
      [EmitterShape.SPHERE]: {
        radius: 10,
        shell: true
      },
      [EmitterShape.HEMISPHERE]: {
        radius: 10,
        normal: new Vector3(0, 1, 0),
        shell: true
      },
      [EmitterShape.ELLIPSOID]: {
        dimensions: [new Vector3(10, 10, 10), new Vector3(0, 20, 0), new Vector3(0, 0, 30)],
        shell: true
      },
      [EmitterShape.CYLINDER]: {
        radius: 10,
        height: 50,
        axis: new Vector3(0, 1, 0),
        shell: true,
        closed: true
      },
      [EmitterShape.CONE]: {
        radius: 10,
        height: new Vector3(0, 10, 0),
        shell: true
      },
      [EmitterShape.PARALLELEPIPED]: {
        dimensions: [new Vector3(40, 0, 0), new Vector3(0, 10, 0), new Vector3(0, 0, 10)],
        shell: true
      },
      [EmitterShape.CUBE]: {
        dimensions: [new Vector3(10, 0, 0), new Vector3(0, 10, 0), new Vector3(0, 0, 10)],
        shell: true
      },
      [EmitterShape.CAPSULE]: {
        radius: 10,
        height: 10,
        axis: new Vector3(0, 1, 0),
        shell: true
      }
    }
  }
};

export const presets: { [key: string]: Parameters } = {
  "Custom": parametersDefaults,
  "Single Particle": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONSTANT,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONSTANT]: {
          count: 1
        }
      },
      shape: EmitterShape.POINT
    },
    geometryType: GeometryType.TORUS,
    particleStartSize: 1,
    randomStartSizeModifier: 0.5,
    particleEndSize: 1,
    randomEndSizeModifier: 0.5,
    timeToLive: 5000,
    startColor: "#ffffff",
    endColor: "#ff0000",
    wireframe: true
  },
  "Fountain": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONTINUOUS,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONTINUOUS]: {
          emissionFrequency: 325
        }
      },
      shape: EmitterShape.POINT
    },
    geometryType: GeometryType.CUBE,
    particleStartSize: 0.03,
    timeToLive: 3000,
    randomTimeToLiveModifier: 1000,
    startColor: "#00FFFF",
    endColor: "#00FFFF",
    startTransparency: 88,
    endTransparency: 74,
    velocity: new Vector3(0, 10, 0),
    randomVelocityModifier: new Vector3(8, 3, 0),
    chaoticMovement: new Vector3(1, 1, 1),
    friction: 1,
    acceleration: new Vector3(0, -4000, 0)
  },
  "Emitter Shape": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONSTANT,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONSTANT]: {
          count: 4000
        }
      },
      shape: EmitterShape.POINT
    },
    geometryType: GeometryType.CUBE,
    particleStartSize: 0.1,
    timeToLive: 500,
    startColor: "#ffffff",
    startTransparency: 100,
  },
  "Smoke Chimney": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.BURST,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.BURST]: {
          burstCount: 10,
          burstDelay: 0.06
        }
      },
      shape: EmitterShape.CIRCLE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.CIRCLE]: {
          radius: 0.5,
          normal: new Vector3(0, 1, 0),
          edge: false
        }
      },
      offset: new Vector3(0, -3, 0)
    },
    geometryType: GeometryType.SPHERE,
    particleStartSize: 0.1,
    randomStartSizeModifier: 0.05,
    particleEndSize: 0.1,
    randomEndSizeModifier: 0.05,
    timeToLive: 2000,
    startColor: "#808080",
    endColor: "#A9A9A9",
    startTransparency: 50,
    endTransparency: 0,
    velocity: new Vector3(0, 4, 0),
    randomVelocityModifier: new Vector3(2, 5, 3),
    chaoticMovement: new Vector3(2, 2, 2),
    friction: 1,
    acceleration: new Vector3(0, 2000, 0)
  },
  "Smoke Exhaust": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.BURST,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.BURST]: {
          burstCount: 10,
          burstDelay: 0.06
        }
      },
      shape: EmitterShape.CIRCLE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.CIRCLE]: {
          radius: 0.5,
          normal: new Vector3(1, 0, 0),
          edge: false
        }
      },
      offset: new Vector3(-5, 0, 0)
    },
    geometryType: GeometryType.SPHERE,
    particleStartSize: 0.1,
    randomStartSizeModifier: 0.05,
    particleEndSize: 0.1,
    randomEndSizeModifier: 0.05,
    timeToLive: 2000,
    startColor: "#808080",
    endColor: "#A9A9A9",
    startTransparency: 50,
    endTransparency: 0,
    velocity: new Vector3(10, 0, 0),
    randomVelocityModifier: new Vector3(5, 2, 3),
    chaoticMovement: new Vector3(2, 2, 2),
    friction: 1,
    acceleration: new Vector3(0, 2000, 0)
  },
  "Rain": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONTINUOUS,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONTINUOUS]: {
          emissionFrequency: 300
        }
      },
      shape: EmitterShape.CIRCLE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.CIRCLE]: {
          radius: 10,
          normal: new Vector3(0, 1, 0),
          edge: false
        }
      },
      offset: new Vector3(0, 10, 0)
    },
    geometryType: GeometryType.PYRAMID,
    particleStartSize: 0.015,
    randomStartSizeModifier: 0.001,
    timeToLive: 3000,
    randomTimeToLiveModifier: 1000,
    startColor: "#D3D3D3",
    startTransparency: 90,
    endTransparency: 60,
    velocity: new Vector3(-5, -15, 0),
    randomVelocityModifier: new Vector3(0, 5, 0),
    friction: 0.5,
    acceleration: new Vector3(0, -1000, 0)
  },
  "Snow": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONTINUOUS,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONTINUOUS]: {
          emissionFrequency: 124
        }
      },
      shape: EmitterShape.CIRCLE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.CIRCLE]: {
          radius: 10,
          normal: new Vector3(0, 1, 0),
          edge: false
        }
      },
      offset: new Vector3(0, 10, 0)
    },
    geometryType: GeometryType.SPHERE,
    particleStartSize: 0.02,
    randomStartSizeModifier: 0.005,
    timeToLive: 7000,
    randomTimeToLiveModifier: 1000,
    startColor: "#D3D3D3",
    startTransparency: 100,
    endTransparency: 37,
    randomVelocityModifier: new Vector3(0, -8, 0),
    chaoticMovement: new Vector3(4, 2, 4),
    friction: 1,
    acceleration: new Vector3(0, -2000, 0)
  },
  "Hyperspeed": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONTINUOUS,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONTINUOUS]: {
          emissionFrequency: 100
        }
      },
      shape: EmitterShape.RING,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.RING]: {
          innerRadius: 1,
          outerRadius: 5,
          normal: new Vector3(0, 0, 1)
        }
      },
      offset: new Vector3(0, 0, -40)
    },
    geometryType: GeometryType.PYRAMID,
    particleStartSize: 0.1,
    timeToLive: 3000,
    startColor: "#ffffff",
    startTransparency: 10,
    endTransparency: 100,
    velocity: new Vector3(0, 0, 20),
    gravity: -900,
    gravityDecayFactor: GravityDecayFactor.CUBIC,
    gravityCenter: new Vector3(0, 0, -41),
  },
  "Explosion": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.BURST,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.BURST]: {
          burstCount: 1000,
          burstDelay: 3
        }
      },
      shape: EmitterShape.SPHERE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.SPHERE]: {
          radius: 1,
          shell: true
        }
      }
    },
    geometryType: GeometryType.PYRAMID,
    particleStartSize: 0.2,
    particleEndSize: 0.3,
    timeToLive: 5000,
    startColor: "#ff0000",
    endColor: "#ffffff",
    startTransparency: 100,
    endTransparency: 0,
    randomVelocityModifier: new Vector3(0.5, 0.5, 0.5),
    chaoticMovement: new Vector3(3, 3, 3),
    gravity: -1000,
    gravityDecayFactor: GravityDecayFactor.CUBIC
  },
  "Fireworks": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.BURST]: {
          burstCount: 600,
          burstDelay: 5
        }
      },
      shape: EmitterShape.SPHERE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.SPHERE]: {
          radius: 1,
          shell: true
        }
      }
    },
    geometryType: GeometryType.SPHERE,
    particleStartSize: 0.3,
    timeToLive: 5000,
    startColor: "#00FFFF",
    endColor: "#4169E1",
    startTransparency: 100,
    endTransparency: 40,
    randomVelocityModifier: new Vector3(2, 2, 2),
    chaoticMovement: new Vector3(3, 3, 3),
    friction: 1,
    gravity: -900,
    gravityDecayFactor: GravityDecayFactor.CUBIC,
    acceleration: new Vector3(0, -1000, 0)
  },
  "Dancing Ribbon": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONSTANT,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONSTANT]: {
          count: 6000
        }
      },
      shape: EmitterShape.CIRCLE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.CIRCLE]: {
          radius: 10,
          normal: new Vector3(0, 1, 0),
          edge: true
        }
      }
    },
    geometryType: GeometryType.CUBE,
    particleStartSize: 0.15,
    timeToLive: 100000,
    startColor: "#ffffff",
    startTransparency: 50,
    velocity: new Vector3(9, 9, 9),
    gravity: 10,
    gravityDecayFactor: GravityDecayFactor.NONE
  },
  "Night Sky": {
    ...parametersDefaults,
    emitter: {
      ...parametersDefaults.emitter,
      type: EmitterType.CONSTANT,
      typeParameters: {
        ...parametersDefaults.emitter.typeParameters,
        [EmitterType.CONSTANT]: {
          count: 3000
        }
      },
      shape: EmitterShape.SPHERE,
      shapeParameters: {
        ...parametersDefaults.emitter.shapeParameters,
        [EmitterShape.SPHERE]: {
          radius: 100,
          shell: true
        }
      }
    },
    geometryType: GeometryType.CUBE,
    particleStartSize: 0.1,
    timeToLive: 100000,
    randomTimeToLiveModifier: 30000,
    startColor: "#ffffff",
    startTransparency: 100,
    endTransparency: 70
  },
}
