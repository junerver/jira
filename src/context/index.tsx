import { AuthProvider } from './auth-context'
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
}