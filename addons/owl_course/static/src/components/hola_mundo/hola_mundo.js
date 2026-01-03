/** @odoo-module **/

import { Component } from '@odoo/owl';
import { registry } from '@web/core/registry';

export class HelloWorld extends Component {
  static template = 'owl_course.HelloWorld';
}

// registry.category("category").add("unique_name", MyCOmponent);
// registry.category("category").add(key, value[, options])
registry.category('actions').add('owl_course.hello_world', HelloWorld);
