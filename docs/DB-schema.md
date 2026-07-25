## Database Architecture Overview

This schema is designed for a multi-tenant lawyer management system using Directus CMS with PostgreSQL or MySQL backend.

---

## Core Tables

### 1. **users**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_picture_id UUID REFERENCES directus_files(id),
  role_id UUID NOT NULL REFERENCES roles(id),
  status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
  language VARCHAR(10) DEFAULT 'en',
  theme ENUM('light', 'dark', 'auto') DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  deleted_at TIMESTAMP (soft delete),
  preferences JSON
);
```

### 2. **roles**

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions JSON, -- Stores permission tree
  is_system BOOLEAN DEFAULT false, -- System roles cannot be deleted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  organization_id UUID REFERENCES organizations(id)
);

-- System Roles (Pre-defined):
-- 1. admin - Full system access
-- 2. manager - Full control of organization + team
-- 3. lawyer - Can manage cases and clients
-- 4. employee - Can view assigned tasks
-- 5. client - Can view own cases and communicate
-- 6. public - Unauthenticated users (view-only)
```

### 3. **organizations**

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  logo_id UUID REFERENCES directus_files(id),
  website VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  industry VARCHAR(100),
  registration_number VARCHAR(255),
  tax_id VARCHAR(255),
  owner_id UUID NOT NULL REFERENCES users(id),
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  subscription_plan VARCHAR(50), -- 'free', 'professional', 'enterprise'
  subscription_expires TIMESTAMP,
  settings JSON,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### 4. **team_members**

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id),
  department VARCHAR(100),
  position VARCHAR(100),
  specialization TEXT, -- For lawyers (e.g., 'Criminal Law', 'Corporate Law')
  bio TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  permissions JSON, -- Additional custom permissions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(user_id, organization_id)
);
```

### 5. **clients**

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id), -- Links to user if registered
  type ENUM('individual', 'company') DEFAULT 'individual',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  mobile VARCHAR(20),
  profile_picture_id UUID REFERENCES directus_files(id),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other'),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  tax_id VARCHAR(255),
  registration_number VARCHAR(255),
  industry VARCHAR(100),
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
  assigned_lawyer_id UUID REFERENCES team_members(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### 6. **cases**

```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_number VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('open', 'in_progress', 'closed', 'on_hold', 'archived') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  type_id UUID REFERENCES case_types(id),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  assigned_lawyer_id UUID REFERENCES team_members(id),
  co_lawyers JSON, -- Array of assigned team member IDs
  case_date DATE,
  deadline DATE,
  court_name VARCHAR(255),
  court_location VARCHAR(255),
  judge_name VARCHAR(255),
  opposing_party VARCHAR(255),
  opposing_lawyer VARCHAR(255),
  amount_involved DECIMAL(15, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  progress_percentage INT DEFAULT 0,
  tags JSON,
  attachments JSON, -- Array of file IDs
  notes TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  seo_slug VARCHAR(255) UNIQUE,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  closed_at TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### 7. **case_types**

```sql
CREATE TABLE case_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  icon_id UUID REFERENCES directus_files(id),
  color VARCHAR(7), -- Hex color
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(organization_id, slug)
);
```

### 8. **services**

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description LONGTEXT,
  icon_id UUID REFERENCES directus_files(id),
  featured_image_id UUID REFERENCES directus_files(id),
  category_id UUID REFERENCES service_categories(id),
  price DECIMAL(15, 2),
  price_label VARCHAR(100), -- e.g., 'Starting from', 'Consultation Fee'
  duration_hours INT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  gallery_ids JSON, -- Array of file IDs
  related_services JSON, -- Array of service IDs
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);
```

### 9. **service_categories**

```sql
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  icon_id UUID REFERENCES directus_files(id),
  parent_id UUID REFERENCES service_categories(id), -- For subcategories
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(organization_id, slug)
);
```

### 10. **fields** (Legal Fields/Practice Areas)

```sql
CREATE TABLE fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description LONGTEXT,
  icon_id UUID REFERENCES directus_files(id),
  featured_image_id UUID REFERENCES directus_files(id),
  gallery_ids JSON,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  related_fields JSON,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 11. **blogs**

```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES team_members(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  featured_image_id UUID REFERENCES directus_files(id),
  category_id UUID REFERENCES blog_categories(id),
  tags JSON,
  status ENUM('draft', 'published', 'scheduled', 'archived') DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  views_count INT DEFAULT 0,
  published_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  reading_time_minutes INT,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT,
  allow_comments BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### 12. **blog_categories**

```sql
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  icon_id UUID REFERENCES directus_files(id),
  parent_id UUID REFERENCES blog_categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(organization_id, slug)
);
```

### 13. **blog_comments**

```sql
CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  author_name VARCHAR(100),
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  status ENUM('pending', 'approved', 'rejected', 'spam') DEFAULT 'pending',
  parent_id UUID REFERENCES blog_comments(id), -- For nested comments
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 14. **case_updates**

