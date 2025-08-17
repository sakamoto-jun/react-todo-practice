# ✅ MobX 특징 4가지

1. 자동 관찰 (Reactivity)

   - `makeAutoObservable`로 클래스 속성과 메서드를 자동 관찰.
   - 상태가 바뀌면 관련 UI가 자동으로 업데이트됨.

2. 간단한 문법

   - `@observable`, `@action` 같은 데코레이터 대신 `makeAutoObservable` 한 줄이면 끝.
   - 보일러플레이트 적고 직관적.

3. 불변성 필요 없음

   - 내부적으로 프록시 객체를 사용 → 상태를 직접 변경해도 UI가 자동 반영됨.
   - Redux/Zustand처럼 `...spread`로 복사할 필요 없음.

4. 객체 지향적 패턴 지원
   - 클래스 기반 설계에 자연스럽게 녹아듦.
   - 스토어와 모델을 클래스로 정의하면 도메인 로직을 구조적으로 관리 가능.

## 📦 코드 예시

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

## 📖 설명

- `class` 키워드로 모델(`todoItem`)과 스토어(`Store`)를 정의.
- `makeAutoObservable` → 속성과 메서드를 자동 관찰 대상으로 등록.
- 상태 변경 시 자동으로 UI가 리렌더링 되므로, 불변성 관리가 필요 없음.
- 도메인 로직을 클래스 단위로 묶어 관리할 수 있어, 대규모 프로젝트에도 적합.
