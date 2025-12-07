import { registry } from "@web/core/registry";
import {
  Component,
  onMounted,
  onPatched,
  onWillStart,
  onWillUnmount,
  useState,
} from "@odoo/owl";

export class Reloj extends Component {
  static template = "owl_course.Reloj";

  setup() {
    console.log("1. setup() - Configurando el Componente Reloj");
    this.state = useState({
      time: new Date(),
      isRunning: false,
    });
    this.interval = null;

    // Hook: antes de iniciar (async)
    onWillStart(async () => {
      console.log(
        "2. onWillStart() - Cargando datos iniciales simulando la carga de datos ..."
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("3. Datos iniciales cargados.");
    });

    // Hook: después de montar
    onMounted(() => {
      console.log("4. onMounted() - Componente Reloj montado en el DOM");
      this.startClock();
    });

    // hook: después de cada actualización
    onPatched(() => {
      console.log("5. onPatched() - Componente Reloj actualizado en el DOM");
    });

    // hook: antes de desmontar
    onWillUnmount(() => {
      console.log("6. onWillUnmount() - Componente Reloj será desmontado");
      this.stopClock();
    });
  }
  startClock() {
    if (!this.state.isRunning) {
      this.state.isRunning = true;
      this.interval = setInterval(() => {
        this.state.time = new Date();
      }, 1000);
    }
  }

  stopClock() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.state.isRunning = false;
    }
  }

  toggleClock() {
    if (this.state.isRunning) {
      this.stopClock();
    } else {
      this.startClock();
    }
  }

  get formattedTime() {
    return this.state.time.toLocaleTimeString("es-ES");
  }

  get formattedDate() {
    return this.state.time.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

registry.category("actions").add("owl_course.reloj", Reloj);
