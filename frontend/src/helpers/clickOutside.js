import  { useEffect } from 'react';

const UseclickOutside = (ref ,fun) => {
  return (

    useEffect(()=>{

        const listner =(e)=>{

          if (ref.current && !ref.current.contains(e.target)) {

            fun();
          
            
            }
             
        };

         document.addEventListener('mousedown',listner);
         document.addEventListener('touchstart',listner);

         return()=>{
             document.removeEventListener('mousedown',listner);
             document.removeEventListener('touchstart',listner)
         }


    },[ref ,fun])
    
  )
}

export default UseclickOutside ;