/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Component, onWillStart, useState } from '@odoo/owl';
import { KpiCard } from '@kpi_dashboard/components/kpi_card/kpi_card';
import { useService } from '@web/core/utils/hooks';
import { KpiTrendCard } from '@kpi_dashboard/components/kpi_trend_card/kpi_trend_card';
import { KpiProgressCard } from '@kpi_dashboard/components/kpi_progress_card/kpi_progress_card';

export class Dashboard extends Component {
  static template = 'kpi_dashboard.Dashboard';
  static components = { KpiCard, KpiTrendCard, KpiProgressCard };

  setup() {
    this.orm = useService('orm');
    this.action = useService('action');

    this.state = useState({
      loading: true,
      // Datos para las tarjetas KPI simples:
      contactCount: 0,
      userCount: 0,
      companyCount: 0,
      // Datos para las tarjetas KPI con tendencias:
      previousContacts: 0,
      previousUsers: 0,
      // Datos para las tarjetas KPI con progreso :
      contactTarget: 500,
      userTarget: 50,
    });

    onWillStart(async () => await this.loadData());
  }

  async loadData() {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

      const [contactCount, userCount, companyCount, recentContacts] = await Promise.all(
        [
          this.orm.searchCount('res.partner', []),
          this.orm.searchCount('res.users', []),
          this.orm.searchCount('res.company', []),
          this.orm.searchCount('res.partner', [['create_date', '>=', dateStr]]),
        ]
      );
      const previousContacts = Math.max(0, contactCount - recentContacts);

      Object.assign(this.state, {
        loading: false,
        contactCount,
        userCount,
        companyCount,
        previousContacts,
        previousUsers: Math.max(0, userCount - 2), // Simulación de usuarios anteriores
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.state.loading = false;
    }
  }

  openUsers() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Users',
      res_model: 'res.users',
      view_mode: 'list,form',
      views: [
        [false, 'list'],
        [false, 'form'],
      ],
    });
  }

  openContacts() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Contacts',
      res_model: 'res.partner',
      view_mode: 'list,form',
      views: [
        [false, 'list'],
        [false, 'form'],
      ],
    });
  }
}

registry.category('actions').add('kpi_dashboard', Dashboard);
