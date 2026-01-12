# Production Deployment Guide

## Client Portal 404 Error Fix

If you're getting a 404 error when logging into the client portal on production, it's likely due to the API URL configuration.

### Problem
The frontend is trying to make API calls to `/api/v1` but your production backend is not available at that URL.

### Solution
Set the `VITE_API_URL` environment variable to point to your production backend.

### For Vercel/Netlify Deployment:
1. Go to your project settings
2. Add environment variable: `VITE_API_URL=https://your-backend-domain.com`
3. Redeploy your application

### For Docker/Standalone Deployment:
```bash
# Set environment variable before starting
export VITE_API_URL=https://your-backend-domain.com
npm run build
```

### For .env file (development):
```env
VITE_API_URL=http://localhost:5000
```

### For production .env:
```env
VITE_API_URL=https://your-production-backend.com
```

### Verification
After setting the environment variable:
1. Rebuild and redeploy your frontend
2. Test client login - it should no longer return 404
3. Check browser network tab to ensure API calls go to the correct backend URL

### Backend Requirements
Make sure your backend is running and accessible at the specified URL with these endpoints:
- `GET /api/v1/client/dashboard` - Client dashboard data
- `POST /api/v1/auth/login` - User authentication
- All other API endpoints as defined in the routes

### Troubleshooting
If you still get 404 errors:
1. Check that your backend is running and accessible
2. Verify the VITE_API_URL is correctly set
3. Check browser developer tools for the exact API call URLs
4. Ensure CORS is properly configured on your backend
5. Check that the backend routes are correctly mounted

### Example Backend URL Formats
- `https://my-api.example.com`
- `https://api.myapp.com`
- `https://backend.myapp.com/api/v1` (if your backend has /api/v1 prefix)
- `http://localhost:5000` (for local development)