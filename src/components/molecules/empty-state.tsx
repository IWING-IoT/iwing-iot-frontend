type EmptyStateProps = {
  children: React.ReactNode;
};

export function EmptyStateImage({ children }: EmptyStateProps) {
  return <div className="w-60 text-primary">{children}</div>;
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <div className="m-4 flex flex-1 flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}

export function EmptyStateTextContent({ children }: EmptyStateProps) {
  return <div className="flex flex-col items-center gap-2">{children}</div>;
}

export function EmptyStateTitle({ children }: EmptyStateProps) {
  return (
    <h2 className="text-center text-xl font-semibold text-foreground">
      {children}
    </h2>
  );
}

export function EmptyStateDescription({ children }: EmptyStateProps) {
  return (
    <p className="text-center text-base font-normal text-muted-foreground">
      {children}
    </p>
  );
}

export function EmptyStateAction({ children }: EmptyStateProps) {
  return <div className="flex gap-3">{children}</div>;
}
