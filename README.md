# Scolarmatch

an AI & agentic opportunity aggregator that scrapes and curates local scholarships, internships, summer camps, and competitions. scolarmatch helps students discover and apply to opportunities that match their profile, with AI-powered task agents to streamline the application process.

## Features

### **opportunity discovery**
- **scraping**: Automatically finds scholarships, internships, summer camps, and competitions
- **real-time updates**: get notified via email when new matching opportunities appear

### **AI task agents**
- **application drafting**: AI agents help draft personalized applications for opportunities
- **first access**: Be among the first to see new opportunities as they're discovered
- **smart matching**: AI suggests opportunities based on your profile and preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/scolarmatch.git
cd scolarmatch

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file with your configuration:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks + Local Storage

## Project Structure

```
scolarmatch/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   └── assets/             # Images and static assets
├── public/                 # Public assets and logos
└── docs/                   # Documentation
```

## Use Cases

### For Students
- Discover scholarships matching your profile
- Find internships in your field of study
- Apply to summer camps and competitions
- Get AI assistance with applications

### For Educators
- Share opportunities with students
- Track student engagement
- Monitor application success rates

### For Organizations
- Post opportunities to reach qualified candidates
- Use AI agents to streamline application review
- Connect with motivated students

## Integrations (TBD)

- **University APIs**: local opportunity aggregation
- **Devpost**: hackathon discovery


## Contributing

We welcome contributions!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- built with ❤️ for students worldwide
- special thanks to the open source community
- inspired by the need for accessible educational opportunities

---

**Scolarmatch** - Discover Your Perfect Opportunities 🚀
