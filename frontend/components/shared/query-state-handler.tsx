export function QueryStateHandler({
  isLoading,
  isError,
  loading,
  error,
  children,
}: QueryStateHandlerProps) {
  if (isLoading) {
    return <>{loading}</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return <>{children}</>;
}

interface QueryStateHandlerProps {
  isLoading: boolean;
  isError: boolean;
  loading: React.ReactNode;
  error: React.ReactNode;
  children: React.ReactNode;
}
