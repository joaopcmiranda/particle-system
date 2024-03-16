import { Select } from "./components/Select.tsx";
import { Vector3Input } from "./components/Vector3Input.tsx";
import React from "react";
import { Vector3 } from "three";
import { Numeric } from "./components/Numeric.tsx";
import { EmitterShape, EmitterType } from "../core/particleSystem/types/emitter.types.ts";
import { Checkbox } from "./components/Checkbox.tsx";
import { LogarithmicRange } from "./components/LogarithmicRange.tsx";
import { limits } from "./ParameterPanel.tsx";

type Props = {
  emitterParams: EmitterParameters;
  onUpdateEmitterParams: (params: EmitterParameters) => void;
}

export const EmitterParameterPanel = ({ emitterParams, onUpdateEmitterParams }: Props) => {

  return (
    <>
      <Select
        label="Emission Type"
        options={
          Object.keys(EmitterType).map((key) => {
            return { value: key, label: key }
          })
        }
        value={emitterParams.type}
        onChange={(value) => {
          const newConfigs: EmitterParameters = { ...emitterParams, type: value as EmitterType }
          onUpdateEmitterParams(newConfigs)
        }}
        isTabbed={true}
      />
      <br />
      {emitterParams.type === EmitterType.CONSTANT && (
        <Numeric
          label="Count"
          value={emitterParams.typeParameters[EmitterType.CONSTANT].count}
          onChange={(value) => {
            const newConfigs: EmitterParameters = {
              ...emitterParams,
              typeParameters: { ...emitterParams.typeParameters, [EmitterType.CONSTANT]: { count: value } }
            }
            onUpdateEmitterParams(newConfigs)
          }} />
      )}
      {emitterParams.type === EmitterType.BURST && (
        <>
          <Numeric
            label="Burst Count"
            value={emitterParams.typeParameters[EmitterType.BURST].burstCount}
            onChange={(value) => {
              const newConfigs: EmitterParameters = {
                ...emitterParams,
                typeParameters: {
                  ...emitterParams.typeParameters,
                  [EmitterType.BURST]: {
                    burstCount: value,
                    burstDelay: emitterParams.typeParameters[EmitterType.BURST].burstDelay
                  }
                }
              }
              onUpdateEmitterParams(newConfigs)
            }} />
          <br />
          <LogarithmicRange
            label="Burst Delay"
            min={limits.emitter.burstDelay.min}
            max={limits.emitter.burstDelay.max}
            scale={1000}
            precision={2}
            value={emitterParams.typeParameters[EmitterType.BURST].burstDelay}
            onChange={(value) => {
              const newConfigs: EmitterParameters = {
                ...emitterParams,
                typeParameters: {
                  ...emitterParams.typeParameters,
                  [EmitterType.BURST]: {
                    burstDelay: value,
                    burstCount: emitterParams.typeParameters[EmitterType.BURST].burstCount
                  }
                }
              }
              onUpdateEmitterParams(newConfigs)
            }} />
        </>
      )}
      {emitterParams.type === EmitterType.CONTINUOUS && (
        <LogarithmicRange
          label="Emission Frequency"
          min={limits.emitter.emissionFrequency.min}
          max={limits.emitter.emissionFrequency.max}
          scale={1000}
          value={emitterParams.typeParameters[EmitterType.CONTINUOUS].emissionFrequency}
          onChange={(value) => {
            const newConfigs: EmitterParameters = {
              ...emitterParams,
              typeParameters: {
                ...emitterParams.typeParameters,
                [EmitterType.CONTINUOUS]: { emissionFrequency: value }
              }
            }
            onUpdateEmitterParams(newConfigs)
          }} />
      )}
      <br />
      <Select
        label="Emitter Shape"
        options={
          Object.keys(EmitterShape).map((key) => {
            return { value: key, label: key }
          })
        }
        value={emitterParams.shape}
        onChange={(value) => {
          const newConfigs: EmitterParameters = { ...emitterParams, shape: value as EmitterShape }
          onUpdateEmitterParams(newConfigs)
        }}
        isTabbed={false} />
      <br />
      {emitterParams.shape === EmitterShape.LINE && (
        <>
          <Vector3Input
            label="Vector"
            value={emitterParams.shapeParameters[EmitterShape.LINE].direction}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.LINE]: {
                    direction: value,
                    length: emitterParams.shapeParameters[EmitterShape.LINE].length
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Numeric
            label="Length"
            value={emitterParams.shapeParameters[EmitterShape.LINE].length}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.LINE]: { ...emitterParams.shapeParameters[EmitterShape.LINE], length: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.CIRCLE && (
        <>
          <Numeric
            label="Radius"
            value={emitterParams.shapeParameters[EmitterShape.CIRCLE].radius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CIRCLE]: { ...emitterParams.shapeParameters[EmitterShape.CIRCLE], radius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Normal"
            value={emitterParams.shapeParameters[EmitterShape.CIRCLE].normal}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CIRCLE]: { ...emitterParams.shapeParameters[EmitterShape.CIRCLE], normal: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Edge"
            value={emitterParams.shapeParameters[EmitterShape.CIRCLE].edge}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CIRCLE]: { ...emitterParams.shapeParameters[EmitterShape.CIRCLE], edge: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.SQUARE && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.SQUARE].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.SQUARE]: {
                    ...emitterParams.shapeParameters[EmitterShape.SQUARE],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.SQUARE].dimensions[1]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.SQUARE].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.SQUARE]: {
                    ...emitterParams.shapeParameters[EmitterShape.SQUARE],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.SQUARE].dimensions[0], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Edge"
            value={emitterParams.shapeParameters[EmitterShape.SQUARE].edge}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.SQUARE]: { ...emitterParams.shapeParameters[EmitterShape.SQUARE], edge: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.RECTANGLE && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.RECTANGLE].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RECTANGLE]: {
                    ...emitterParams.shapeParameters[EmitterShape.RECTANGLE],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.RECTANGLE].dimensions[1]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.RECTANGLE].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RECTANGLE]: {
                    ...emitterParams.shapeParameters[EmitterShape.RECTANGLE],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.RECTANGLE].dimensions[0], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Edge"
            value={emitterParams.shapeParameters[EmitterShape.RECTANGLE].edge}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RECTANGLE]: { ...emitterParams.shapeParameters[EmitterShape.RECTANGLE], edge: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.ELLIPSE && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSE].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSE]: {
                    ...emitterParams.shapeParameters[EmitterShape.ELLIPSE],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.ELLIPSE].dimensions[1]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSE].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSE]: {
                    ...emitterParams.shapeParameters[EmitterShape.ELLIPSE],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.ELLIPSE].dimensions[0], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Edge"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSE].edge}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSE]: { ...emitterParams.shapeParameters[EmitterShape.ELLIPSE], edge: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.RING && (
        <>
          <Numeric
            label="Inner Radius"
            value={emitterParams.shapeParameters[EmitterShape.RING].innerRadius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RING]: { ...emitterParams.shapeParameters[EmitterShape.RING], innerRadius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Numeric
            label="Outer Radius"
            value={emitterParams.shapeParameters[EmitterShape.RING].outerRadius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RING]: { ...emitterParams.shapeParameters[EmitterShape.RING], outerRadius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Normal"
            value={emitterParams.shapeParameters[EmitterShape.RING].normal}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.RING]: { ...emitterParams.shapeParameters[EmitterShape.RING], normal: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.SPHERE && (
        <>
          <Numeric
            label="Radius"
            value={emitterParams.shapeParameters[EmitterShape.SPHERE].radius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.SPHERE]: { ...emitterParams.shapeParameters[EmitterShape.SPHERE], radius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.SPHERE].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.SPHERE]: { ...emitterParams.shapeParameters[EmitterShape.SPHERE], shell: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.HEMISPHERE && (
        <>
          <Numeric
            label="Radius"
            value={emitterParams.shapeParameters[EmitterShape.HEMISPHERE].radius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.HEMISPHERE]: {
                    ...emitterParams.shapeParameters[EmitterShape.HEMISPHERE],
                    radius: value
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Normal"
            value={emitterParams.shapeParameters[EmitterShape.HEMISPHERE].normal}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.HEMISPHERE]: {
                    ...emitterParams.shapeParameters[EmitterShape.HEMISPHERE],
                    normal: value
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.HEMISPHERE].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.HEMISPHERE]: { ...emitterParams.shapeParameters[EmitterShape.HEMISPHERE], shell: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.ELLIPSOID && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSOID]: {
                    ...emitterParams.shapeParameters[EmitterShape.ELLIPSOID],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[1], emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSOID]: {
                    ...emitterParams.shapeParameters[EmitterShape.ELLIPSOID],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[0], value, emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[2]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSOID]: {
                    ...emitterParams.shapeParameters[EmitterShape.ELLIPSOID],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[0], emitterParams.shapeParameters[EmitterShape.ELLIPSOID].dimensions[1], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.ELLIPSOID].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.ELLIPSOID]: { ...emitterParams.shapeParameters[EmitterShape.ELLIPSOID], shell: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.CYLINDER && (
        <>
          <Numeric
            label="Radius"
            value={emitterParams.shapeParameters[EmitterShape.CYLINDER].radius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CYLINDER]: { ...emitterParams.shapeParameters[EmitterShape.CYLINDER], radius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Numeric
            label="Height"
            value={emitterParams.shapeParameters[EmitterShape.CYLINDER].height}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CYLINDER]: { ...emitterParams.shapeParameters[EmitterShape.CYLINDER], height: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Axis"
            value={emitterParams.shapeParameters[EmitterShape.CYLINDER].axis}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CYLINDER]: { ...emitterParams.shapeParameters[EmitterShape.CYLINDER], axis: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.CYLINDER].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CYLINDER]: { ...emitterParams.shapeParameters[EmitterShape.CYLINDER], shell: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Closed"
            value={emitterParams.shapeParameters[EmitterShape.CYLINDER].closed}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CYLINDER]: { ...emitterParams.shapeParameters[EmitterShape.CYLINDER], closed: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>

      )}
      {
        emitterParams.shape === EmitterShape.CAPSULE && (
          <>
            <Numeric
              label="Radius"
              value={emitterParams.shapeParameters[EmitterShape.CAPSULE].radius}
              onChange={(value) => {
                const newParams: EmitterParameters = {
                  ...emitterParams,
                  shapeParameters: {
                    ...emitterParams.shapeParameters,
                    [EmitterShape.CAPSULE]: { ...emitterParams.shapeParameters[EmitterShape.CAPSULE], radius: value }
                  }
                }
                onUpdateEmitterParams(newParams)
              }} />
            <br />
            <Numeric
              label="Height"
              value={emitterParams.shapeParameters[EmitterShape.CAPSULE].height}
              onChange={(value) => {
                const newParams: EmitterParameters = {
                  ...emitterParams,
                  shapeParameters: {
                    ...emitterParams.shapeParameters,
                    [EmitterShape.CAPSULE]: { ...emitterParams.shapeParameters[EmitterShape.CAPSULE], height: value }
                  }
                }
                onUpdateEmitterParams(newParams)
              }} />
            <br />
            <Vector3Input
              label="Axis"
              value={emitterParams.shapeParameters[EmitterShape.CAPSULE].axis}
              onChange={(value) => {
                const newParams: EmitterParameters = {
                  ...emitterParams,
                  shapeParameters: {
                    ...emitterParams.shapeParameters,
                    [EmitterShape.CAPSULE]: { ...emitterParams.shapeParameters[EmitterShape.CAPSULE], axis: value }
                  }
                }
                onUpdateEmitterParams(newParams)
              }} />
            <br />
            <Checkbox
              label="Shell"
              value={emitterParams.shapeParameters[EmitterShape.CAPSULE].shell}
              onChange={(value) => {
                const newParams: EmitterParameters = {
                  ...emitterParams,
                  shapeParameters: {
                    ...emitterParams.shapeParameters,
                    [EmitterShape.CAPSULE]: { ...emitterParams.shapeParameters[EmitterShape.CAPSULE], shell: value }
                  }
                }
                onUpdateEmitterParams(newParams)
              }} />
          </>
        )
      }
      {emitterParams.shape === EmitterShape.CONE && (
        <>
          <Numeric
            label="Radius"
            value={emitterParams.shapeParameters[EmitterShape.CONE].radius}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CONE]: { ...emitterParams.shapeParameters[EmitterShape.CONE], radius: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Height"
            value={emitterParams.shapeParameters[EmitterShape.CONE].height}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CONE]: { ...emitterParams.shapeParameters[EmitterShape.CONE], height: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.CONE].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CONE]: { ...emitterParams.shapeParameters[EmitterShape.CONE], shell: value }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.PARALLELEPIPED && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.PARALLELEPIPED]: {
                    ...emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[1], emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.PARALLELEPIPED]: {
                    ...emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[0], value, emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[2]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.PARALLELEPIPED]: {
                    ...emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[0], emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].dimensions[1], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.PARALLELEPIPED]: {
                    ...emitterParams.shapeParameters[EmitterShape.PARALLELEPIPED],
                    shell: value
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      {emitterParams.shape === EmitterShape.CUBE && (
        <>
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[0]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CUBE]: {
                    ...emitterParams.shapeParameters[EmitterShape.CUBE],
                    dimensions: [value, emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[1], emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[1]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CUBE]: {
                    ...emitterParams.shapeParameters[EmitterShape.CUBE],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[0], value, emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[2]]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Vector3Input
            label="Dimensions"
            value={emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[2]}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CUBE]: {
                    ...emitterParams.shapeParameters[EmitterShape.CUBE],
                    dimensions: [emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[0], emitterParams.shapeParameters[EmitterShape.CUBE].dimensions[1], value]
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
          <br />
          <Checkbox
            label="Shell"
            value={emitterParams.shapeParameters[EmitterShape.CUBE].shell}
            onChange={(value) => {
              const newParams: EmitterParameters = {
                ...emitterParams,
                shapeParameters: {
                  ...emitterParams.shapeParameters,
                  [EmitterShape.CUBE]: {
                    ...emitterParams.shapeParameters[EmitterShape.CUBE],
                    shell: value
                  }
                }
              }
              onUpdateEmitterParams(newParams)
            }} />
        </>
      )}
      <br/>
      <Vector3Input
        label="Offset"
        value={emitterParams.offset}
        onChange={(value) => {
          const newParams: EmitterParameters = { ...emitterParams, offset: value }
          onUpdateEmitterParams(newParams)
        }} />
    </>
  )
}

