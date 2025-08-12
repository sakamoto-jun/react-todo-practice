import { makeAutoObservable } from "mobx";
import { Todo } from "../types";

export default class todoItem implements Todo {
  public id: number;
  public text: string;
  public done: boolean;

  constructor({
    id = Date.now(),
    text = "",
    done = false,
  }: Partial<Todo> = {}) {
    this.id = id;
    this.text = text;
    this.done = done;
    makeAutoObservable(this);
  }

  toggle = () => {
    this.done = !this.done;
  };
}
