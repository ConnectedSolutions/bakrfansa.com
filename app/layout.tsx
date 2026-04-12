// Root layout: passthrough para que cada route group maneje su propio <html>/<body>.
// (site)/layout.tsx  → <html lang="es"> para el portal público
// (payload)/layout.tsx → <html> de Payload CMS para el backoffice
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
