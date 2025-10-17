import { useEffect } from "react";

// CHANGE: Updated the type to accept a ref that can be null.
// This makes the hook more robust and compatible with standard React patterns.
export const useKeyboardShortcuts = (
  inputRef: React.RefObject<HTMLInputElement | null>
) => {
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus input
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // The optional chaining (?.) here already handles the case where the ref might be null.
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [inputRef]);
};
