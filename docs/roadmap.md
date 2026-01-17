# Open Mool Roadmap

**Mission:** To build the world’s first open-source, AI-ready multimodal archive for the Himalayan region.

## Phase 1: The Trident (MVP)
**Goal:** Robust security, automated processing, and public access.

### 1.1 The Platform Foundation
- [ ] **Web App:** Secure, mobile-first web app (Next.js/Cloudflare Pages).
- [ ] **Auth ("The Gatekeeper"):** Robust login via **Auth0** (Google/Email) with strict identity verification.
- [ ] **Infrastructure:** Cloudflare D1 (Database) & R2 (Storage).

### 1.2 The Submission Node (Input)
- [ ] **Zero-Friction Uploader:** Audio/Video upload interface.
- [ ] **Metadata Enforcement:** Mandatory geolocation tags and "Source" details (Elder Name/Village).
- [ ] **Offline Mode:** Cache uploads to sync later for remote connectivity.

### 1.3 The AI Refinery (Processing)
- [ ] **Ingest Pipeline:** Automated cleaning and normalization of audio levels.
- [ ] **Transcribe & Tag:** Whisper (fine-tuned for Hindi/Indian English) for base scripts.
- [ ] **Entity Extraction:** LLMs to extract Deities, Places, Rituals.
- [ ] **Sovereign Storage:** Raw assets in cold storage; optimized versions for the gallery.

### 1.4 The Gallery (Output)
- [ ] **Public Feed:** Spotify-style interface for audio, Instagram-style for visuals.
- [ ] **Search:** Intelligent retrieval system.
- [ ] **API Access:** For verified researchers.

## Phase 2: Data Architecture & Trust Layer
**Goal:** Structured relationships and trusted community.

### 2.1 User Roles ("The Trust Layer")
- [ ] **Identity:** Auth_ID, Name, Profile_Pic, Affiliation.
- [ ] **Reputation System:** Karma Points, Levels (Scout, Guardian, Archivist).
- [ ] **Permissions:** Role-based access control.

### 2.2 Taxonomy ("The Knowledge Graph")
- [ ] **Categories:** Mythology (Dev-Gatha), Oral History (Itihas), Rituals (Reeti-Rivaj), Indigenous Knowledge (Gyaan), Performing Arts (Kala), Language (Boli).

## Phase 3: The Community Engine
**Goal:** A self-regulating, gamified ecosystem.

### 3.1 Heritage Certification
- [ ] **Scout:** 1-10 verified uploads (Badge, Discord access).
- [ ] **Guardian:** 50+ uploads or 5 creative remixes (Certificate, API access).
- [ ] **Archivist:** Top 1% contributors (Moderation privileges).

### 3.2 Content Loops
- [ ] **Incentives:** Points for uploads and "Creative Remixes".

## Phase 4: Strategic Value & Expansion
- [ ] **Pahadi LLM:** Training data curation for regional language models.
- [ ] **Partnerships:** Institutional alignments.
