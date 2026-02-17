

# Balkan DE – Život u Njemačkoj

A central digital platform for Balkans diaspora in Germany, featuring trusted Q&A guides, a business directory, and premium content access.

---

## Phase 1: Foundation & Design System

- Set up the visual identity: clean white background, blue accent color, subtle Balkan-inspired design elements
- Create the responsive layout shell with mobile-first navigation (header, footer, mobile menu)
- Build the **Home Page** with the three main action buttons: "Došao sam u Njemačku", "Već sam ovdje", "Imam problem"
- Create legal pages: Impressum, Datenschutzerklärung, Disclaimer
- Category icons and consistent typography throughout

## Phase 2: Backend Setup (Lovable Cloud + Supabase)

- Enable Lovable Cloud for database, auth, and edge functions
- Set up database tables:
  - **profiles** (id, email, is_premium, created_at, last_login_at)
  - **user_roles** (separate table for admin/user roles — security best practice)
  - **qa_items** (question, short_answer, step_by_step, category, tags, sources, is_premium, last_updated)
  - **directory_listings** (name, category, city, address, phone, website, description, origin_country, verified)
  - **payments** (user_id, provider, transaction_id, amount, currency, status, paid_at)
- Configure Row-Level Security policies for all tables
- Set up authentication with email/password (no extra personal data collected)
- Implement forgot password flow with reset page

## Phase 3: Knowledge Base (Q&A Module)

- Build the Q&A browsing page with search bar and category/tag filters
- Display 9 categories: Dolazak, Stan, Posao, Auto, Porezi, Zdravstvo, Porodica, Prava i pomoći, Problemi
- Individual Q&A detail page showing question, short answer, step-by-step guide, and source links
- **Access control**: Free users see short_answer only; premium users see full content with step-by-step guides
- Connect the three home page buttons to filtered Q&A views

## Phase 4: Business Directory

- Public directory listing page with filters for city, category, and origin country (BIH, SRB, HR, MK, CG, AL, KS)
- Individual business detail cards with all listing fields
- Public submission form "Dodaj svoj biznis" — submissions default to verified = false
- Search functionality across business names, categories, and cities

## Phase 5: Stripe Payment Integration

- Enable Stripe integration for one-time €30 premium payment
- Payment success page that sets user's is_premium to true
- Payment failure/cancel page with retry option
- Store payment records in the payments table (provider, transaction_id, amount, status, paid_at)

## Phase 6: Admin Dashboard

- Admin-only dashboard (role-protected)
- **Q&A Management**: Create, edit, delete Q&A entries with rich text for step-by-step guides
- **Directory Management**: View, edit, verify/reject business submissions
- **User Management**: View users, toggle premium status, manage roles
- **Payment Overview**: View payment history and statuses
- **Statistics**: Basic counts and overview metrics (users, premium users, Q&A items, listings)

## Phase 7: Polish & Production Readiness

- Responsive testing across mobile, tablet, and desktop
- Loading states, error handling, and toast notifications throughout
- GDPR-friendly: minimal data collection, account deletion option in user settings
- Performance optimization for fast search and page loads
- Final UI polish with smooth transitions and consistent spacing

