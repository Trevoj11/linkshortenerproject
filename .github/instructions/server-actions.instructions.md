---
description: Read this file before implementing or modifying server actions or data mutations.
---
# Server Action Guidelines

## 1. Use Server Actions for Mutations

ALL data mutation in this app MUST be performed through Server Actions. Server Actions MUST be called from Client Components.

## 2. File Placement and Naming

Server Action files MUST be named `actions.ts` and colocated with the Client Component that calls them.

## 3. Type and Validate Inputs

All data passed to Server Actions MUST use appropriate TypeScript types. DO NOT use the `FormData` TypeScript type. Every Server Action MUST validate its inputs with Zod before performing any database operation.

## 4. Authenticate Before Database Access

Every Server Action MUST first verify that a user is logged in. It MUST stop before any database operation when the user is unauthenticated.

## 5. Return Structured Results

Server Actions MUST NOT throw errors. They MUST return an object containing either an `error` property or a `success` property so calling Client Components can handle the result explicitly.

## 6. Use Data Helpers for Database Operations

Database operations MUST be implemented in helper functions that wrap Drizzle queries. These helpers belong in the `/data` directory. Server Actions MUST NOT contain or call Drizzle queries directly; they should call the appropriate `/data` helper instead.
