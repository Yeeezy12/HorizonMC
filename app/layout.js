import "./globals.css";

export const metadata = {
  title: "HorizonMC | Tienda",
  description: "Tienda oficial de HorizonMC"
};

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
