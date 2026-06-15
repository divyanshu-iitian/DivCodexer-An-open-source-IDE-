import { IDELayout } from "@/components/layout/IDELayout";
import { useShortcuts } from "@/hooks/useShortcuts";
import { usePersistence } from "@/hooks/usePersistence";

export default function App() {
  useShortcuts();
  usePersistence();
  return <IDELayout />;
}
