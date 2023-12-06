type CardHeaderProps = {
  children: React.ReactNode;
};

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 border-b px-6 py-5 sm:flex-row">
      {children}
    </div>
  );
}

export function CardHeaderTextContent({ children }: CardHeaderProps) {
  return <div className="flex flex-1 flex-col gap-1">{children}</div>;
}

export function CardHeaderTitle({ children }: CardHeaderProps) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardHeaderDescription({ children }: CardHeaderProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function CardHeaderActions({ children }: CardHeaderProps) {
  return <div className="flex gap-3">{children}</div>;
}
