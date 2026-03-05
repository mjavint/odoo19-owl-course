/** @odoo-module **/

import { KpiCard } from '@kpi_dashboard/components/kpi_card/kpi_card';

export class KpiTrendCard extends KpiCard {
  static template = 'kpi_dashboard.KpiTrendCard';
  static props = {
    ...KpiCard.props,
    previousValue: { type: Number },
    trendPeriod: { type: String, optional: true },
  };

  setup() {}

  get trendPercent() {
    const current = this.props.value || 0;
    const previous = this.props.previousValue || 0;
    if (previous === 0) return current > 0 ? 100 : 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  }

  get trendDirection() {
    const percent = parseFloat(this.trendPercent);
    if (percent > 0) return 'up';
    if (percent < 0) return 'down';
    return 'neutral';
  }

  get trenIcon() {
    const icons = {
      up: 'fa-arrow-up',
      down: 'fa-arrow-down',
      neutral: 'fa-minus',
    };
    return icons[this.trendDirection];
  }

  get trenColorClass() {
    const classes = {
      up: 'text-success',
      down: 'text-danger',
      neutral: 'text-muted',
    };
    return classes[this.trendDirection];
  }

  get trendBadgeClass() {
    const classes = {
      up: 'bg-success',
      down: 'bg-danger',
      neutral: 'bg-secondary',
    };
    return classes[this.trendDirection];
  }

  get periodLabel() {
    return this.props.trendPeriod || 'vs periodo anterior';
  }
}
