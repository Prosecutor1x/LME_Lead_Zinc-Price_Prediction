"use client"
import MainDashboard from '@/components/dashboard/main-dashboard';
import { MainHero } from '@/components/hero/main-hero';
import PageLayout from '@/components/price-prediction-page-layout/main-page-layout';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <PageLayout>
          <MainHero />
          <MainDashboard />
        </PageLayout>
      </div>
    </main>
  );
}
