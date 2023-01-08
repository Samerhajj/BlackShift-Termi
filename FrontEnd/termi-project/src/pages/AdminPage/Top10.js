import React,{useState,useEffect,useCallback} from 'react';
import { useNavigate} from 'react-router-dom';
import AdminAPI from '../../api/AdminAPI';

const Top10 = () =>{
    const navigate = useNavigate();
    const [list,setList]= useState([]);
    
    const getTop10 = async () =>{
        const res = await AdminAPI.top10();
        if(res.success){
            setList(res.body.data);
        }
        else{
            console.log(res.message)
        }
    }
    useEffect(()=>{
        getTop10();
    },[])

    return(<div>
        <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong className="text-white">Welcome Admin User...</strong>
            </h1>
          </div>
        </div>
      </div>
      
    <button className="su-button mb-2" onClick={()=>getTop10()}>TOP 10</button>
    <button className="su-button mb-2" onClick={handleAdminPanel}>Back To Panel</button>
    
    {
    list.map((item,index)=>{
        return(
        <div>
        <center>
                <h5>{item['conceptName']['english']}</h5>
                <h5>With Search Count : {item['searchCount']}</h5>
        </center>
        <hr></hr>
        </div>
        )
    })
    }
    </div>)
    
  function handleAdminPanel(){
    navigate('/admin');
  };
    
}
export default Top10;