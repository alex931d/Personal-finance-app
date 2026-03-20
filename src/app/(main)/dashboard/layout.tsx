import { VerificiationWarning } from "./_components/verificiation-warning";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="container min-h-screen px-2 py-6">
      <div className="flex flex-col gap-6 h-full">

        <main className="w-full space-y-4 h-full">

          {children}
        </main>
      </div>
    </div>
  );
}
