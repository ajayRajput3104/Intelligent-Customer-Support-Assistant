"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SendHorizonal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
// CHANGE: Corrected the import path to ensure the alias resolves correctly.
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const MAX_MESSAGE_LENGTH = 500;

const FormSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: "Message cannot be empty.",
    })
    .max(MAX_MESSAGE_LENGTH, {
      message: `Message cannot be longer than ${MAX_MESSAGE_LENGTH} characters.`,
    }),
});

interface InputBoxProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function InputBox({ onSendMessage, isLoading }: InputBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useKeyboardShortcuts(inputRef);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSendMessage(data.message);
    form.reset();
  }

  const messageValue = form.watch("message");

  return (
    <Form {...form}>
      <div className="w-full max-w-2xl mx-auto">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormControl>
                  <Input
                    className="h-12"
                    ref={(e) => {
                      field.ref(e);
                      (
                        inputRef as React.MutableRefObject<HTMLInputElement | null>
                      ).current = e;
                    }}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    name={field.name}
                    disabled={isLoading}
                    placeholder="Ask anything... (Ctrl+K to focus)"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    aria-label="Message input"
                    aria-describedby="message-hint"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0 text-xs" />
                {messageValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => form.reset()}
                  >
                    <X className="h-8 w-8" />
                  </Button>
                )}
              </FormItem>
            )}
          />
          <Button
            className="h-12 w-12"
            type="submit"
            size="icon"
            disabled={isLoading || !messageValue}
          >
            <SendHorizonal className="w-6 h-6" />
          </Button>
        </form>
        <div className="flex justify-end items-center px-1">
          <span className="text-xs text-muted-foreground">
            {messageValue.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
        <span id="message-hint" className="sr-only">
          Press Enter to send.
        </span>
      </div>
    </Form>
  );
}
