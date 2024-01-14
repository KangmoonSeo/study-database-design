# 데이터베이스 Term-Project 설명
> 실행 GIF 화면: 
> https://kangmoonseo.github.io/database-design/README.md

## 빠른 시작
1. .env를 USER, PASSWORD로 채워넣어주세요.
    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=q1w2e3r4
    ```
2. mysql cli에서 다음 DDL, DML 스크립트를 순차적으로 실행해주세요. 
    ```bash
    # PWD : ./term-project 
    mysql -u root -p

    # enter password
    ```
    ```bash
    # in mysql

    source ./database/static/0.create-table.sql;
    source ./database/static/1.Medical_specialty.sql
    source ./database/static/2.Doctor.sql;
    source ./database/static/3.Nurse.sql;
    source ./database/static/4.Patient.sql;
    source ./database/static/5.Inpatient.sql;
    source ./database/static/6.Reservation.sql;
    source ./database/static/7.Examination.sql;
    source ./database/static/8.Treatment.sql;
    source ./database/static/9.alter-index.sql;
    ```
3. node를 실행해주세요.
    ```
        npm run start
    ```