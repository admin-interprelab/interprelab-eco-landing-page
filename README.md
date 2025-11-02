# InterpreLab - Advanced AI-Powered Interpretation Platform

<div align="center">

![InterpreLab Logo](https://img.shields.io/badge/InterpreLab-Advanced%20Interpretation-blue?style=for-the-badge)

**Revolutionizing medical and legal interpretation through advanced AI technology while preserving the essential human element in critical communication.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/admin-interprelab/interprelab-eco-landing-page)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

</div>

## 🌟 Overview

InterpreLab is a comprehensive AI-powered ecosystem designed to enhance the skills, performance, and professional development of medical and legal interpreters. Our platform combines cutting-edge artificial intelligence with human expertise to provide assessment, training, real-time assistance, and community networking.

## 🚀 Key Features

### 🤖 InterpreBot - AI Assessment Platform
- **Comprehensive Skills Assessment**: 30-minute evaluation covering interpretation scenarios
- **AI-Powered Analysis**: Detailed scoring on accuracy, fluency, terminology, and cultural competence
- **Personalized Training Paths**: Custom improvement recommendations based on assessment results
- **Interactive Q&A Interface**: Ask questions and get instant AI responses about interpretation

### 🎯 InterpreCoach - Real-Time Assistant
- **Browser Extension**: Chrome extension for live interpretation sessions
- **Real-Time Terminology Support**: Instant suggestions during video calls
- **Multi-Language Support**: 50+ language pairs with specialized databases
- **Privacy-First**: HIPAA-compliant with end-to-end encryption
- **Performance Analytics**: Session tracking and improvement insights

### 📚 InterpreStudy - Learning Platform
- **AI-Powered Learning**: Interactive chat with AI for ethics and best practices
- **Terminology Lookup**: Comprehensive medical and legal term databases
- **Flashcard Builder**: Create custom terminology sets with translations
- **Mock Scenarios**: Practice with realistic interpretation situations
- **Code of Ethics Training**: Query and quiz on professional standards

### 🌐 InterpreLink - Professional Network
- **Social Platform**: Connect with interpreters worldwide
- **Knowledge Sharing**: Post experiences, tips, and best practices
- **Video Content**: Share and watch interpretation-related reels
- **Discussion Forums**: Engage in professional conversations
- **Job Board**: Access to interpretation opportunities

### 📊 InterpreTrack - Performance Analytics
- **Enhanced Dashboard**: Comprehensive stats and performance metrics
- **Weekly Charts**: Visual representation of progress over time
- **AI Insights**: Personalized recommendations for improvement
- **Call Logging**: Manual and automatic session tracking
- **Earnings Tracking**: Monitor income and session statistics

### ⏱️ CallTracker - Session Management
- **Real-Time Tracking**: Live call duration monitoring
- **Earnings Calculator**: Automatic payment calculation based on rates
- **Session Notes**: Add notes and context to each call
- **Browser Integration**: Seamless integration with video platforms
- **User Settings**: Customizable pay rates and preferences

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible component library
- **React Router v6** - Client-side routing with nested routes
- **React Query** - Server state management and caching

### Backend & Database
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security** - Database-level security policies
- **Authentication** - Secure user management with JWT tokens
- **Storage** - File uploads and media management
- **Edge Functions** - Serverless functions for custom logic

### Development & Deployment
- **ESLint** - Code linting and formatting
- **GitHub Actions** - Automated CI/CD pipeline
- **Docker** - Containerized deployment
- **Nginx** - Production web server configuration

## 🏗️ Project Structure

```
interprelab-eco-landing-page/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── interprestudy/  # InterpreStudy components
│   ├── pages/              # Route components
│   │   ├── Index.tsx       # Landing page
│   │   ├── InterpreBot.tsx # Assessment platform
│   │   ├── InterpreCoach.tsx # Extension information
│   │   ├── InterpreStudy.tsx # Learning platform
│   │   ├── InterpreLink.tsx # Social network
│   │   ├── InterpreTrack.tsx # Analytics dashboard
│   │   └── CallTracker.tsx # Session tracking
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Database client and types
│   ├── lib/                # Utility functions and validations
│   └── styles/             # Global styles and themes
├── supabase/
│   ├── migrations/         # Database schema migrations
│   └── config.toml         # Supabase configuration
├── public/                 # Static assets
└── docs/                   # Documentation files
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/admin-interprelab/interprelab-eco-landing-page.git
   cd interprelab-eco-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_GOOGLE_API_KEY=your_google_api_key
```

## 📊 Database Schema

### Core Tables
- **profiles** - User profile information
- **contacts** - Contact form submissions
- **waitlist** - Early access signups
- **call_logs** - Interpretation session records
- **call_records** - Enhanced call tracking
- **user_settings** - User preferences and configurations
- **user_preferences** - Payment and currency settings

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Authentication policies** for data access control
- **HIPAA-compliant** data handling procedures

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate TypeScript types from Supabase
npm run db:push      # Push migrations to Supabase
npm run db:reset     # Reset database schema
```

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t interprelab .
docker run -p 80:80 interprelab
```

### GitHub Actions
Automated deployment is configured via GitHub Actions. Push to main branch triggers:
- Build verification
- Type checking
- Automated deployment to production

## 🎯 User Journey

1. **Discovery** → Landing page with clear value propositions
2. **Assessment** → InterpreBot for comprehensive skill evaluation
3. **Training** → InterpreStudy for personalized learning paths
4. **Practice** → InterpreCoach for real-time session assistance
5. **Community** → InterpreLink for professional networking
6. **Analytics** → InterpreTrack for performance monitoring
7. **Growth** → Continuous improvement through AI insights

## 🔒 Security & Compliance

- **HIPAA Compliant** - Healthcare data protection standards
- **SOC 2 Type II** - Security and availability controls
- **End-to-End Encryption** - Secure data transmission
- **Row Level Security** - Database-level access control
- **Authentication** - Secure user management with JWT

## 🌍 Supported Languages

InterpreLab supports 50+ language pairs including:
- **Medical Interpretation**: English ↔ Spanish, French, Mandarin, Arabic, Russian
- **Legal Interpretation**: Specialized terminology databases
- **Community Interpretation**: Cultural context and regional variations

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: ~1.2MB gzipped
- **Load Time**: <2s on 3G networks
- **Core Web Vitals**: Excellent ratings

## 🤝 Contributing

We welcome contributions from the interpretation community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Website**: [interprelab.com](https://interprelab.com)
- **Email**: admin.ceo@interprelab.com
- **Phone**: +1 (713) 555-0123
- **Address**: Houston, Texas, USA

## 🙏 Acknowledgments

- **Medical Interpreters** - For their invaluable feedback and testing
- **Legal Professionals** - For domain expertise and requirements
- **Open Source Community** - For the amazing tools and libraries
- **Beta Testers** - For helping us refine the user experience

---

<div align="center">

**Built with ❤️ for the interpretation community**

[Website](https://interprelab.com) • [Documentation](docs/) • [Support](mailto:admin.ceo@interprelab.com)

</div>
