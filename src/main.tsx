import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { RootLayout } from '@/components/layout/RootLayout';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { HubPage } from '@/pages/HubPage'
import { ArticlePage } from '@/pages/ArticlePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { PricingPage } from '@/pages/PricingPage'
import { DashboardPage } from '@/pages/DashboardPage'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "hub", element: <HubPage /> },
      { path: "hub/:slug", element: <ArticlePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ]
  },
]);
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.dataset.root) {
  rootElement.dataset.root = 'true';
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>,
  );
}