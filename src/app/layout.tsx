import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import './theme.css'
import { CustomProvider } from './_components/provider/CustomProvider'
import { DefaultLayout } from './_components/DefaultLayout'
import Script from 'next/script'

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
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer strategy="beforeInteractive" />
      <Script id="one-signal" strategy="beforeInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(function(OneSignal) {
            OneSignal.init({
              appId: "00e9639b-fa8a-4e79-8087-e071b16f9183",
              safari_web_id: "web.onesignal.auto.028d9952-ba2c-477b-babc-6aee5c5ba0de",
              notifyButton: {
                enable: true,
              },
            });
          });
        `}
      </Script>

      <body className={notoSansJP.className}>
        <CustomProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </CustomProvider>
      </body>
    </html>
  )
}
