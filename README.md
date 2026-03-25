## Run Locally

**Prerequisites:** Node.js, Supabase account

1. Install dependencies:
   `npm install`

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create a `.env.local` file in the root directory with:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     GEMINI_API_KEY=your-gemini-api-key
     ```

3. Set up the database:
   - Go to your Supabase dashboard > SQL Editor
   - Run the SQL from `src/database/schema.sql` to create tables and RLS policies

4. Run the app:
   `npm run dev`

## ⚠️ Important Notes

- **Without Supabase configured**: The app will show a configuration message instead of a blank page
- **Database setup required**: Run the SQL migrations before authentication will work
- **Email verification**: Supabase requires email verification for new accounts

## Authentication

The app uses Supabase Auth for user authentication with the following features:
- User registration with email verification
- Login/logout functionality
- Protected routes
- User profiles with unique usernames

## Database Schema

- `auth.users`: Managed by Supabase Auth
- `user_profiles`: Custom user profiles with username and timestamps
