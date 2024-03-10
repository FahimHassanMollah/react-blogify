import { useEffect } from 'react';
const useInfiniteScroll = (loaderRef,hasMoreData,fetchCallback) => {
  useEffect(() => {
    const handleOnIntersection = (entries) => {
      const target = entries[0];
      if (target?.isIntersecting && hasMoreData) {
        fetchCallback();
      }
    }
    const observer = new IntersectionObserver(handleOnIntersection);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [fetchCallback, hasMoreData, loaderRef])
  

  return ;
}

export default useInfiniteScroll