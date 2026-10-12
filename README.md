# Voktar Odhikar

**Voktar Odhikar** (Bengali for "consumer rights") is a web platform that connects food distributors, industries and admins around fair pricing and trust. Distributors list products and prices, industries request quantities, and admins verify participants, red-list bad actors and send notices.

The repo has two apps:

| Folder | Stack |
|---|---|
| `3npbackend/` | NestJS 10 + TypeORM + PostgreSQL, Redis cache, session-based auth |
| `3npfrontend/` | Next.js 14 + React 18 + Tailwind CSS + Axios |

## Features

- **Four user types** (`users/admin`, `users/distributor`, `users/industry`, `users/user`), each with their own sign-up, login, profile editing and route guards.
- **Distributors:** add, edit and delete stock products; update price and quantity; record deliveries; see their area and red-list status; upload a license for verification.
- **Industries:** place and edit product requests, view distributor products (including area-wise), and receive reports and notices.
- **Admins:** review verification requests and approve them, red-list or un-red-list distributors and industries, send notices or reports, and manage admin profiles.
- **Reference prices:** vegetable, fruit, meat and fish prices are collected from [Chaldal](https://chaldal.com/) with Puppeteer, so participants can compare against market prices.
- **Performance:** responses are cached in Redis through the NestJS cache manager.

## Backend modules

`Industry Product`, `Distributor Product`, `Request Amount`, `Delivered Quantity`, `Verification`, `Red Lists`, `Report and Notice` and `All Profile`, each with its own entity, DTO and service.

## Run it locally

Requirements: Node.js 18+, PostgreSQL and Redis.

**Backend** (port 3000)

```bash
cd 3npbackend
npm install
# set your PostgreSQL and Redis settings in src/app.module.ts, and the session secret in src/main.ts
npm run start:dev
```

**Frontend** (port 7000)

```bash
cd 3npfrontend
npm install
npm run dev
```

Open `http://localhost:7000`. The backend allows cross-origin requests with credentials so the session cookie works between the two ports.

## Notes

- Database credentials and the session secret are currently written in source (`app.module.ts`, `main.ts`). Move them to environment variables (`@nestjs/config` is already installed) before deploying.
- `Puppeteer` downloads a Chromium build on `npm install`, so the first install is large.
- The old `vo-be` repo was an earlier, source-less copy of the backend. This repo is the complete one.
