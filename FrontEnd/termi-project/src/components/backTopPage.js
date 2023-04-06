import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  
export default function backTopPage() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    console.log("-----------");
    console.log(routePath);
    console.log("-----------");
    // if (routePath.pathName != "/" || routePath.search == ""){
      onTop();
    // }
  }, [routePath]);
  
  return null;
}
