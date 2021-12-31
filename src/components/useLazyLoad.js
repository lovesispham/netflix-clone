import {useState, useEffect, useCallback, useRef} from 'react'

 function useLazyLoad(customCallback) {
    const endPageRef = useRef(null)
    const [isIntersecting, setIsIntersecting] = useState(false)
    const currenRef = endPageRef.current

    const callbackFunction = useCallback((entries)=>{
        const [entry] = entries
        setIsIntersecting(entry.isIntersecting)

        if(entry.isIntersecting)
            customCallback()

    },[customCallback])

    useEffect(() => {
       const observer = new IntersectionObserver(callbackFunction)
       if(currenRef)
            observer.observe(currenRef)

        return () => {
            if(currenRef)
            observer.unobserve(currenRef)
        }
    }, [currenRef, callbackFunction])

    return [endPageRef, isIntersecting]
}

export default useLazyLoad
