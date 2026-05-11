# Deployment Best Practices — Vercel

Conteúdo referencial de Vercel deployment e environment variables para deployment-best-practices.

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add DATABASE_URL
```

## Environment Variables

```bash
# .env.local (development)
DATABASE_URL=postgresql://localhost:5432/mydb
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# .env.production (via Vercel dashboard)
DATABASE_URL=postgresql://prod.example.com/mydb
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