```sql
CREATE TABLE case_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  update_type ENUM('status_change', 'milestone', 'deadline', 'document', 'note', 'hearing', 'decision') DEFAULT 'note',
  status_before VARCHAR(50),
  status_after VARCHAR(50),
  attachments JSON,
  visible_to_client BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 15. **documents**

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_id UUID NOT NULL REFERENCES directus_files(id),
  document_type ENUM('contract', 'agreement', 'motion', 'evidence', 'brief', 'order', 'other') DEFAULT 'other',
  uploaded_by_id UUID NOT NULL REFERENCES users(id),
  is_confidential BOOLEAN DEFAULT false,
  requires_signature BOOLEAN DEFAULT false,
  signature_request_id UUID REFERENCES signature_requests(id),
  version INT DEFAULT 1,
  previous_version_id UUID REFERENCES documents(id),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 16. **signature_requests**

```sql
CREATE TABLE signature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES users(id),
  signer_id UUID NOT NULL REFERENCES users(id),
  status ENUM('pending', 'signed', 'rejected', 'expired') DEFAULT 'pending',
  expires_at TIMESTAMP,
  signed_at TIMESTAMP,
  signature_data JSON, -- Stores signature image/data
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 17. **messages**

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  attachments JSON, -- Array of file IDs
  message_type ENUM('text', 'file', 'system', 'notification') DEFAULT 'text',
  is_edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMP,
  read_by JSON, -- Array of {user_id, timestamp}
  deleted_by JSON, -- Array of user IDs (soft delete per user)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 18. **conversations**

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  conversation_type ENUM('direct', 'group', 'case_discussion', 'support') DEFAULT 'direct',
  title VARCHAR(255),
  description TEXT,
  participants JSON NOT NULL, -- Array of user IDs with permission levels
  created_by_id UUID NOT NULL REFERENCES users(id),
  is_archived BOOLEAN DEFAULT false,
  last_message_at TIMESTAMP,
  attachment_ids JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 19. **tasks**

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed', 'on_hold', 'cancelled') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  assigned_to_id UUID REFERENCES team_members(id),
  assigned_by_id UUID NOT NULL REFERENCES users(id),
  due_date DATE,
  due_time TIME,
  estimated_hours DECIMAL(5, 2),
  actual_hours DECIMAL(5, 2),
  progress_percentage INT DEFAULT 0,
  attachments JSON,
  checklist JSON, -- Array of {text, completed, created_at}
  reminders JSON, -- Array of reminder configurations
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);
```

### 20. **notifications**

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ENUM('message', 'case_update', 'task_assigned', 'deadline_reminder', 'system', 'review_request', 'chat_mention') DEFAULT 'system',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  related_id UUID, -- ID of related record (case, task, message, etc.)
  related_type VARCHAR(50), -- Type of related record (case, task, message, etc.)
  action_url VARCHAR(500),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT false,
  channels JSON, -- ['email', 'in_app', 'sms']
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 21. **case_reviews**

```sql
CREATE TABLE case_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES team_members(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT NOT NULL,
  aspects JSON, -- {communication, professionalism, knowledge, results, etc.} with ratings
  is_verified BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  helpful_count INT DEFAULT 0,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  response_text TEXT, -- Lawyer's response
  responded_by_id UUID REFERENCES team_members(id),
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 22. **invoices**

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  description TEXT,
  status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
  issue_date DATE,
  due_date DATE,
  paid_date DATE,
  subtotal DECIMAL(15, 2),
  tax_amount DECIMAL(15, 2),
  total_amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_method ENUM('bank_transfer', 'credit_card', 'check', 'cash') DEFAULT 'bank_transfer',
  items JSON, -- Array of {description, quantity, unit_price, amount}
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 23. **invitations**

```sql
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  invited_by_id UUID NOT NULL REFERENCES users(id),
  email VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id),
  status ENUM('pending', 'accepted', 'rejected', 'expired') DEFAULT 'pending',
  invitation_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP,
  user_id UUID REFERENCES users(id),
  invited_type ENUM('team_member', 'client', 'public') DEFAULT 'team_member',
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 24. **activity_logs**

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100), -- Case, Client, User, etc.
  entity_id UUID,
  changes JSON, -- Before/after values
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 25. **support_tickets**

```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  created_by_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  ticket_number VARCHAR(100) NOT NULL UNIQUE,
  status ENUM('open', 'in_progress', 'waiting', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  category VARCHAR(100),
  assigned_to_id UUID REFERENCES team_members(id),
  attachments JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
```

### 26. **email_templates**

```sql
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body LONGTEXT NOT NULL,
  preview_text VARCHAR(255),
  variables JSON, -- Array of variable names like {{client_name}}, {{case_number}}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(organization_id, slug)
);
```

### 27. **pages** (CMS Pages for SEO)

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  featured_image_id UUID REFERENCES directus_files(id),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  is_featured BOOLEAN DEFAULT false,
  menu_parent VARCHAR(100), -- Parent menu item
  menu_order INT,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT,
  canonical_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 28. **faq**

```sql
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  question VARCHAR(500) NOT NULL,
  answer LONGTEXT NOT NULL,
  category_id UUID REFERENCES faq_categories(id),
  order INT,
  is_published BOOLEAN DEFAULT true,
  helpful_count INT DEFAULT 0,
  not_helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 29. **faq_categories**

```sql
CREATE TABLE faq_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  UNIQUE(organization_id, slug)
);
```

### 30. **audit_logs**

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action_type VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id UUID,
  changes JSON,
  reason TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 31. **permissions_settings**

```sql
CREATE TABLE permissions_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  resource VARCHAR(100), -- e.g., 'cases', 'clients', 'documents'
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT false,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_export BOOLEAN DEFAULT false,
  custom_permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(organization_id, role_id, resource)
);
```

### 32. **geo_locations**

```sql
CREATE TABLE geo_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone VARCHAR(50),
  is_service_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 33. **seo_settings**

```sql
CREATE TABLE seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_title VARCHAR(255),
  site_description TEXT,
  site_keywords TEXT,
  og_image_id UUID REFERENCES directus_files(id),
  twitter_handle VARCHAR(255),
  google_analytics_id VARCHAR(255),
  google_search_console_id VARCHAR(255),
  robots_txt TEXT,
  sitemap_enabled BOOLEAN DEFAULT true,
  structured_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Additional Recommended Tables & Features

### Recommendations for Enhanced Functionality:

1. **subscription_plans** - Define different pricing tiers
2. **payment_methods** - Store payment information securely
3. **scheduled_tasks** - For scheduled notifications/reminders
4. **api_keys** - For API access to external systems
5. **webhooks** - For integrations with third-party services
6. **analytics** - Track user behavior and engagement
7. **form_submissions** - Capture contact form submissions
8. **testimonials** - Client testimonials for marketing
9. **time_entries** - Track billable hours
10. **expense_reports** - Track case-related expenses
11. **calendar_events** - Integration with calendar system
12. **video_consultations** - Store video call details
13. **document_templates** - Pre-made legal documents
14. **compliance_checklists** - Track compliance requirements
15. **case_deadlines** - Critical dates and reminders

---

## Directus Configuration

### Collections to Create in Directus:

* users
* roles
* organizations
* team_members
* clients
* cases
* case_types
* services
* service_categories
* fields
* blogs
* blog_categories
* blog_comments
* case_updates
* documents
* messages
* conversations
* tasks
* notifications
* case_reviews
* invoices
* invitations
* activity_logs
* support_tickets
* pages
* faq
* faq_categories
* email_templates
* permissions_settings
* audit_logs
* seo_settings
* geo_locations

### Key Directus Features to Implement:

1. **Role-Based Access Control** - Configure roles and permissions
2. **Workflows** - For case status transitions
3. **Revisions** - Track all changes to records
4. **Relations** - Set up one-to-many and many-to-many relations
5. **Webhooks** - Trigger notifications and emails
6. **Extensions** - Custom business logic
7. **File Management** - Handle document uploads securely
8. **API Tokens** - For frontend authentication

---

## Index Recommendations

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_cases_organization ON cases(organization_id);
CREATE INDEX idx_cases_client ON cases(client_id);
CREATE INDEX idx_cases_lawyer ON cases(assigned_lawyer_id);
CREATE INDEX idx_clients_organization ON clients(organization_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_tasks_case ON tasks(case_id);
CREATE INDEX idx_blogs_author ON blogs(author_id);
CREATE INDEX idx_activity_logs_organization ON activity_logs(organization_id);
CREATE INDEX idx_invoices_case ON invoices(case_id);
```

---

## Database Best Practices

1. **Multi-tenancy**: All tables include organization_id for data isolation
2. **Soft Deletes**: Use deleted_at timestamps instead of hard deletes
3. **Audit Trail**: Track all changes through activity_logs and audit_logs
4. **Timestamps**: Always include created_at and updated_at
5. **UUIDs**: Use UUID for primary keys (better for distributed systems)
6. **Geolocation**: Include lat/lon for location-based features
7. **SEO**: Include seo_* fields for search engine optimization
8. **Permissions**: Role-based access control with granular permissions
9. **Versioning**: Support document versioning
10. **Encryption**: Encrypt sensitive data (passwords use hashing, PII uses encryption)
