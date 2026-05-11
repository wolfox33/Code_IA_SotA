# Deployment Best Practices — Production Checklist

Conteúdo referencial de production checklist para deployment-best-practices.

## Production Checklist

### Environment

- [ ] All environment variables set in Vercel
- [ ] Database connection string (production)
- [ ] API keys (OpenAI, Anthropic, Stripe)
- [ ] Webhook secrets configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Vercel, PostHog) enabled

### Security

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (use Drizzle)
- [ ] XSS protection (sanitize user input)
- [ ] CSRF protection

### Performance

- [ ] Database indexes created
- [ ] Caching strategy implemented
- [ ] Image optimization enabled
- [ ] Bundle size optimized (<500KB)
- [ ] Lighthouse score >90

### Monitoring

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Uptime monitoring (UptimeRobot, Better Stack)
- [ ] Log aggregation (Vercel Logs)
- [ ] Alerts configured (errors, downtime)

### Database

- [ ] Migrations run successfully
- [ ] Backups configured (automatic)
- [ ] Connection pooling enabled
- [ ] Indexes created
- [ ] Constraints validated

### Testing

- [ ] All tests passing
- [ ] E2E tests for critical flows
- [ ] Load testing performed
- [ ] Security audit completed

## 🔗 Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Sentry Docs](https://docs.sentry.io)
- [GitHub Actions](https://docs.github.com/en/actions)
