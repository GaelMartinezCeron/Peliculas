import Nagvar from "../components/Nagvar"
export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>

            <Nagvar />
                {children}
            </body>
        </html>
    )
}