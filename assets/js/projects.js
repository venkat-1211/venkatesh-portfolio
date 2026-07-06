/* =====================================================
   PROJECTS.JS — Project Modal & Gallery System
   ===================================================== */

'use strict';

// ─── Project Data ─────────────────────────────────────
const PROJECT_DATA = {
  lms: {
    title: 'Learning Management System',
    type: 'PHP / Laravel',
    description: 'A comprehensive Learning Management System built with Laravel 10, featuring course management, student enrollment, video lessons, quizzes, certificates, and Stripe payment integration.',
    features: [
      'Multi-role auth: Admin, Instructor, Student (RBAC)',
      'Course builder with video/PDF lessons and quizzes',
      'Student enrollment and progress tracking',
      'Automated certificate generation (PDF)',
      'Stripe payment integration for paid courses',
      'Real-time notifications via Laravel Events & Broadcasting',
      'RESTful API for mobile app consumption',
      'Admin dashboard with analytics and reports'
    ],
    tech: ['Laravel 10', 'PHP 8.2', 'MySQL', 'Redis', 'JWT Auth', 'Laravel Echo', 'Stripe API', 'PDF Generator'],
    database: 'MySQL with 25+ normalized tables. Eloquent ORM with eager loading to prevent N+1 queries. Redis cache for course content and user sessions.',
    architecture: 'MVC + Service Pattern + Repository Pattern + Action Classes. Queued jobs for email notifications and certificate generation. Event-driven for real-time features.',
    challenges: 'Handling concurrent video streaming, preventing N+1 queries on complex enrollment relationships, and building a real-time progress sync system.',
    solutions: 'Implemented Redis caching layer, lazy-loaded Eloquent relationships, and Laravel Echo + Pusher for WebSocket-based real-time updates.',
    performance: '70% query reduction via Redis caching. Video CDN via AWS S3 + CloudFront. Background jobs for heavy PDF generation tasks.',
    security: 'JWT tokens with refresh rotation, RBAC with Spatie Permission, CSRF protection, SQL injection prevention via Eloquent, rate limiting on API endpoints.',
    demo: '#',
    github: '#',
    cover: 'assets/images/projects/lms-cover.png'
  },
  property: {
    title: 'Property Management System',
    type: 'Full Stack (Laravel + Django)',
    description: 'A dual-stack property management platform — Laravel for the web portal and Django REST Framework for the analytics microservice. Manages properties, tenants, leases, maintenance, and financials.',
    features: [
      'Property listing and unit management',
      'Tenant portal with online rent payment',
      'Lease lifecycle management (draft → active → expired)',
      'Maintenance request ticket system',
      'Financial reporting: rent roll, P&L, cash flow',
      'Django-powered analytics microservice with charts',
      'AWS S3 for document and image storage',
      'Email and SMS notifications'
    ],
    tech: ['Laravel 10', 'Django DRF', 'PostgreSQL', 'AWS S3', 'AWS RDS', 'Redis', 'Docker', 'Celery'],
    database: 'PostgreSQL on AWS RDS. Separate schemas for property data and analytics. Cross-service communication via REST API calls.',
    architecture: 'Hybrid architecture: Laravel monolith for CRUD operations + Django microservice for analytics. Docker Compose for local dev, AWS ECS for production.',
    challenges: 'Keeping data in sync between two separate backend services without introducing tight coupling.',
    solutions: 'Event-driven sync using AWS SQS message queue. Analytics service consumes events from Laravel and maintains its own read-optimized data model.',
    performance: 'Analytics queries optimized with PostgreSQL materialized views. Celery workers for async report generation.',
    security: 'OAuth2 between services, encrypted S3 buckets, RDS at-rest encryption, audit log on all lease changes.',
    demo: '#',
    github: '#',
    cover: 'assets/images/projects/property-cover.png'
  },
  realestate: {
    title: 'Real Estate CRM',
    type: 'Python / Django',
    description: 'A Django-powered CRM for real estate agencies. Manages leads, properties, client relationships, agent performance, and sales pipeline with a rich analytics dashboard.',
    features: [
      'Lead capture and pipeline management (Kanban board)',
      'Property database with search and filtering',
      'Agent assignment and performance tracking',
      'Client relationship management (contacts, history)',
      'Automated follow-up email sequences (Celery)',
      'Sales analytics: conversion rates, revenue forecasts',
      'Django REST Framework API for mobile companion app',
      'Role-based access: Admin, Manager, Agent, Client'
    ],
    tech: ['Django 4.2', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'Graphene (GraphQL)', 'Bootstrap 5', 'Chart.js'],
    database: 'PostgreSQL with custom indexes on frequently filtered columns (location, price, status). Django ORM with select_related for query optimization.',
    architecture: 'Django MVT with DRF for API layer. GraphQL endpoint (Graphene-Django) for the analytics dashboard. Celery + Redis for async tasks.',
    challenges: 'Building a complex filtering/search system on 50,000+ property records with sub-200ms response times.',
    solutions: 'PostgreSQL full-text search, composite indexes, Redis cache for repeated filter results, and Django Q objects for dynamic query building.',
    performance: 'Search response time reduced from 1.2s to 180ms via indexing + Redis cache. Celery offloads all email sending to background workers.',
    security: 'Django RBAC with custom permission classes, DRF throttling, JWT authentication via SimpleJWT, HTTPS enforced.',
    demo: '#',
    github: '#',
    cover: 'assets/images/projects/realestate-cover.png'
  },
  employee: {
    title: 'Employee Management System',
    type: 'PHP / Laravel',
    description: 'A comprehensive HR and Employee Management platform built on Laravel. Handles employee lifecycle, attendance, payroll, leave management, and performance reviews.',
    features: [
      'Employee profiles with departments and hierarchy',
      'Biometric/manual attendance tracking',
      'Payroll calculation with tax deductions (India-specific)',
      'Leave management with approval workflows',
      'Performance review cycles (OKR + KPIs)',
      'Document management (contracts, ID proofs)',
      'Role-based access: Super Admin, HR, Manager, Employee',
      'Excel/PDF export for payslips and reports'
    ],
    tech: ['Laravel 10', 'PHP 8.1', 'MySQL', 'Redis', 'JWT Auth', 'Spatie Permission', 'Laravel Excel', 'DomPDF'],
    database: 'MySQL with normalized schema for employees, attendance, and payroll. Stored procedures for monthly payroll computation.',
    architecture: 'Laravel MVC + Service Layer + Repository Pattern. Action classes for complex business logic (payroll calculation). Observer pattern for audit logs.',
    challenges: 'Complex payroll calculation with multiple Indian tax brackets, PF, ESI, and variable components varying by employee grade.',
    solutions: 'Encapsulated payroll logic in a dedicated PayrollCalculatorService with a strategy pattern for different salary structures. Unit tested with PHPUnit.',
    performance: 'Payroll generation for 200 employees under 3 seconds using database transactions and batch inserts.',
    security: 'Column-level data encryption for salary info, RBAC with row-level scoping (employees only see their own data), complete audit trail.',
    demo: '#',
    github: '#',
    cover: null
  },
  research: {
    title: 'Research Publication System',
    type: 'Python / Django + FastAPI',
    description: 'Academic research publication platform for a university consortium. Handles manuscript submissions, peer review assignments, editorial decisions, and DOI registration via Crossref API.',
    features: [
      'Author manuscript submission and revision tracking',
      'Multi-round peer review with blind review support',
      'Editorial board workflow and decision management',
      'DOI registration via Crossref API integration',
      'Full-text search across published papers (Elasticsearch)',
      'FastAPI microservice for PDF processing and indexing',
      'Author bibliometrics and citation tracking',
      'Open Access publishing with Creative Commons licensing'
    ],
    tech: ['Django 4.2', 'FastAPI', 'PostgreSQL', 'Elasticsearch', 'Celery', 'AWS S3', 'Docker', 'Crossref API'],
    database: 'PostgreSQL for relational manuscript/review data. Elasticsearch for full-text search across paper content and metadata.',
    architecture: 'Django for main application + FastAPI microservice for PDF text extraction and Elasticsearch indexing. Async processing via Celery.',
    challenges: 'Processing and indexing thousands of PDF files for full-text search while keeping the main application responsive.',
    solutions: 'FastAPI async endpoint receives uploaded PDFs, extracts text using PyMuPDF, and queues Elasticsearch indexing via Celery. Main Django app unblocked.',
    performance: 'PDF processing via async FastAPI workers. Search returns 10,000+ results in <100ms via Elasticsearch sharding.',
    security: 'Double-blind review ensures author anonymity. Separate auth tokens for reviewer and author roles. S3 presigned URLs for PDF access.',
    demo: '#',
    github: '#',
    cover: null
  },
  filerepo: {
    title: 'Secure File Repository',
    type: 'Python / FastAPI',
    description: 'An enterprise-grade encrypted file storage system built with FastAPI. Features AES-256 encryption, role-based access control, version history, audit logs, and AWS S3 storage backend.',
    features: [
      'AES-256 client-side file encryption before upload',
      'Role-based access: Owner, Collaborator, Viewer, Admin',
      'File versioning with diff viewer for text files',
      'Comprehensive audit log for all file operations',
      'Shareable links with expiry and password protection',
      'Virus scanning via ClamAV integration',
      'AWS S3 storage with server-side encryption',
      'FastAPI async API with sub-50ms response times'
    ],
    tech: ['FastAPI', 'Python 3.11', 'MongoDB', 'Motor (async)', 'AWS S3', 'Redis', 'JWT', 'ClamAV', 'Docker'],
    database: 'MongoDB for flexible file metadata and access control lists. Motor async driver for non-blocking DB operations. Redis for session cache.',
    architecture: 'FastAPI async application with Motor for MongoDB. Background tasks for virus scanning and encryption key rotation. S3 as storage backend.',
    challenges: 'Implementing end-to-end encryption where even server admins cannot read file content, while still allowing sharing between users.',
    solutions: 'Per-file encryption keys encrypted with user public keys. Sharee receives re-encrypted key via Key Encapsulation Mechanism (KEM). Server never sees plaintext.',
    performance: 'Async FastAPI achieves 3000+ req/sec on a single instance. S3 multipart upload for files >10MB. Streaming response for large downloads.',
    security: 'AES-256-GCM encryption, key management per user, JWT auth, rate limiting, ClamAV virus scan on upload, complete audit trail.',
    demo: '#',
    github: '#',
    cover: null
  },
  journal: {
    title: 'Journal Management System',
    type: 'PHP / Laravel',
    description: 'Academic journal management system built with Laravel and Filament Admin. Supports multiple journals, article submissions, editorial workflow, reviewer management, and open-access publishing.',
    features: [
      'Multi-journal support under a single platform',
      'Article submission with author guidelines enforcement',
      'Automated reviewer assignment based on expertise',
      'Copyediting and layout editing stages',
      'Filament-powered admin panel for editors',
      'JATS XML export for PubMed/Scopus indexing',
      'Open Access policy management',
      'DOI assignment and metadata export'
    ],
    tech: ['Laravel 10', 'PHP 8.2', 'Filament v3', 'MySQL', 'Redis', 'AWS S3', 'JATS XML', 'Docker'],
    database: 'MySQL with multi-tenant approach. Separate submission, review, and publication schemas. Efficient indexing for cross-journal search.',
    architecture: 'Laravel + Filament for rich admin UI. Service classes for complex editorial workflow state machine. Repository pattern for data access.',
    challenges: 'Modeling the complex editorial workflow state machine (submitted → review → revision → accepted → proofing → published) with multiple actors.',
    solutions: 'Laravel state machine package with custom states and transitions. Each transition fires events that trigger notifications and permission updates.',
    performance: 'Optimized for 10,000+ submissions. Queued email notifications, cached frequently accessed editorial data.',
    security: 'Role-specific views (author cannot see reviewer comments until decision), RBAC via Filament Shield, rate-limited submission API.',
    demo: '#',
    github: '#',
    cover: null
  },
  invoice: {
    title: 'Invoice Management System',
    type: 'PHP / Laravel',
    description: 'B2B invoice and billing platform with auto-generation, payment gateway integration (Stripe/PayPal/M-Pesa), tax calculation, multi-currency support, and PDF export.',
    features: [
      'Client and vendor management',
      'Auto-numbered invoice generation with templates',
      'Multi-currency support with live exchange rates',
      'Tax management: GST, VAT, custom rates',
      'Stripe, PayPal, and M-Pesa payment gateways',
      'Recurring invoice automation',
      'Credit notes and partial payments',
      'PDF invoice with branded templates',
      'Accounts receivable aging report'
    ],
    tech: ['Laravel 10', 'PHP 8.1', 'MySQL', 'Stripe API', 'PayPal SDK', 'DomPDF', 'Laravel Excel', 'Redis'],
    database: 'MySQL with double-entry accounting ledger pattern. Transactions table for complete financial audit trail.',
    architecture: 'Laravel MVC + Strategy pattern for payment gateways. Each gateway implements PaymentGatewayInterface. DTO pattern for invoice line items.',
    challenges: 'Handling multi-currency rounding differences and ensuring financial calculations are 100% precise (no floating-point errors).',
    solutions: 'Used PHP BCMath for all monetary calculations. Stored amounts as integers (cents) in the database. Currency conversion with daily rate caching.',
    performance: 'PDF generation queued via Laravel Horizon. Bulk invoice generation handles 500 invoices in under 30 seconds.',
    security: 'PCI DSS compliant (no card data stored, Stripe handles tokenization), webhook signature verification, RBAC for financial data.',
    demo: '#',
    github: '#',
    cover: null
  },
  ecommerce: {
    title: 'IBUYKENYA Ecommerce Platform',
    type: 'Full Stack (Laravel + FastAPI)',
    description: 'Multi-vendor ecommerce platform targeting the Kenyan market. Laravel powers the main storefront and vendor portal. FastAPI microservice handles search, recommendations, and M-Pesa payment processing.',
    features: [
      'Multi-vendor marketplace with seller onboarding',
      'Product catalog with categories, variants, and images',
      'M-Pesa STK Push payment integration (Safaricom Daraja API)',
      'Elasticsearch-powered product search',
      'Seller analytics dashboard',
      'Inventory management and low-stock alerts',
      'Order tracking with SMS notifications',
      'Loyalty points and discount coupon system'
    ],
    tech: ['Laravel 10', 'FastAPI', 'MySQL', 'Redis', 'Elasticsearch', 'M-Pesa Daraja API', 'AWS S3', 'Docker'],
    database: 'MySQL for transactional ecommerce data. Elasticsearch for product search. Redis for cart sessions and API rate limiting.',
    architecture: 'Laravel monolith (storefront + vendor portal) + FastAPI microservice (search/recommendations/M-Pesa). Inter-service HTTP communication.',
    challenges: 'Integrating M-Pesa STK Push with async callback handling and maintaining cart consistency across concurrent sessions.',
    solutions: 'M-Pesa callbacks processed by FastAPI, results synced to Laravel via webhook. Redis-backed distributed cart with optimistic locking.',
    performance: 'Product search <100ms via Elasticsearch. Redis cart sessions with 99.9% cache hit rate. CDN via CloudFlare for static assets.',
    security: 'M-Pesa callback signature verification, PCI compliance for card fallback, rate limiting per IP and user, OWASP Top 10 protections.',
    demo: '#',
    github: '#',
    cover: 'assets/images/projects/ecommerce-cover.png'
  },
  booking: {
    title: 'Property Booking Platform',
    type: 'Python / Django',
    description: 'Airbnb-style property booking platform built with Django DRF. Features real-time availability calendars, instant/request-to-book flows, guest-host messaging via WebSockets, and Stripe payment integration.',
    features: [
      'Property listing with availability calendar',
      'Instant booking and request-to-book flows',
      'Real-time guest-host messaging (Django Channels WebSocket)',
      'Stripe Connect for host payouts and guest charges',
      'Review and rating system for guests and hosts',
      'Smart pricing (minimum stay, seasonal pricing)',
      'Automated email confirmations and reminders (Celery)',
      'Admin dashboard for dispute resolution'
    ],
    tech: ['Django 4.2', 'DRF', 'Django Channels', 'PostgreSQL', 'Redis', 'Celery', 'Stripe Connect', 'AWS S3'],
    database: 'PostgreSQL for all relational data. DateRangefield for availability. Custom SQL for complex availability queries across booking overlaps.',
    architecture: 'Django DRF for REST API. Django Channels (ASGI) for WebSocket messaging. Celery for async notifications. Daphne as ASGI server.',
    challenges: 'Preventing double-bookings on simultaneous reservation requests for the same property and date range.',
    solutions: 'PostgreSQL row-level locking with SELECT FOR UPDATE on the availability table. Atomic transaction wrapping entire booking flow.',
    performance: 'Availability check <50ms using optimized date-range queries. WebSocket messaging handles 1000+ concurrent connections via Redis channel layer.',
    security: 'Stripe Connect platform account security, JWT auth, user verification system, fraud scoring on bookings.',
    demo: '#',
    github: '#',
    cover: null
  }
};

