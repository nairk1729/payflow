# PayFlow — Architecture Overview

## 1. Purpose

PayFlow is a lightweight hosted payments platform for small businesses.

The architecture is designed to support a simple MVP first:
- merchant onboarding
- payment link creation
- hosted checkout
- payment confirmation
- basic transaction tracking

At the same time, the system is structured to evolve into a provider-agnostic payments orchestration layer.

---

## 2. Architecture Goals

### Primary Goals
- Keep the MVP simple and fast to build
- Support secure payment processing
- Reduce merchant setup friction
- Provide clean separation between product logic and payment provider logic

### Secondary Goals
- Enable future support for multiple payment providers
- Allow expansion into embeddable checkout and analytics
- Maintain a clear path to scale

---

## 3. High-Level System Design

PayFlow consists of four main layers:

1. **Frontend**
2. **Backend API**
3. **Payment Adapter Layer**
4. **Database**

### High-Level Flow

```text
Merchant/User
   ↓
Frontend (Dashboard + Payment Pages)
   ↓
Backend API
   ↓
Payment Adapter Layer
   ↓
Stripe (v1)