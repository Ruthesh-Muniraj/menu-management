import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Menu Management',
  description: 'Demo Menu Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
