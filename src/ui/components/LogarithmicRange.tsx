import React, { FC } from 'react';
import styles from "../../style.module.scss";

type Props = {
  label: string;
  min: number;
  max: number;
  scale: number;
  value: number;
  precision?: number;
  onChange: (value: number) => void;
};


export const LogarithmicRange: FC<Props> = ({ label, min, max, scale, value, onChange, precision }) => {
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  const logToRange = (logValue: number) => { return (Math.log10(logValue) - logMin) / (logMax - logMin) * scale; }
  const rangeToLog = (rangeValue: number) => { return Math.pow(10, rangeValue * (logMax - logMin) / scale + logMin); }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number.parseFloat(event.target.value);
    onChange(rangeToLog(rangeValue));
  };
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input type="range"
             min={1}
             max={scale}
             step="any"
             value={logToRange(value)}
             onChange={handleChange} />
      <input type="number" value={Number(value.toFixed(precision))} onChange={(event) => onChange(Number.parseFloat(event.target.value))} min={min} max={max} />
    </div>
  );
}
