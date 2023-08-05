import { ThemeProvider } from 'next-themes';
import './globals.css'
import { Roboto } from 'next/font/google'
import Providers from './providers';
export { metadata } from '@/constants';

const inter = Roboto({
  subsets: ['latin'],
  weight: '100'
});

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
