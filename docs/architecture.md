# Open Mool - System Architecture & Deployment

## 1. High-Level Overview
Open Mool is a **hybrid cloud/edge** system designed for long-term data preservation ("The Vault") and real-time public access ("The Gallery").

### Core Pillars
1.  **The Platform (Next.js + Cloudflare Pages)**: Handles User UI, Auth, and Metadata.
2.  **The Vault (Cloudflare R2)**: Zero-egress Object Storage for raw vs. optimized media.
3.  **The Refinery (AI Pipeline)**: Async processing for transcription, translation, and entity extraction.

---

## 2. Tech Stack & Separation of Concerns

To ensure maximum security and separation of concerns:

### **Frontend (`apps/web`)**
*   **Role**: UI, Client-side Auth handling, Visuals.
*   **Tech**: Next.js 14+ (App Router).
*   **Security**: ZERO access to Database/Storage bindings. Talks only to `apps/api` and Auth0.

### **Backend (`apps/api`)**
*   **Role**: Business Logic, Database Access, File Signing, AI Orchestration.
*   **Tech**: Cloudflare Workers (Hono.js framework recommended for routing).
*   **Security**: Holds all D1 (DB), R2 (Storage), and AI bindings. Validates Auth0 tokens on every request.

---

## 3. Data Architecture (Schema Strategy)

### A. Users (`users` table)
*The "Trust" Layer*
- `id` (String): Primary Key (Auth0 User ID).
- `username` (String): Unique handle.
- `role` (String): `scout`, `guardian`, `archivist`.
- `karma` (Integer): Reputation points.

### B. Submissions (`submissions` table)
*The "Raw" Layer*
- `id` (String): UUID Primary Key.
- `user_id` (String): FK to `users`.
- `status` (String): `pending`, `processing`, `verified`, `rejected`.
- `metadata` (JSON): Flexible schema for strict fields (Geolocation, Elder Name, Village).
- `raw_asset_key` (String): R2 Key for Cold Bucket.
- `processed_asset_key` (String): R2 Key for Public Bucket.

### C. Knowledge Graph (`tags`, `entities` tables)
*The "Taxonomy" Layer*
- `id` (String): UUID.
- `category` (String): `Mythology`, `Oral History`, etc.
- `name` (String): e.g., "Nanda Devi", "Jagar".

---

## 4. The AI Refinery (Processing Pipeline)
*Asynchronous Event-Driven Architecture*

1.  **Ingest:** Frontend requests "Signed Upload URL" from Backend → Backend returns secure R2 URL → Frontend uploads file.
2.  **Queue:** Upload triggers Cloudflare Queue (or Backend enqueues job).
3.  **Process:**
    -   **Backend Worker**: Runs inference (Whisper/LLM).
4.  **Update:** Backend updates D1 `submissions` table.

---

## 5. Deployment Strategy

### Frontend (`apps/web`) -> Cloudflare Pages
- **Build**: `next build` (Static Export or `next-on-pages` without bindings).
- **Env**: Public API URL, Auth0 Client ID.

### Backend (`apps/api`) -> Cloudflare Workers
- **Framework**: Hono.
- **Bindings**: `D1`, `R2`, `AI`.
- **Secrets**: `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`.


### Environment Variables
- `AUTH0_SECRET`, `AUTH0_BASE_URL`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`.

## 6. Security (The "Gatekeeper")
- **Authentication:** Handled by Auth0. Session validation on Edge.
- **D1 Security:** Access solely via bound Workers/Pages functions. No public database exposure.
- **R2 Security:** Signed URLs for uploads. Public bucket for read-only gallery assets.
