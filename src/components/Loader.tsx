import { Loader2 } from "lucide-react";

// CHANGE: New reusable loader component.
export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{text}</span>
    </div>
  );
}
