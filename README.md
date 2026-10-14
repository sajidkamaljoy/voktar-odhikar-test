# Voktar Odhikar

> **Note:** this project was originally developed under my earlier GitHub account, [sajid43677/voktar-odhikar-test](https://github.com/sajid43677/voktar-odhikar-test), and was moved to this account in October 2026.

[![CI](https://github.com/sajidkamaljoy/voktar-odhikar-test/actions/workflows/ci.yml/badge.svg)](https://github.com/sajidkamaljoy/voktar-odhikar-test/actions/workflows/ci.yml)

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
cp .env.example .env   # then fill in DB_USERNAME, DB_PASSWORD, DB_NAME and SESSION_SECRET
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

- Database credentials and the session secret are read from environment variables (`3npbackend/.env`, see `.env.example`). The backend refuses to start without `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` and a `SESSION_SECRET` of at least 32 characters. Generate one with `openssl rand -base64 48`. `.env` is git-ignored.
- `Puppeteer` downloads a Chromium build on `npm install`, so the first install is large.
- The old `vo-be` repo was an earlier, source-less copy of the backend. This repo is the complete one.
