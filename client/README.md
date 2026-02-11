# Chat App - Next.js Client

Built with Next.js, React, and Socket.io

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── page.tsx                # Home/Registration page
├── room/
│   └── page.tsx            # Chat room page
│
components/
├── RegistrationForm.tsx    # Registration form component
├── ChatRoom.tsx            # Chat room component
└── MessageList.tsx         # Messages display component

lib/
├── socket.tsx              # Socket context provider
└── hooks/
    └── useSocket.ts        # Custom hook for socket

styles/
├── registration.module.css # Registration page styles
├── room.module.css         # Room page styles
└── components.module.css   # Component styles
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Features

- Real-time chat with Socket.io
- User registration
- Room management
- Multiple users per room
- Persistent user session
