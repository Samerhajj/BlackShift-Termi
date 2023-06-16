// React
import React from 'react';

// Components
import CategorySelector from "../../../components/CategorySelector";

// Translate
import { useTranslation } from 'react-i18next';

// CSS And Elements
import { Modal, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { AiOutlineArrowRight } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Select } from "antd";

// API
import LanguageMap from '../../../api/LanguageAPI';

function SettingsModal({ onClose , initialCategory, categoryChanged, settings}) {

  const { Option } = Select;
  const filterLanguages = ()=>{
    let data = Object.keys(LanguageMap).filter(language => LanguageMap[language].name !== settings.language.toLang && LanguageMap[language].name !== settings.language.fromLang);
    return LanguageMap[data[0]].name;
  };
  const { i18n, t } = useTranslation();
  
  return (
      <Modal show={true} onHide={() => onClose()} dir="ltr">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        {settings.category ? (
            <CategorySelector category={settings.category.initialCategory} categoryChanged={(newCategory) => {settings.category.categoryChanged(newCategory)}}/>
          ):null
        }
        {settings.language ? (
        <div className="border rounded p-3">
          <div className="text-center">{t("games.menu.language")}</div>
          <div className="d-flex justify-content-evenly align-items-center">
            <div>
              {Object.keys(LanguageMap)
                .filter(language => LanguageMap[language].name === settings.language.fromLang)
                .map(language => (
                  <Button 
                    className="m-0 p-2"
                    variant="transparent"
                    key={language}
                    onClick={() => settings.language.fromLangChanged(filterLanguages)}>
                    <Image className="img-fluid" src={LanguageMap[language].src}/>
                  </Button>
                ))}
            </div>
            <IconContext.Provider value={{ size: "3rem" }}>
							<AiOutlineArrowRight/>
						</IconContext.Provider>
            <div>
            {Object.keys(LanguageMap)
              .filter(language => LanguageMap[language].name === settings.language.toLang)
              .map(language => (
                <Button 
                  className="m-0 p-2"
                  variant="transparent"
                  key={language}
                  onClick={() => {settings.language.toLangChanged(filterLanguages)}}>
                  <Image className="img-fluid" src={LanguageMap[language].src}/>
                </Button>
              ))}
            </div>
          </div>
        </div>
        ):null
      }
      {settings.difficulty ?  (
        <div className="form-floating" dir="ltr">
          <select id="difficulty"
                  className="form-select show-menu-arrow form-select pb-1"
                  data-style="btn-primary"
                  title="Difficulty"
                  placeholder="select a difficulty"
                  value={settings.difficulty.initialDifficultyIndex}
                  onChange={(e)=>{settings.difficulty.difficultyChanged(e.target.value)}}>
            { settings.difficulty.availableDifficulties.map((difficulty, index) => (
              <option key={index} value={index}>{difficulty}</option>
            ))}
          </select>
          <label htmlFor="difficulty">{t("games.menu.difficulty")}</label>
        </div>
      ):null
      }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
