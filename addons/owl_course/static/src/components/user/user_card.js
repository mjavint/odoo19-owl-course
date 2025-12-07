import { Component } from "@odoo/owl";

export class UserCard extends Component {
  static template = "owl_course.UserCard";
  static props = {
    name: String,
    email: String,
    role: { type: String, optional: true },
    avatar: { type: String, optional: true },
  };
  static defaultProps = {
    role: "Usuario",
    avatar: "/web/static/img/default_icon_app.png",
  };
}
