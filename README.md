# Mobx

- Mobx는 상태 관리를 위한 라이브러리로, React와 함께 사용하여 애플리케이션의 상태를 효율적으로 관리할 수 있습니다.
- Mobx를 사용하면 상태를 관찰하고, 상태가 변경될 때 자동으로 UI를 업데이트할 수 있습니다.

## 코드 예시

```ts
// store.ts
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
```

```ts
// models/todoItem.ts
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
```

## 설명

- `class` 키워드를 사용하여 `todoItem` 클래스를 정의합니다.
- `makeAutoObservable` 함수는 클래스의 모든 속성과 메서드를 자동으로 관찰 가능하게 만듭니다.
- 프록시 객체를 사용하여 상태를 관리하여 상태 변경 시 자동으로 UI를 업데이트하기 때문에 불변성이 필요하지 않습니다.
