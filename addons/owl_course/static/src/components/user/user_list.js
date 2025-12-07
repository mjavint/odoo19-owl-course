import { Component } from "@odoo/owl";
import { UserCard } from "@owl_course/components/user/user_card";
import { registry } from "@web/core/registry";

export class UserList extends Component {
  static template = "owl_course.UserList";
  static components = { UserCard };

  setup() {
    this.users = [
      {
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        role: "Administrador",
      },
      {
        name: "María Gómez",
        email: "maria.gomez@example.com",
      },
      {
        name: "Manuel Vinent Guilarte",
        email: "manuel.vinent@example.com",
        role: "Desarrollador",
      },
      {
        name: "Udemy Test",
        email: "udemy.test@example.com",
        role: "Administrador",
      },
    ];
  }
}

registry.category("actions").add("owl_course.user_list", UserList);