export type EmitterParameters = {
  offset: Vector3;

  type: EmitterType;
  typeParameters: {
    [EmitterType.CONSTANT]: {
      count: number;
    }
    [EmitterType.BURST]: {
      burstCount: number;
      burstDelay: number;
    }
    [EmitterType.CONTINUOUS]: {
      emissionFrequency: number;
    }
  }

  shape: EmitterShape;
  shapeParameters: {
    [EmitterShape.POINT]: {},
    [EmitterShape.LINE]: {
      direction: Vector3;
      length: number;
    },
    [EmitterShape.CIRCLE]: {
      radius: number;
      normal: Vector3;
      edge: boolean;
    },
    [EmitterShape.SQUARE]: {
      dimensions: [Vector3, Vector3];
      edge: boolean;
    },
    [EmitterShape.RECTANGLE]: {
      dimensions: [Vector3, Vector3];
      edge: boolean;
    },
    [EmitterShape.ELLIPSE]: {
      dimensions: [Vector3, Vector3];
      edge: boolean;
    },
    [EmitterShape.RING]: {
      innerRadius: number;
      outerRadius: number;
      normal: Vector3;
    },
    [EmitterShape.SPHERE]: {
      radius: number;
      shell: boolean;
    },
    [EmitterShape.HEMISPHERE]: {
      radius: number;
      normal: Vector3;
      shell: boolean;
    },
    [EmitterShape.ELLIPSOID]: {
      dimensions: [Vector3, Vector3, Vector3];
      shell: boolean;
    },
    [EmitterShape.CYLINDER]: {
      radius: number;
      height: number;
      axis: Vector3;
      shell: boolean;
      closed: boolean;
    },
    [EmitterShape.CAPSULE]: {
      radius: number;
      height: number;
      axis: Vector3;
      shell: boolean;
    },
    [EmitterShape.CONE]: {
      radius: number;
      height: Vector3;
      shell: boolean;
    },
    [EmitterShape.PARALLELEPIPED]: {
      dimensions: [Vector3, Vector3, Vector3];
      shell: boolean;
    },
    [EmitterShape.CUBE]: {
      dimensions: [Vector3, Vector3, Vector3];
      shell: boolean;
    }
  }
}
