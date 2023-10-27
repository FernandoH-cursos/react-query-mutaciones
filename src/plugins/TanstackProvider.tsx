import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClientProvider = new QueryClient();

//? Provider de React query 
export const TanstackProvider = ({children}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClientProvider}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
