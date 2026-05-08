## Basic schema:

app_users
- id
- name
- email
- password
- role

equipment
- id
- name
- category
- condition_status
- quantity
- available
- image

borrow_requests
- id
- equipment_id
- equipment_name
- user_id
- requested_by
- role
- request_date
- status