import { useEffect } from "react";

export const useOnMount = (onMount: any) =>
    useEffect(() => {
        onMount && onMount();
}, []);