type TableWrapperProps = {
  children: React.ReactNode;
};

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="overflow-hidden rounded-xl border shadow-xs">
      {children}
    </div>
  );
}
