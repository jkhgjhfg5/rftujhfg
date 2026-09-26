# NOBIKSH — নবীক্ষ

Production-oriented Bengali digital news CMS built with Next.js, TypeScript, PostgreSQL and Prisma.

## Stack
- Next.js App Router + TypeScript
- PostgreSQL + Prisma
- Server-side sessions with HTTP-only cookies
- bcrypt password hashing
- Nodemailer OTP email architecture
- Google Apps Script webhook architecture
- S3-compatible storage architecture (add adapter before production uploads)

## Local setup
1. Copy `.env.example` to `.env` and set `DATABASE_URL` and a strong `AUTH_SECRET`.
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run db:seed`
5. `npm run dev`

Owner: `/owner/login`  
Admin: `/admin/login`  
Reporter signup: `/reporter/signup`  
Reporter login: `/reporter/login`

## Security
Passwords are never sent to Google Sheets. Session tokens are HTTP-only and stored server-side as SHA-256 hashes. Reporter articles are created as `PENDING_REVIEW`; there is no reporter publish API. Review APIs enforce Owner or permissioned Admin server-side.

## Google Sheets
Deploy two Google Apps Script web apps. Set `GOOGLE_SHEETS_WEBHOOK_URL` and `REPORTER_GOOGLE_SHEETS_WEBHOOK_URL`. Use a secret verification header/token in production if the webhook is exposed publicly.

### Sheet 1 visitor columns
Timestamp, User-Agent, Page URL, Referrer, Device Type, Browser, Operating System.

### Sheet 2 reporter columns
Application ID, Application Date, Full Name, Gmail, Phone Number, Profile Photo URL, Address / Location, Biography, Application Status, Admin Decision, Review Date, Reviewer, Admin Notes.

## Email
If SMTP variables are empty, password reset clearly reports `Production integration required` and does not pretend an email was sent.

## Storage
`STORAGE_PROVIDER=local` is a development architecture placeholder. Vercel/serverless production deployments require an S3-compatible or Cloudinary adapter and signed upload flow. Do not store production media on the ephemeral local filesystem.

## Deployment
GitHub → Vercel → managed PostgreSQL → S3-compatible/Cloudinary storage → transactional email → custom domain.

## Demo content
Seed currently creates categories and an owner. Add fictional demo articles manually and label political demo content `Demo / Fictional Content`.

### Media note
Profile photo upload uses an S3-compatible provider when `STORAGE_PROVIDER=s3`. If storage is left as `local`, the development fallback stores an image data URL in PostgreSQL; this is not recommended for production. Production integration required for scalable media storage.

## Prisma migrations
The repository keeps `prisma/schema.prisma` as the canonical schema. Create the first real PostgreSQL migration in your environment with:
`npx prisma migrate dev --name init`
and deploy it with `npx prisma migrate deploy`. The build does not ship a fake/empty migration file.

## Google Apps Script
Use `integrations/google-apps-script/visitor-sheet.gs` for Sheet 1 and `reporter-applications.gs` for Sheet 2. Deploy each as a Web App and put its `/exec` URL in the matching environment variable.
