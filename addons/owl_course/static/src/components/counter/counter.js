import { Component, useState } from "@odoo/owl";
import { registry } from '@web/core/registry';

export class Counter extends Component {
  static template = "owl_course.Counter";

  setup() {
    this.state = useState({ count: 0, history: [] });
  }

  increment() {
    this.state.count++;
    this.state.history.push({
      action: "increment",
      value: this.state.count,
      timestamp: new Date().toLocaleTimeString(),
    });
  }

  decrement() {
    this.state.count--;
    this.state.history.push({
      action: "decrement",
      value: this.state.count,
      timestamp: new Date().toLocaleTimeString(),
    });
  }

  reset() {
    this.state.count = 0;
    this.state.history = [];
  }
}

registry.category("actions").add("owl_course.counter", Counter);
