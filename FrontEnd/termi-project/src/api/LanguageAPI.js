
import uk from '../assets/images/uk.svg';
import sa from '../assets/images/sa.svg';
import il from '../assets/images/il.svg';


const LanguageMap = {
    en: { name:"english", dir: "ltr" , active:true , src:uk },
    he: { name:"hebrew", dir: "rtl" , active:false , src:il },
    ar: { name:"arabic", dir: "rtl" , active:false , src:sa }
};

export default LanguageMap;