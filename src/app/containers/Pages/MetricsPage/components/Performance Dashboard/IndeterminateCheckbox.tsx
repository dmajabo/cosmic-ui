import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';

interface Props {
  readonly indeterminate?: boolean;
}

const useCombinedRefs = (...refs: any): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref: any) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
  const defaultRef = React.useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  const classes = PerformanceDashboardStyles();

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);

  return <input className={classes.checkbox} type="checkbox" ref={combinedRef} {...rest} />;
});

export default IndeterminateCheckbox;
