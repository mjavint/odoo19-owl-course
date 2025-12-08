import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class TaskForm extends Component {
  static template = "owl_course.TaskForm";
  static props = {
    onAddTask: Function,
  };
  setup() {
    this.state = useState({
      taskText: "",
    });
  }
  onSubmit(ev) {
    ev.preventDefault();
    if (this.state.taskText.trim()) {
      // Emitir el evento al padre
      this.props.onAddTask(this.state.taskText.trim());
      this.state.taskText = "";
    }
  }
  onInput(ev) {
    this.state.taskText = ev.target.value;
  }
}

export class TaskItem extends Component {
  static template = "owl_course.TaskItem";
  static components = { TaskForm };
  static props = {
    task: Object,
    onToggle: Function,
    onDelete: Function,
  };
}

export class TodoList extends Component {
  static template = "owl_course.TodoList";
  static components = { TaskItem, TaskForm };

  setup() {
    this.state = useState({
      tasks: [
        { id: 1, text: "Aprender OWL", completed: false },
        { id: 2, text: "Crear componentes", completed: true },
        { id: 3, text: "Crear Nuevo Componente", completed: true },
      ],
      nextId: 4,
    });
  }

  addTask(text) {
    this.state.tasks.push({
      id: this.state.nextId++,
      text: text,
      completed: false,
    });
  }

  toggleTask(taskId) {
    const task = this.state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  deleteTask(taskId) {
    const index = this.state.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      this.state.tasks.splice(index, 1);
    }
  }

  get completedCount() {
    return this.state.tasks.filter((t) => t.completed).length;
  }

  get totalCount() {
    return this.state.tasks.length;
  }
}

registry.category("actions").add("owl_course.todo_list", TodoList);
