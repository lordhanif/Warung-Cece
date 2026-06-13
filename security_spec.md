# Security Spec

## Data Invariants
1. Users can only read menus and promos.
2. Admins can read, write, and delete menus and promos.
3. Access to users collection is strictly read-only for their own user profile, while SuperAdmins can manage all users.

## Dirty Dozen Payloads
1. Unauthenticated write to /menus
2. Authenticated user (non-admin) write to /menus
3. Admin writes to /menus with missing required fields
4. Admin writes to /menus with invalid types (price is string)
5. Admin writes to /menus modifying someone else's identity...
(Standard strict tests)
