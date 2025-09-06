# 상태관리 연습 - Todo App

이 프로젝트는 상태 관리 라이브러리 **ReduxToolkit, MobX, Zustand, Jotai**를 사용하여 Todo 애플리케이션을 구현하는 연습입니다.

각 라이브러리의 특징과 사용법을 익히는 데 중점을 두었습니다.

> 추가 내용: **TanStack Query, TanStack Table**

## 브랜치 목록

> ✅ 각 브랜치별로 `README.md`에 특징과 간단한 예시를 작성하였습니다.

- `dev/feat/redux`: **ReduxToolkit**을 사용한 Todo App 구현 + **TanStack Query** + **TanStack Table** + **GSAP** + **Storybook**
- `dev/feat/mobx`: **MobX**를 사용한 Todo App 구현
- `dev/feat/zustand`: **Zustand**를 사용한 Todo App 구현
- `dev/feat/jotai`: **Jotai**를 사용한 Todo App 구현

## 상태의 종류

1. **로컬 상태**: 컴포넌트 내부에서 관리되는 상태로, 해당 컴포넌트가 언마운트되면 사라집니다.
   - 예시: 컴포넌트 내부의 `useState`, `useReducer` 훅을 사용하여 관리되는 상태
2. **서버 상태**: 서버와의 통신을 통해 가져오는 데이터로, 클라이언트에서 관리됩니다.
   - 예시: API 호출을 통해 가져오는 데이터, `SWR` 또는 `React Query`를 사용하여 관리되는 상태
3. **전역 상태**: 애플리케이션 전체에서 공유되는 상태로, 여러 컴포넌트에서 접근할 수 있습니다.
   - 예시: `Redux`, `MobX`, `Zustand`, `Jotai` 등을 사용하여 관리되는 상태
