import "./style.module.scss";
import { Vector3 } from "three";
import { App } from "./core/App.ts";
import { ParticleSystem } from "./core/particleSystem/ParticleSystem.ts";
import { ParticleSystemConfig } from "./core/particleSystem/types/particle.types.ts";
import { convertParametersToParticleSystemConfig } from "./ui/util.tsx";
import { startUI } from "./ui/UI.tsx";
import { parametersDefaults } from "./ui/ParameterPanel.tsx";


const app = App();

const parameters = parametersDefaults;

const config: ParticleSystemConfig = convertParametersToParticleSystemConfig(parameters)

let particleSystem: ParticleSystem;


app.setup(() => {
  particleSystem = new ParticleSystem(new Vector3(), config);

  startUI(
    (_parameters) => {
      Object.assign(parameters, _parameters)
      convertParametersToParticleSystemConfig(_parameters, config)
    },
    () => {
      particleSystem.clear();
    }
  );

});

app.loop(({ delta, scene, clock }) => {
  if (parameters.paused) {
    if (clock.running) {
      clock.stop()
    }
    return
  } else {
    if (!clock.running) {
      clock.start()
    }
  }

  particleSystem.update(delta, scene)
});


