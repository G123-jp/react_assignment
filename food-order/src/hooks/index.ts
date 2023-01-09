import { useMemo, useRef } from 'react';

export const usePageAnimationClass = (sourcePageNum: number, nextPageNum: number, currentPageNumber: number) => {
    const sourcePageRef = useRef(sourcePageNum);
    const animationClassName = useMemo(() => {
        const className = '';
        if (sourcePageRef.current === sourcePageNum && currentPageNumber === nextPageNum) {
            sourcePageRef.current = currentPageNumber;
            return ` page${sourcePageNum}-fadeOut`;
        }
        if (sourcePageRef.current === nextPageNum && currentPageNumber === sourcePageNum) {
            sourcePageRef.current = currentPageNumber;
            return ` page${sourcePageNum}-fadeIn`;
        }
        sourcePageRef.current = currentPageNumber;
        return className;
    }, [sourcePageRef.current, currentPageNumber, nextPageNum]);
    return animationClassName;
};
