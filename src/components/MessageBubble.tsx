import { Message } from "@/types/chat";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Bot, RefreshCw, XCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface MessageBubbleProps {
  message: Message;
  onResend: (messageId: string) => void;
  onRemove: (messageId: string) => void;
}

export default function MessageBubble({
  message,
  onRemove,
  onResend,
}: MessageBubbleProps) {
  const { role, content, analysis, id, status, created_at } = message;
  const isUser = role == "user";
  const showControls = isUser && status === "error";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Message copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy message");
    }
  };
  return (
    <div
      className={cn(
        "flex item-start gap-3 w-full",
        isUser ? "justify-start" : "justify-end"
      )}
    >
      {/*Avatar for Assistnt */}
      {!isUser && (
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            <Bot className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      )}
      {/*Message Content */}
      <div
        className={cn(
          "flex flex-col gap-1.5",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "max-w-2xl p-3 rounded-lg shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          {/*Analu=ysis Badge for Assistant */}
          {!isUser && analysis && (
            <div className="flex gap-2 mt-2">
              <Badge>{analysis.category}</Badge>
              <Badge>{analysis.sentiment}</Badge>
            </div>
          )}
        </div>
        {/*Action Buttons */}
        {showControls && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              Failed to send.
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onResend(id)}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Resend</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onRemove(id)}
            >
              <XCircle className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>

      {/* Avatar for User */}
      {isUser && (
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            <User className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
