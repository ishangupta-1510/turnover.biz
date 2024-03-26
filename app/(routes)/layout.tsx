import Header from "@/components/ui/Header";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
