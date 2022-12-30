import React from "react"
import NoteStyle from './NoteStyle.css';
import { useTranslation } from 'react-i18next';

const NoteCard = ({note,setNote,noteList,id_card,setNoteList}) =>{
    const {t} = useTranslation();

    const handleOnDelete = ()=>{
        setNoteList(noteList.filter((item) => item.id !== id_card));
    }        
    
    return(
            <div id="card">
                <div className="card-body">
                    <h5 className="card-title">{note['title']}</h5>
                    <p className="card-body-text">{note['textBody']}</p>
                    <a href="#" className="btn btn-primary a-class-button-go">{t('note.goTop')}</a>
                    <a className="btn btn-danger a-class-button-delete" onClick={handleOnDelete}>{t('note.delete')}</a>
                </div>
            </div>
        )
}
export default NoteCard;
