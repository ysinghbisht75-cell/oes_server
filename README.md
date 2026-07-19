# OES Backend

Express and MongoDB API for the Online Examination System.

## Run

From the `OES/backend` folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Default API URL:

```text
http://localhost:5000/api
```

Default MongoDB database:

```text
mongodb://127.0.0.1:27017/oes
```

## Exam Management API

```text
GET    /api/exams
GET    /api/exams/:id
POST   /api/exams
PUT    /api/exams/:id
DELETE /api/exams/:id
```

## Question Management API

```text
GET    /api/questions
GET    /api/questions/:id
POST   /api/questions
PUT    /api/questions/:id
DELETE /api/questions/:id
```
