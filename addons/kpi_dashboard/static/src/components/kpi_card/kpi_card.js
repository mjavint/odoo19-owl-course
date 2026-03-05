/** @odoo-module **/

import { Component, type } from '@odoo/owl';

export class KpiCard extends Component {
  static template = 'kpi_dashboard.KpiCard';
  static props = {
    title: { type: String },
    value: { type: Number },
    icon: { type: String, optional: true },
    color: { type: String, optional: true },
    prefix: { type: String, optional: true },
    suffix: { type: String, optional: true },
  };

  setup() {}
  
  get formattedValue() {
    const value = this.props.value || 0;
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString('es-ES');
  }

  get displayValue() {
    const prefix = this.props.prefix || '';
    const suffix = this.props.suffix || '';
    return `${prefix}${this.formattedValue}${suffix}`;
  }

  get cardColor() {
    return this.props.color || 'primary';
  }

  get cardIcon() {
    return this.props.icon || 'fa-chart-bar';
  }
}
