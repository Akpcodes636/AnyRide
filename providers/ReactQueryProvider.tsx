'use client'; // ✅ This must be client-side
import React, { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

const ReactQueryProvider: FC<ProvidersProps> = ({ children }) => {
  // ✅ Create QueryClient only once (client-side)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 10 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}           
      <Toaster />         
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
