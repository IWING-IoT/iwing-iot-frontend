type EmptyStateProps = {
  children: React.ReactNode;
};

export const EmptyStateImage = ({ children }: EmptyStateProps) => {
  return <div className="w-60 text-primary">{children}</div>;
};

export const EmptyState = ({ children }: EmptyStateProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
};

export const EmptyStateTextContent = ({ children }: EmptyStateProps) => {
  return <div className="flex flex-col items-center gap-2">{children}</div>;
};

export const EmptyStateTitle = ({ children }: EmptyStateProps) => {
  return <h2 className="text-xl font-semibold text-foreground">{children}</h2>;
};

export const EmptyStateDescription = ({ children }: EmptyStateProps) => {
  return (
    <p className="text-base font-normal text-muted-foreground">{children}</p>
  );
};

export const EmptyStateAction = ({ children }: EmptyStateProps) => {
  return <div className="flex gap-3">{children}</div>;
};
