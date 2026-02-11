import type { Metadata } from 'next'
import { SocketProvider } from '@/lib/socket'
import './globals.css'

export const metadata: Metadata = {
  title: 'JS Chat - Real-time Chat Application',
  description: 'A real-time chat application built with Next.js and Socket.io',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  )
}
