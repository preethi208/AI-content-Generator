/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:dY4s0qpMeXHc@ep-small-frog-a58l7n0h.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    },
    
    
  };