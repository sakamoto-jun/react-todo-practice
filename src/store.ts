import { makeAutoObservable } from "mobx";
import todoItem from "./models/todoItem";
import { getTodos } from "./services/todoApi";

class Store {
  public todos: todoItem[];

  constructor() {
    this.todos = [];
    makeAutoObservable(this);
  }

  addTodo = (text: string) => {
    this.todos.push(new todoItem({ text }));
  };

  toggleTodo = (id: number) => {
    const matchTodo = this.todos.find((todo) => todo.id === id);

    if (matchTodo) matchTodo.toggle();
  };

  fetchTodos = async () => {
    const todos = await getTodos();

    this.todos = todos.map((todo) => new todoItem(todo));
  };
}

export default new Store();
