import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default function useSearchParams(sourceDefaultParams: any = {}) {
  const [defaultParams, setDefaultParams] = useState(sourceDefaultParams);
  const [params, setParams] = useState(defaultParams);

  useEffect(() => {
    setParams(defaultParams);
  }, [defaultParams, setParams]);

  const actions = {
    set: setParams,
    assign: useAssign(setParams),
    reset: useReset(setParams, defaultParams),
    setDefault: setDefaultParams,
  };

  return [params, actions];
}

function useReset(setState: any, defaultParams: any) {
  return useCallback(
    (reset: any, nextValue: any) => {
      const nextValue_n = _.isUndefined(nextValue)
        ? _.clone(defaultParams)
        : nextValue;
      setState(nextValue_n);
      if (_.isFunction(reset)) reset(null, nextValue_n);
    },
    [setState, defaultParams],
  );
}

function useAssign(setState: any) {
  return useCallback(
    (newParams: any) => {
      setState((x: any) => _.assign({}, x, newParams));
    },
    [setState],
  );
}
