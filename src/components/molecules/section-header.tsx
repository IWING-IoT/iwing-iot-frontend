type SectionHeaderProps = {
  children: React.ReactNode;
};

export function SectionHeader({ children }: SectionHeaderProps) {
  return <div className="flex gap-4">{children}</div>;
}

export function SectionHeaderTextContent({ children }: SectionHeaderProps) {
  return <div className="flex flex-1 flex-col gap-1">{children}</div>;
}

export function SectionHeaderTitle({ children }: SectionHeaderProps) {
  return <h2 className="text-xl font-semibold sm:text-2xl">{children}</h2>;
}

export function SectionHeaderDescription({ children }: SectionHeaderProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function SectionHeaderAction({ children }: SectionHeaderProps) {
  return <div className="flex gap-3">{children}</div>;
}
