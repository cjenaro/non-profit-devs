import { useState } from 'react';

function useMutation() {
  return [() => {}, { data: null, loading: false, error: null }];
}

export default function useMyMutation(query) {
  const [mutate, { data, loading, error }] = useMutation(query);
  const [myError, setMyError] = useState(null);

  const myMutate = async (options) => {
    return await mutate(options).catch((e) => {
      setMyError(e);
      console.error(e);
    });
  };

  return [myMutate, { data, loading, error: error || myError }];
}
