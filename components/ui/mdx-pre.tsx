"use client";

import { ReactElement, useRef } from "react";
import { CopyButton } from "@/components/ui/copy-button";

interface PreProps {
  children: ReactElement;
  raw?: string;
  [key: string]: any;
}

export function Pre({ children, raw, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);

  const getTextContent = () => {
    if (raw) return raw;
    if (preRef.current) {
      return preRef.current.textContent || "";
    }
    return "";
  };

  return (
    <div className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <CopyButton text={getTextContent()} />
    </div>
  );
}