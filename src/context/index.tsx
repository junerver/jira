import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}