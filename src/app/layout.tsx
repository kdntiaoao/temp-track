import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import './theme.css'
import { CustomProvider } from './_components/provider/CustomProvider'
import { DefaultLayout } from './_components/DefaultLayout'

const notoSansJP = Noto_Sans_JP({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TempTrack - Your Personal Temperature Logger',
  description:
    'TempTrackは、あなたの健康を管理するための便利なツールです。このWebアプリケーションを使用すると、日々の体温を簡単に記録できます。COVID-19や風邪などの健康状態を把握するために、正確な体温の記録は重要です。TempTrackを使えば、体温の履歴を簡単に管理し、グラフで確認することができます。また、リマインダー機能を利用して、毎日の体温チェックを忘れないようにサポートします。あなたの健康管理をよりスマートにし、安心して日々の体温を追跡できるTempTrackをぜひご利用ください。',
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <CustomProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </CustomProvider>
      </body>
    </html>
  )
}
