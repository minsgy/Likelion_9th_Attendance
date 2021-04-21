# 🦁Likelion_9th_Attendance
🦁 LIKELION 9th At Soonchunhyang [ToyProject]

## 🔗 해당링크
- [접속하기](https://schlikelion.org/)

## 😀프로젝트 내용
- 멋쟁이사자처럼 9기 운영진 스터디 개인 프로젝트
- Session 출석부 프로그램 제작하기

## 체크 리스트

- [x] Schedule 생성 + 실시간 적용 업데이트 완료
- [x] Schedule 리스트 출력
- [x] Schedule 리스트 날짜 정렬 구현
- [x] User 모델 생성 + 실시간 적용 업데이트 완료
- [x] User 리스트 출력 + 실시간 적용 업데이트 완료
- [x] 유저 학번 순 정렬 구현
- [x] User Attendance State 생성 구현 + 실시간 업데이트 완료
- [x] User Attendance 무한 rendering Fix
- [x] Modal Page 구현 (스케줄, 유저 생성 Page)
- [x] AttendPage 구현(리스트, 출석/지각/결석 여부..)
- [x] Auth 인증 페이지 구현 (운영진 전용 코드 제공)
- [x] 총 출석 현황 리스트 페이지 구현
- [x] 출석현황 페이지 이동 버튼 SidePanel_Header에 추가

## 🔨개발 과정 및 기간
- 2021년 01. 15. ~ 22, 약 7일
- React를 배우고 처음으로 활용한 ZeroBase 프로젝트
- 🅱[Velog 시리즈 - LikeLion 출석부 제작하기](https://velog.io/@minsgy/series/Toyproject)

## 📃 사용한 개발 스택

![image](https://user-images.githubusercontent.com/60251579/104798928-3ceec700-580e-11eb-8346-cc81394b5324.png)

- JS (ES6)
- React
- Redux
- Firebase
- Bootstrap
- AntdDesign


## 🔨 서버 실행 법
1. 클론을 받은 후, `package.json` 파일위치로 이동하여 `npm install` 패키지 다운로드 합니다.
2. Firebase 프로젝트를 만든 후, Firebase console에 접속하여 Web app을 추가합니다.
3. Firebase Console에서 Firebaseconfig 객체를 복사하여, `src`폴더에 `firebase.js`를 추가합니다.
4. `firebase.js` 설정 화면입니다. SDK 키를 firebaseConfig에 넣어 설정해줍니다.  
> ![image](https://user-images.githubusercontent.com/60251579/105568483-028ca900-5d7d-11eb-904b-7258a53edb8f.png)
5. `yarn start` , `npm run start` 로 로컬 서버를 실행합니다.

---

## 📃 프로그램 사용법 및 운영진 관리 페이지
1. 기본 설정 된 코드 종류
- `likelion` 유저(출석 확인 페이지) 
- `likelionadmin` 운영진 (출석 관리 + 출석 확인 페이지),
- `울부짖어라밈미` 고양이 이스터에그(순천향대 9기 운영진 고양이)
- `울어라두부` 강아지 이스터에그(순천향대 9기 운영진 강아지)

2. 세션 일정 등록 및 학생 등록
- ![image](https://user-images.githubusercontent.com/60251579/105568593-053bce00-5d7e-11eb-9892-33c169110308.png)

3. 출석 체크 사용법
- 왼쪽 세션 리스트를 선택하여, 해당 스케줄에 맞는 학생 출석 리스트가 나열됨.
- 3가지 Selectbox 중, 클릭 시 오른쪽 상태 값(서버에 바로 전송되어, 저장된 값을 출력함)이 변하면 적용됨을 확인 가능.
- **주의 할점** 해당 날짜에 모든 학생은 출석/지각/결석을 선택해줘야함. 그렇지 않으면 전체 출결 페이지가 논리 오류가 발생하여 정상 출력 불가
- ![image](https://user-images.githubusercontent.com/60251579/105568623-2ef4f500-5d7e-11eb-8ae1-a6b4fb4a26b8.png)
- Tip! `Tab`키와 방향키를 사용하여 빠르게 출석체크 가능함. 
- **다른 스케줄 넘어 갈 시 select 값이 유지 되는데 서버에 저장되는 것이 아니므로 다시 선택이 필수!**

4. 전체 출석 확인 페이지 이용법
- 사이드 메뉴바에 `전체 출석 리스트 보기` Click 시, 메인 패널에 나타남.
- 별 다른 기능 없이, 제대로 리스트가 출력이 되지 않으면 `리스트 새로고침`을 클릭해야함.
- 색깔 안내표를 확인하고 한 눈에 확인 할 수 있음.
![image](https://user-images.githubusercontent.com/60251579/105568699-d2460a00-5d7e-11eb-922b-169e5196db69.png)
