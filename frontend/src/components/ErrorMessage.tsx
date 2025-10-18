interface ErrorMessageProps {
  error?: any
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  let actualError = error
  if (error && typeof error !== 'string' && error.length) {
    actualError = error[0]
  }
  if (!actualError) return null

  return (
    <pre className="bg-red-600 text-lavender px-2.5 py-2.5 pl-3.5 rounded-md border-l-4 border-l-lavender whitespace-pre-wrap">
      {typeof actualError === 'string'
        ? actualError
        : actualError.message?.replace('GraphQL error: ', '') ||
          'Unknown error'}
    </pre>
  )
}
