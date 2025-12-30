// API Verification Script
// This script documents the available endpoints for manual testing

console.log('=== BACKEND API ENDPOINTS ===\n');

console.log('AUTHENTICATION ENDPOINTS:');
console.log('POST /api/auth/signup');
console.log('  Body: { "name": "string", "email": "string", "password": "string" }');
console.log('  Response: { "message": "string", "token": "string", "user": {...} }\n');

console.log('POST /api/auth/login');
console.log('  Body: { "email": "string", "password": "string" }');
console.log('  Response: { "message": "string", "token": "string", "user": {...} }\n');

console.log('GET /api/auth/profile');
console.log('  Headers: { "Authorization": "Bearer <token>" }');
console.log('  Response: { "user": {...} }\n');

console.log('PUT /api/auth/profile');
console.log('  Headers: { "Authorization": "Bearer <token>" }');
console.log('  Body: { "name": "string", "email": "string" }');
console.log('  Response: { "message": "string", "user": {...} }\n');

console.log('TASK ENDPOINTS (All require Authorization header):');
console.log('GET /api/tasks?search=<term>&status=<pending|completed>');
console.log('  Response: { "tasks": [...] }\n');

console.log('POST /api/tasks');
console.log('  Body: { "title": "string", "description": "string" }');
console.log('  Response: { "message": "string", "task": {...} }\n');

console.log('PUT /api/tasks/:id');
console.log('  Body: { "title": "string", "description": "string", "status": "pending|completed" }');
console.log('  Response: { "message": "string", "task": {...} }\n');

console.log('DELETE /api/tasks/:id');
console.log('  Response: { "message": "string" }\n');

console.log('HEALTH CHECK:');
console.log('GET /health');
console.log('  Response: { "status": "string", "timestamp": "string" }\n');

console.log('=== VALIDATION RULES ===');
console.log('- Password minimum 6 characters');
console.log('- All required fields validated');
console.log('- JWT token required for protected routes');
console.log('- Users can only access their own tasks');
console.log('- Task status must be "pending" or "completed"');
