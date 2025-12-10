# Firestore Directory Structure

This directory contains the Firestore collection structure for the microservices architecture.

## Collections

- `landing/` - Landing service data (waitlist, contact forms)
- `interprebot/` - InterpreBot service data (assessments, training sessions)
- `interprecoach/` - InterpreCoach service data (sessions, terminology)
- `interprestudy/` - InterpreStudy service data (courses, progress, simulations)
- `interpretrack/` - InterpreTrack service data (calls, earnings, analytics)
- `interprehub/` - InterpreHub service data (posts, comments, connections)
- `auth/` - Auth service data (users, sessions, refresh tokens)

Each service maintains its own isolated collections following the database-per-service pattern.