// ─── Open Project Modal ────────────────────────────────
function openProject(id) {
  const data    = PROJECT_DATA[id];
  const modal   = document.getElementById('project-modal');
  const title   = document.getElementById('modal-title');
  const body    = document.getElementById('modal-body');
  const demoBtn = document.getElementById('modal-demo-btn');
  const ghBtn   = document.getElementById('modal-github-btn');

  if (!data || !modal) return;

  title.textContent = data.title;
  demoBtn.href = data.demo;
  ghBtn.href   = data.github;

  body.innerHTML = `
    ${data.cover ? `
    <div class="modal-gallery">
      <img src="${data.cover}" alt="${data.title} screenshot" loading="lazy" />
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-section-title">📋 Overview</div>
      <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">${data.description}</p>
      <div style="margin-top:0.75rem;display:flex;flex-wrap:wrap;gap:0.4rem;">
        ${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">✨ Key Features</div>
      <ul class="modal-feature-list">
        ${data.features.map(f => `<li><i class="fa-solid fa-check" style="color:var(--accent-green-light);"></i> ${f}</li>`).join('')}
      </ul>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">🗄️ Database Design</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.database}</p>
      </div>
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">🏗️ Architecture</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.architecture}</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">⚠️ Challenges</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.challenges}</p>
      </div>
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">💡 Solutions</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.solutions}</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">⚡ Performance</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.performance}</p>
      </div>
      <div class="modal-section" style="margin-bottom:0;">
        <div class="modal-section-title">🔐 Security</div>
        <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.65;">${data.security}</p>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Trap focus in modal
  setTimeout(() => modal.querySelector('.modal-close')?.focus(), 300);
}

function closeProject() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('project-modal')?.addEventListener('click', function(e) {
  if (e.target === this) closeProject();
});

// Expose globals
window.openProject  = openProject;
window.closeProject = closeProject;
