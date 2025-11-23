export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-mono">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div className="flex items-center gap-1 text-lg font-medium text-muted-foreground">
          <span>&gt;</span>
          <span className="animate-pulse">Initializing system...</span>
        </div>
      </div>
    </div>
  );
}
