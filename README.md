# 📝 상태관리 학습 - Todo App

이 프로젝트는 상태 관리 라이브러리 **Redux Toolkit**, **MobX**, **Zustand**, **Jotai**를 사용하여 Todo 애플리케이션을 구현하는 학습 프로젝트입니다.

각 상태관리 도구의 특징과 사용법을 학습하는 데 중점을 두었으며, **TanStack Query**, **TanStack Table**, **Storybook**, **Cypress E2E Test**까지 통합해 실제 개발 환경에 가까운 구조를 학습.

## 📌 프로젝트 개요

- **목표**  
  다양한 상태 관리 라이브러리와 도구를 실습하여, 상태 관리 패턴과 장단점을 비교 학습
- **핵심 포인트**
  - Redux Toolkit, MobX, Zustand, Jotai를 활용한 **전역 상태 관리**
  - TanStack Query를 통한 **서버 상태 관리**
  - TanStack Table을 이용한 **데이터 테이블 구성**
  - Storybook을 통한 **컴포넌트 단위 개발 환경**
  - Cypress를 활용한 **엔드투엔드(E2E) 테스트**

## 🌿 브랜치 목록

> ✅ 각 브랜치별로 `README.md`에 해당 라이브러리의 특징과 간단한 예시를 작성하였습니다.

- **`dev/feat/redux`**
  - **Redux Toolkit** 기반 Todo App
  - **TanStack Query**, **TanStack Table**
  - **GSAP 애니메이션**
  - **Storybook 통합**
- **`dev/feat/mobx`**
  - **MobX**를 사용한 Todo App 구현
- **`dev/feat/zustand`**
  - **Zustand**를 사용한 Todo App 구현
- **`dev/feat/jotai`**
  - **Jotai**를 사용한 Todo App 구현

## 🏗️ 상태의 종류

1. **로컬 상태 (Local State)**
   - 개별 컴포넌트 내부에서만 관리되는 상태
   - 컴포넌트가 언마운트되면 상태가 초기화됨
   - **예시:** `useState`, `useReducer`
2. **서버 상태 (Server State)**
   - 서버에서 데이터를 가져와 클라이언트에서 캐싱 및 동기화
   - 주로 **TanStack Query**를 활용
   - **예시:** API 호출, `useQuery`, `useMutation`
3. **전역 상태 (Global State)**
   - 애플리케이션 전역에서 여러 컴포넌트가 공유하는 상태
   - **예시:** Redux, MobX, Zustand, Jotai

## 📚 Storybook 통합

Storybook을 사용하여 **컴포넌트 단위 개발 환경**을 학습.

### 설치 및 실행

```pwsh
# 설치
npm install -D storybook

# 실행
npm run storybook
```

### 적용 예시

- Checkbox, Dropdown, Radio, Textarea 등 **UI 컴포넌트별 스토리 작성**
- `Meta<typeof Component>` 및 `StoryObj<typeof meta>`를 활용한 **타입 안전한 스토리 구성**
- **Accessibility 검사** 및 **Storybook Test Runner** 활용

## 🧪 Cypress E2E Test

Cypress를 사용하여 **엔드투엔드(E2E) 테스트**를 학습.

### 테스트 목적

- Todo 추가, 완료, 삭제 기능의 정상 동작 검증
- Protected 페이지 접근 제어 확인

### 실행 방법

```pwsh
# Cypress 실행
npx cypress open
```

### 예시 테스트 코드

```ts
describe("todo", () => {
  it("todo 아이템을 추가하고, 상태를 변경할 수 있다", () => {
    cy.visit("/");

    // 리스트 로딩 기다리기
    cy.findAllByRole("checkbox").should("have.length.gte", 1);

    // 아이템 추가
    cy.findByRole("textbox").as("todoInput");
    cy.get("@todoInput").type("새로운 할 일");
    cy.findByRole("button", { name: /추가/ }).click();
    cy.get("@todoInput").should("have.value", "");

    // 아이템 추가 확인
    cy.findByText("새로운 할 일").should("exist").as("newTodo");

    // 아이템 상태 변경
    cy.get("@newTodo").click();
    cy.findByLabelText("새로운 할 일").should("be.checked");
  });
});
```

## 🛠️ 사용 기술 스택

| 분류            | 사용 기술                           |
| --------------- | ----------------------------------- |
| **프레임워크**  | React, TypeScript                   |
| **상태 관리**   | Redux Toolkit, MobX, Zustand, Jotai |
| **데이터 관리** | TanStack Query, TanStack Table      |
| **UI 개발**     | Storybook, GSAP                     |
| **테스트**      | Cypress E2E Testing                 |

## 🔍 정리 포인트

- 상태관리 라이브러리 **4종 비교 및 실습**
- **TanStack Query** + **TanStack Table**로 서버 데이터 관리
- **Storybook**을 통한 컴포넌트 단위 개발
- **Cypress**로 기능 단위 **E2E 테스트** 자동화
