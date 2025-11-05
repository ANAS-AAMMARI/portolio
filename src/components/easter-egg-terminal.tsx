"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { X, Terminal, Bot } from "lucide-react";
import { easterEggTerminal, type TerminalOutput } from "@/ai/flows/easter-egg-terminal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type HistoryItem = {
  type: "command" | "response" | "system";
  content: string | TerminalOutput;
};

export function EasterEggTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      toast({
        title: "Terminal Activated",
        description: "Hidden terminal is now open. Try 'help'.",
      });
      if (history.length === 0) {
        setHistory([
          { type: "system", content: "Welcome to the interactive terminal. Type 'help' for a list of commands." },
        ]);
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, history.length, toast]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [history]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const command = inputValue.trim();
    const newHistory: HistoryItem[] = [...history, { type: "command", content: command }];
    setHistory(newHistory);
    setInputValue("");
    setIsProcessing(true);

    try {
      const result = await easterEggTerminal({ command });
      setHistory((prev) => [...prev, { type: "response", content: result }]);
    } catch (error) {
      console.error("Terminal error:", error);
      setHistory((prev) => [
        ...prev,
        { type: "system", content: "Error: Could not process command." },
      ]);
    } finally {
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-3xl h-[70vh] bg-background border-2 border-primary/50 rounded-lg shadow-glow-primary flex flex-col overflow-hidden p-0">
        <DialogHeader className="flex items-center justify-between p-2 border-b border-primary/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <DialogTitle>SECRET_TERMINAL.EGG</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <DialogDescription className="sr-only">A hidden terminal for interacting with the portfolio's AI.</DialogDescription>
        
        <ScrollArea className="flex-1 p-4 text-sm font-mono" ref={scrollAreaRef}>
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === "command" && (
                <div className="flex items-center">
                  <span className="text-primary mr-2">$</span>
                  <span>{item.content as string}</span>
                </div>
              )}
              {item.type === "response" && (
                <div className="flex items-start">
                  <Bot className="w-4 h-4 text-accent mr-2 mt-1 shrink-0" />
                  <p className="whitespace-pre-wrap text-foreground/90">{(item.content as TerminalOutput).response}</p>
                </div>
              )}
              {item.type === "system" && (
                <p className="text-muted-foreground italic">{item.content as string}</p>
              )}
            </div>
          ))}
          {isProcessing && <div className="text-primary animate-pulse">Processing...</div>}
        </ScrollArea>
        
        <div className="p-2 border-t border-primary/30">
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-primary mr-2">$</span>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isProcessing}
              className="w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              placeholder="Enter command..."
              autoComplete="off"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
