import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header></header>
      <div className="relative w-full my-16">{children}</div>
    </div>
  );
}
