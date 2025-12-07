import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class HelloWorld extends Component {
  static template = "owl_course.HelloWorld";
}

registry.category("actions").add("owl_course.hello_world", HelloWorld);
