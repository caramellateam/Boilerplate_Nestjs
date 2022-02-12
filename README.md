# NESTJS BACKEND BOILERPLATE



### 구동 요구사항

- NODEJS : v16*





### 명령어 리스트



- dev
  - `NODE_ENV=development`로 서버 시작됨
- start
  - `NODE_ENV=proudction`로 서버 시작됨 ( typescript )
- prod
  - `NODE_ENV=production`으로 서버 시작됨 ( javascript ) 컴파일 하여 실행
- debug
  - `NODE_ENV=development`로 디버깅 시작함
- build
  - js `dist` 폴더로 빌드
- format
  - lint formating
- typeormshell:dev
  - `NODE_ENV=development`typeorm 데이터베이스 연결 쉘 반환
- migration:cdev
  - `NODE_ENV=development` typeorm 마이그레이션 생성
- migration:cprod
  - `NODE_ENV=development` typeorm 마이그레이션 생성
- migration:rundev
  - `NODE_ENV=development` typeorm 마이그레이션 실행
- migration:runprod
  - `NODE_ENV=production`typeorm 마이그레이션 실행
- migration:revertdev
  - `NODE_ENV=development` typeorm 되돌리기 실행
- migration:revertprod
  - `NODE_ENV=production` typeorm 되돌리기 실행
- lint
  - lint  오류 검사 및 자동 수정
- test
  - jest 테스트 실행
- test:watch
  - jest 테스트 실행 ( 감시형 )
- test:cov
  - jest 테스트 커버리지 검사
- test:debug
  - jest 테스트 디버깅
- test:e2e
  - 종단간 ( end - to - end ) 테스트 실행
- patch
  - 버전 업데이트 ( 0.0.1 ) 증가
- minor
  - 버전 업데이트 ( 0.1.0 ) 증가
- major
  - 버전 업데이트 ( 1.0.0 ) 증가

### Contribute Rule / Commit Rule 등 : Wiki 참조

**[WIKI](https://github.com/caramellateam/backend-boilerplate/wiki/BOILERPLATE---BACKEND)**