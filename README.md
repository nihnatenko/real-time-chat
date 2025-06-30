# 📨 Real-Time Chat App with NestJS, MySQL, AWS Lambda, and WebSocket

## 📋 Description

A simple real-time chat application built with **NestJS**, using:
- WebSocket (via Socket.IO) for instant communication
- MySQL for message history storage
- AWS Lambda for serverless message processing (e.g., sanitization)
- REST API to retrieve chat history

---

## 📁 Project Structure

```
chat-app/
├── backend/              # NestJS backend app
│   ├── src/
│   │   ├── chat/         # WebSocket gateway
│   │   ├── message/      # Message entity, service and controller
│   │   └── appModule.ts
│   ├── main.ts
├── lambda/               # AWS Lambda function
│   ├── processMessage.js
│   └── template.yaml
├── frontend/             # Simple HTML frontend client
│   └── index.html
├── package.json          # Root-level npm config
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup & Run

### 🔧 Backend (NestJS)

```bash
npm install
npm run start:dev
```

### 💾 MySQL

Create a MySQL database:
```sql
CREATE DATABASE chat_db;
```

Ensure your database is configured properly in `backend/src/appModule.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'chat_db',
  synchronize: true,
  entities: [Message],
})
```

---

### 🌐 Frontend
```
Open: frontend/index.html
```

---

### ☁️ AWS Lambda Deployment

Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html):

```bash
cd lambda
sam build
sam deploy --guided
```

During `sam deploy`, choose:
- A region (e.g. `eu-central-1`)
- A new or existing S3 bucket

After deployment, SAM will output your Lambda endpoint:
```
https://<api-id>.execute-api.<region>.amazonaws.com/dev/process
```

### 🧩 Integrate Lambda with NestJS

Update `chatGateway.ts` with the real Lambda URL:

```ts
const response = await axios.post('https://<your-lambda-endpoint>', payload);
```

---

## ✅ How It Works (End-to-End)

1. Client opens WebSocket connection to `ws://localhost:3000/chat`
2. Sends a message like `{ userId: 1, content: "Hello badword" }`
3. NestJS forwards it to AWS Lambda for sanitization
4. Lambda returns `{ userId: 1, content: "Hello ***", timestamp: ... }`
5. NestJS saves it in MySQL and emits it to all WebSocket clients
6. Clients display the message in real time

---

## 📄 REST API

To retrieve chat history:
```
GET /messages?limit=10&offset=0
```
Returns paginated messages from MySQL.

---

## 🧪 Running Tests

This project one unit test to check the connection to the websocket:

### Install dependencies (if not done):
```bash
npm install
```

### Run test in root folder of the project:
```bash
node test.js
```

### Local checks for lambda:
```bash
curl -X POST https://<lambda-endpoint>/process \
  -H "Content-Type: application/json" \
  -d '{"userId":1, "content":"This is badword"}'
```
