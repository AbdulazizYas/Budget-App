import { useEffect, useState } from "react";

export default function useLocalStorage(key, dvalue) {
  
  const [value, setValue] = useState(() => {
    const jsonvalue = localStorage.getItem(key);

    if (jsonvalue) return JSON.parse(jsonvalue);

    if (typeof dvalue === "function") {return dvalue();}
    else{return dvalue;}
  });

  useEffect(() =>{
    localStorage.setItem(key,JSON.stringify(value));
  },[key,value]);

  return [value, setValue];
}
