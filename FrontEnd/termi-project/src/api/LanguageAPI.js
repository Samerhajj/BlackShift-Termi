import uk from '../images/uk.svg';
import sa from '../images/sa.svg';
import il from '../images/il.svg';

const LanguageMap = {
    en: { name:"english", dir: "ltr" , active:true , src:uk },
    he: { name:"hebrew", dir: "rtl" , active:false , src:il },
    ar: { name:"arabic", dir: "rtl" , active:false , src:sa }
};

export default LanguageMap;