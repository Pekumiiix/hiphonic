export function QueryStateHandler({
  isLoading,
  isError,
  isEmpty = false,
  loading,
  error,
  empty,
  children,
}: QueryStateHandlerProps) {
  if (isLoading) {
    return <>{loading}</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  if (isEmpty) {
    return <>{empty}</>;
  }

  return <>{children}</>;
}

interface QueryStateHandlerProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  loading: React.ReactNode;
  error: React.ReactNode;
  empty?: React.ReactNode;
  children: React.ReactNode;
}
