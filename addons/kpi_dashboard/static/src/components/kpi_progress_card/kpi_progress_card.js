import { KpiCard } from '@kpi_dashboard/components/kpi_card/kpi_card';
/** @odoo-module **/

export class KpiProgressCard extends KpiCard {
  static template = 'kpi_dashboard.KpiProgressCard';
  static props = {
    ...KpiCard.props,
    target: { type: Number },
    unit: { type: String, optional: true },
  };

  setup() {}

  get progressPercent() {
    const current = this.props.value || 0;
    const target = this.props.target || 1;
    return Math.min(100, (current / target) * 100).toFixed(0);
  }

  get progressBarClass() {
    const p = parseFloat(this.progressPercent);
    if (p >= 100) return 'bg-success';
    if (p >= 75) return 'bg-primary';
    if (p >= 50) return 'bg-info';
    if (p >= 25) return 'bg-warning';
    return 'bg-danger';
  }

  get formattedTarget() {
    const target = this.props.target || 0;
    const prefix = this.props.prefix || '';
    if (target >= 1000000) {
      return `${prefix}${(target / 1000000).toFixed(1)}M`;
    }
    if (target >= 1000) {
      return `${prefix}${(target / 1000).toFixed(1)}K`;
    }
    return `${prefix}${target.toLocaleString('es-ES')}`;
  }

  get statusLabel() {
    const p = parseFloat(this.progressPercent);
    if (p >= 100) return '¡Meta alcanzada!';
    if (p >= 75) return 'Casi ahí';
    if (p >= 50) return 'Buen progreso';
    if (p >= 25) return 'En camino';
    return 'Inicio';
  }

  get statusClass() {
    const p = parseFloat(this.progressPercent);
    if (p >= 100) return 'text-success';
    if (p >= 75) return 'text-primary';
    if (p >= 50) return 'text-info';
    return 'text-muted';
  }
}
