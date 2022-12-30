import React,{useEffect,useState} from 'react';
import axios from 'axios';
import FavCard from './FavCard'
import fav from './fav.css'
import UserAPI from '../../api/UserAPI';

const Favorite  = ({initialLanguage}) =>{
    const [list,setList] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const [language,setLanguage]=useState(initialLanguage);
    //--> functions
    const handle_showMore = async () => {
        const response = await UserAPI.favorites();
        if (response.success) {
          setList([...response.body]);
          setIsOpen(!isOpen);
        } else {
          alert(response.message);
        }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Update the language of the FavCard components
    setList(list.map((card) => {
      return {
        ...card,
        initialLanguage: newLanguage
      };
    }));
  };
    
    // try{
        //         let x = JSON.parse(localStorage.getItem('profileBody'));
        //         // console.log(x['email']);
        //         let email = x.email;
        //         // console.log(email);
        //         const res1 = await axios.post("http://dir.y2022.kinneret.cc:7013/user/favorite", {email:email})
        //         // const res1 = await axios.post(favoriteRoute1, {email:email})
        //         // const rrr =  await axios.post(displayMytermsRoute1,{list:res1.data});

        //         const rrr =  await axios.post("http://dir.y2022.kinneret.cc:7013/search/display-myterms",{list:res1.data});
        //         // console.log("here neeeww")
        //         // console.log(rrr.data);
        //         // console.log("here neeeww")
        //         // console.log(res1);
        //         let temp = [];
        //         temp = res1.data;
        //         let temp1 = [];
        //         temp1 = rrr.data;
        //         // const responst = UserAPI.Favorite();
        //         // temp = rrr.data;
        //         // console.log(`this is temp1 : \n ${temp1} `)
        //         // console.log(`this is temp : \n ${temp}`)
        //         // setList([...temp])
        //         setList([...temp1])
        //         setIsOpen(!isOpen);
        //         // console.log(list);
    // }catch(e){
        //     console.log(e);
        // }
    return (
    <>
    <div className="banner banner_note">
        <div className="wrapper">
            <div className="banner_content fade-in-element">
                <h1><strong>Favorite</strong></h1>
            </div>
         </div>
    </div>
    <div className="wrapper">
        <button className="btn btn-primary" onClick={handle_showMore}>Show More</button>
        {(isOpen) ?
        (
        list.map((item,index)=>{
            return(<FavCard key={index} index={index} data={item} list={list} setList={setList} initialLanguage={language} changeLanguage={changeLanguage}/>)
        }) 
        )
        : 
        (null)
        }
    </div>
    </>
)}
export default Favorite;
