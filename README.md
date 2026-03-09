# OSAP Protest Email Generator

Recently, the government of Ontario has announced that they're looking heavily cut OSAP grants. Grants are already designed to be given to students with the lowest household incomes, so this cut is essentially a direct attack on those who need it most.

Various universities across Ontario have lead protests against this cut, but we strongly believe that direct pressure on Members of Provincial Parliament is just as important in terms of reversing these changes.

We made this website with the intention of making the barrier for students to contact their local representatives as low as possible.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + JavaScript |
| Build Tool | Vite |
| Backend | Vercel Serverless Functions |
| Data Source | OpenNorth Represent API |
| Analytics | Vercel Analytics |

## Getting Started

### Prerequisites
- Node.js 20.x or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/lukajvnic/osap-emailing.git
cd osap-emailing/app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## How It Works

1. **Input** — Users enter their postal code or select their university/college from a dropdown.
2. **Data Fetching** — The serverless API (`/api/mpp`) interfaces with the OpenNorth Represent API to find the MPP for the given postal code.
3. **Template Generation** — The app dynamically updates an email template (sourced from the Waterloo Undergraduate Student Association) with the student's name and school context.
4. **Action** — The "Send" button constructs a comprehensive `mailto:` link, opening the user's default email client with everything pre-filled and ready to send.

## Project Structure

```
osap-emailing/
├── api/
│   └── mpp.js              # Vercel serverless function for OpenNorth API
├── app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Input.jsx   # Search and dropdown component
│   │   │   └── Preview.jsx # Email preview and template rendering
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # App entry point
│   ├── public/
│   │   └── schoolMppMap.js # Static mapping of schools to MPPs
│   └── package.json
```

## Authors

**Luka Jovanovic** — [lukajvnic.com](https://lukajvnic.com)

**Elaine Qian**