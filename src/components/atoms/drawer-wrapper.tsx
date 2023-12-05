type DrawerWrapperProps = {
  children: React.ReactNode;
};

export function DrawerWrapper({ children }: DrawerWrapperProps) {
  return (
    <div vaul-drawer-wrapper="" className="min-h-[100vh] bg-background">
      {children}
    </div>
  );
}
