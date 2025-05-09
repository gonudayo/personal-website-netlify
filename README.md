# 개인 목표 시각화 대시보드

이 프로젝트는 개인 목표에 대한 진행 상황을 시각화하고 추적하기 위해 만들어진 개인 웹 애플리케이션입니다.

**Live Demo: [workhard.netlify.app](https://workhard.netlify.app)**

## 1. 기능

* 실시간 주식 자산 가치
* 실시간 암호화폐 자산 가치
* 백준 해결 문제 수 및 일일 변동량
* GitHub 커밋 수 및 일일 변동량

## 2. 기술 스택

* **프론트엔드**
    * HTML/CSS/JavaScript
* **백엔드 (AWS Lambda API):**
    * Python (주식 데이터 스크래핑용)
    * Node.js (백준/GitHub 데이터 스크래핑 및 DynamoDB 연동용)
* **호스팅**
    * Netlify (정적 프론트엔드 웹사이트용)
* **데이터베이스**
    * AWS DynamoDB (일일 백준/GitHub 통계 저장을 위한 NoSQL 데이터베이스)
* **스케줄링**
    * Amazon EventBridge (일일 데이터 수집 스케줄링용)

## 3. 저장소

* **AWS Lambda:** [gonudayo/personal-website-aws](https://github.com/gonudayo/personal-website-aws)
