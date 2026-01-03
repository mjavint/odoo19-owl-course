/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Component, onWillStart, useState } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';

export class CompanyDashboard extends Component {
  static template = 'owl_course.CompanyDashboard';

  setup() {
    this.orm = useService('orm');
    this.action = useService('action');
    this.notification = useService('notification');

    this.state = useState({
      totalSales: 0,
      totalCustomers: 0,
      totalProducts: 0,
      loading: true,
    });
    onWillStart(async () => {
      await this.loadDashboardData();
    });
  }

  async loadDashboardData() {
    try {
      // Se van a realizar llamadas reales usando el ORM (search_count)
      const sales = await this.orm.call('sale.order', 'search_count', [
        [['state', '=', 'sale']],
      ]);
      const customers = await this.orm.call('res.partner', 'search_count', [
        [['customer_rank', '>', 0]],
      ]);
      const products = await this.orm.call('product.template', 'search_count', [[]]);
      this.state.totalSales = sales;
      this.state.totalCustomers = customers;
      this.state.totalProducts = products;
    } catch (error) {
      this.notification.add('Error al cargar datos del dashboard', { type: 'danger' });
    } finally {
      this.state.loading = false;
    }
  }

  openSalesView() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Ventas',
      res_model: 'sale.order',
      views: [
        [false, 'list'],
        [false, 'form'],
      ],
      domain: [['state', '=', 'sale']],
    });
  }

  openCustomersView() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Clientes',
      res_model: 'res.partner',
      views: [
        [false, 'list'],
        [false, 'form'],
      ],
      domain: [['customer_rank', '>', 0]],
    });
  }

  openProductsView() {
    this.action.doAction({
      type: 'ir.actions.act_window',
      name: 'Productos',
      res_model: 'product.template',
      views: [
        [false, 'list'],
        [false, 'form'],
      ],
    });
  }
}

registry.category('actions').add('company_dashboard', CompanyDashboard);
