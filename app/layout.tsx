import { Header_Layout } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
// import '@/styles/globals.css';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Roboto} from 'next/font/google';


const robato = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Apparel Bee',
  description: 'Apparel based web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robato.className}>
        <Header_Layout />
        {children}
        <div id="portal" />
        <Footer />
      </body>
    </html>
  )
}
