
# Roles and Permissions

This document describes all user roles available in the system and their intended responsibilities.

---

# Roles Overview

| Role | Description |
|------|-------------|
| Administrator | Full system access with unrestricted permissions. |
| Manager | Controls all operations within the organization/site. |
| Organization/office_law | Manages a law office, including lawyers, employees, clients, and office operations. |
| Organization/client | Represents a client organization participating in legal cases. |
| Organization/client_team | Team members belonging to a client organization. |
| Lawyer | Manages assigned legal cases, documents, hearings, and client communication. |
| Employee | Handles operational tasks assigned by managers. |
| Client | Uses the platform to create legal requests, manage cases, and upload documents. |
| Trainee | Lawyer under training with limited permissions. |
| Reader | Read-only access to public and authorized content. |
| Default | Temporary role assigned after registration before selecting a user type. |

---

# Role Details

## Administrator

**Icon**


Administrator
    │
    └── Manager
            │
            ├── Organization/office_law
            │      ├── Lawyer
            │      │      └── Trainee
            │      └── Employee
            │
            ├── Organization/client
            │      └── Organization/client_team
            │
            ├── Client
            │
            └── Reader