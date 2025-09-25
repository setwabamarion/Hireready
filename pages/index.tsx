
import Head from 'next/head'
import dynamic from 'next/dynamic'
const PreviewApp = dynamic(() => import('@/components/PreviewApp'), { ssr: false });
export default function Home() {
  return (<>
    <Head>
      <title>HireReady.ai – CV Builder, Cover Letters & Jobs</title>
      <meta name="description" content="Build ATS-friendly CVs, generate cover letters, practice interviews, post jobs, and earn from tips videos." />
    </Head>
    <PreviewApp />
  </>);
}
