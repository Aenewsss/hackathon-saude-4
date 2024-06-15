import Header from "./header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}