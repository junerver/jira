import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Provider store={store}>
                    <AuthProvider>{children}</AuthProvider>
                </Provider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}