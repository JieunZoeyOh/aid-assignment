# 🗓️ Timetable Project

[🖥️ Live Server로 구경하기](https://inspiring-snickerdoodle-2a61c7.netlify.app/)

## 📍 Index

- 프로젝트 개요
- 기술 스택
- 설치 및 실행 방법
- 프로젝트 구조
- 구현 기능
- 프로젝트 진행하며 집중한 부분
- 회고

<br>

## 프로젝트 개요

아이드의 프론트엔드 개발자 채용의 과제 전형으로 진행한 Timetable(시간표) 애플리케이션입니다.

- 관리자가 시간표를 설정해 사용자에게 운영 시간을 안내하는 기능입니다.
- 시간표를 편집할 수 있는 기능을 구현했습니다.

<br>

## 기술 스택

- React
- TypeScript
- TailwindCSS
- Vitest

<br>

## 설치 및 실행 방법

1. zip 파일을 압축 해제합니다.

   ```
   unzip FRONTEND_과제_오지은.zip
   ```

2. 압축 해제한 폴더로 이동합니다.

   ```
   cd FRONTEND_과제_오지은
   ```

3. 필요한 패키지를 설치합니다. (Node.js는 LTS인 20.17.0 버전을 사용했습니다.)

   ```
   npm install
   ```

4. 로컬 서버를 실행합니다.

   ```
   npm run dev
   ```

5. 브라우저에서 접속합니다. [http://localhost:3000/](http://localhost:3000/)

<br>

## 프로젝트 구조

```
📦
├─ README.md
├─ index.html
├─ package.json
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ Common
│  │  │  ├─ Alert.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ TimeInput.tsx
│  │  │  └─ TimeSelect.tsx
│  │  └─ Timetable
│  │     ├─ BreakTime.tsx
│  │     ├─ CourseBlock.tsx
│  │     ├─ TimeSlot.tsx
│  │     └─ TimeSlotList.tsx
│  ├─ contexts
│  │  ├─ AlertContext.tsx
│  │  ├─ AlertProvider.tsx
│  │  ├─ ModalContext.tsx
│  │  ├─ ModalProvider.tsx
│  │  ├─ TimetableContext.tsx
│  │  └─ TimetableProvider.tsx
│  ├─ hooks
│  │  ├─ useAlertDispatch.ts
│  │  ├─ useAlertState.ts
│  │  ├─ useModalDispatch.ts
│  │  ├─ useModalState.ts
│  │  ├─ useTimetableDispatch.ts
│  │  └─ useTimetableState.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  └─ NotFound.tsx
│  ├─ state
│  │  ├─ alertInitialState.ts
│  │  ├─ alertReducer.ts
│  │  ├─ modalInitialState.ts
│  │  ├─ modalReducer.ts
│  │  ├─ stateTypes.ts
│  │  ├─ timetableInitialState.ts
│  │  └─ timetableReducer.ts
│  ├─ test
│  │  ├─ App.test.tsx
│  │  └─ components
│  │     ├─ Alert.test.tsx
│  │     ├─ BreakTime.test.tsx
│  │     ├─ Button.test.tsx
│  │     ├─ CourseBlock.test.tsx
│  │     ├─ Modal.test.tsx
│  │     └─ TimeInput.test.tsx
│  ├─ types.ts
│  └─ utils
│     ├─ course.ts
│     ├─ date.ts
│     └─ validators.ts
```

- src/components: Common과 Timetable 관련 컴포넌트 분리
- src/context: context API 관련 context와 provider
- src/hook: context의 state, dispatch hook 정의
- src/state: initialState, reducer, type 정의
- src/utils: 유틸리티 함수 정의
- src/test: 단위 테스트 코드
- src/types.ts: 타입 정의

> 종류별로 폴더를 분리하여, 파일간 구별을 쉽게 하고 유지보수성을 높이려 했습니다.

<br>

## 구현 기능

### Preview

<img src="./docs/images/timetable.gif" alt="Timetable" style="width: 100%;">

### TODO LIST

- 교시 추가 또는 삭제 시 뒷 교시가 자동 조정되어야 합니다. ✅

  - 1, 2, 3교시가 있을 때, 2교시를 삭제하면 3교시는 2교시로 변경됩니다. ✅
  - 오전 시간대에 1, 2교시, 오후 시간대에 3교시가 있을 때, 오전 시간대에 새로운 교시를 추가하면 기존 오후 시간대의 3교시는 4교시로 변경됩니다. ✅

- 한 시간대(오전, 오후 , 저녁)에는 최대 5개의 교시만 관리할 수 있습니다. ✅

  - 오전 시간대에 1, 2, 3, 4, 5교시, 오후 시간대에 6교시가 있을 때, 5교시를 삭제 하면 오후 시간대의 6교시는 5교시로 변경되고, 오전 시간대로 변경되어야 합니다. ✅

- 삭제 버튼 클릭시 삭제 여부를 확인 할 수 있는 모달이 나타나야 합니다. ✅

- 시간표의 시간을 선택 할 수 있어야 합니다. ✅

  - 각 시간 영역 선택시 시간(00 ~ 24), 분(00 ~ 59) 선택이 가능해야 합니다. ✅

- 페이지 경로는 ‘/timetable’ 로 해주세요. ✅

- 대부분의 사용자는 타블렛 PC 로 사용하지만, 데스크탑에서도 사용 할 수 있도록 해주세요. (페이지 최대너비는 1024px 로 설정하고, 화면의 중앙에 위치시켜 주세요.) ✅

<br>

## 프로젝트 진행하며 집중한 부분

### 상태 관리 라이브러리를 사용하지 않고 리액트의 상태 관리 API를 이용

하나의 페이지로만 구성된 애플리케이션이기 때문에 언뜻보면 상태관리 라이브러리가 필요한가 싶었지만, 컴포넌트를 세분화하는 과정에서 예상치 못한 상태 관리의 복잡성을 경험하게 되었습니다.

컴포넌트를 여러 개로 분리하다보니 모든 상태가 App.tsx에 몰려있었고 그로 인해 Prop Drilling 문제가 발생했습니다. props를 여러 자식 컴포넌트에 전달해야 했는데 이를 해결하기 위해 리액트의 Context API와 useReducer 훅을 활용해 보았습니다.

이번 기회를 통해 외부 라이브러리가 아닌 리액트의 내장 기능만으로 상태 관리 시스템을 구축해 보았는데, 이 과정을 통해 외부 상태 관리 라이브러리 없이 React의 내장 기능만으로 효과적인 상태 관리 시스템을 구축할 수 있다는 것을 깨달았습니다.

이 기회를 통해 코드의 복잡성을 줄이고, 외부 의존성을 최소화하며, React의 핵심 기능에 대해 깊게 이해할 수 있는 좋은 기회가 되었습니다.

### 사용자 경험을 고려한 애플리케이션 개발

사용자 경험을 고려하며 기획을 하다보니 여러가지를 진행해 보고 싶은 욕심이 생겼습니다. 시간 제한이 있는 특수한 상황이었기 때문에 기획한 모든 것을 구현할 순 없었지만 제가 추가 구현한 부분을 소개해 드리겠습니다.

1. 각 시간대의 교시를 추가하는 경우, 두 가지 케이스로 분리해 기획하였습니다.

   1-1. 첫 수업일 때, 각 시간대의 시작 시간에 맞춰 시간을 설정했습니다.

   - 예를 들어, 오후(13:00~) 시간대의 첫 수업을 추가하는 경우에는 13:00 ~ 13:50으로 설정되어 새로운 교시가 생성됩니다.

   1-2. 첫 수업이 아닌 경우, 그 전 수업의 종료 시간을 기준으로 10분 뒤 시간으로 설정했습니다.

2. 수업 시간을 설정할 때 종료 시간이 시작 시간보다 빠르다면 사용자에게 안내 문구를 보여줍니다.

3. 점심, 저녁 식사 시간을 변경하면 각 시간대의 안내 문구에도 반영하였습니다. ex) 오전
   (~11:30)

4. 사이트에 다시 돌아오거나 새로고침을 하더라도 데이터가 유지될 수 있도록 localStorage를 활용하여 시간표 저장 기능을 구현하였습니다.

   4-1. 저장하기 전, 다음과 같은 유효성 검사를 실행하였습니다.

   - 시간대에 맞게 시간을 설정했는지 여부
     - 쉬는 시간 시간대와 겹치지 않는지 여부
   - 각 교시의 종료 시간이 시작 시간 이후인지 검증
   - 각 교시의 시간대가 겹치지 않는지 여부

   4-2. 유효성 검사에 실패한 경우, 관련 안내 문구를 보여줍니다.

특히, 유효성 검사를 진행할 때 제한된 시간 안에 최대한 정확하게 구현하고자 노력했습니다. 고려해야 하는 케이스가 많았기 때문에 코드 베이스가 길어지고 가독성도 떨어지는 것을 느꼈는데, 단일 책임 원칙과 깨끗한 코드, 그리고 재사용성을 계속 되뇌며 코드를 작성하고자 했습니다.

### 단위 테스트 코드 작성

테스트 코드를 작성하는 초반에는 시간 비용이 많이 든다고 생각할 수 있지만 장기적으로 보았을 때 테스트 코드를 통해 예상하지 못한 오류를 발견하거나 예방하는 등 이점이 많다고 생각하여 꾸준히 작성해 보려 하고 있습니다. 이번 프로젝트에서도 컴포넌트별로 단위 테스트 코드를 작성하고 테스트를 실시함으로써 기대한 동작을 확인할 수 있었습니다.

<br>

## 회고

처음 과제를 전달받고 나서 차근차근 구현해야 하는 기능을 정리해 봤습니다. 생각보다 기능이 많고, 고려해야 할 여러 케이스들도 있어 조바심이 들었지만 작은 단위로 칸반을 작성하고 기능을 구현해 보았습니다. 그 과정에서 사용자 경험을 고려하며 기획했고 더 나은 코드를 작성하기 위해 치열하게 고민해 봤습니다.

사실 타입스크립트 강의는 들어본 적이 있지만 이렇게 본격적으로 프로젝트에 적용하는 건 이번 과제가 처음이었는데 직접 사용해 보면서 타입스크립트의 장점을 몸소 체험할 수 있었습니다. 특히 상태 관리가 복잡해 짐에 따라 중간에 context API와 useReducer로 변경했는데, 그 과정에서 타입스크립트의 편리함을 느낄 수 있었습니다.

이번 프로젝트를 통해 새로운 경험을 해볼 수 있어서 소중한 경험이었고, 이 과제를 발판삼아 더 나은 개발자로 성장하기 위해 노력하겠습니다.

마지막으로 과제를 진행할 수 있는 좋은 기회를 주셔서 감사합니다.
