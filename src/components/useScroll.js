import {useState, useEffect} from 'react'

 function useScroll(heightlimit) {
     const [isScrolled, setIsScrolled] = useState(false)

     useEffect(() => {
         const checkScroll = () =>{
             window.scrollY > heightlimit ? setIsScrolled(true) : setIsScrolled(false)
         }

         window.addEventListener("scroll",checkScroll)
         return () => window.removeEventListener("scroll",checkScroll)
     }, [heightlimit])
    return isScrolled
}
export default useScroll