import React, {useRef, useState} from "react";
import {MdExitToApp} from "react-icons/md";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Select, SelectProps} from "antd";
import {useNavigate} from "react-router-dom";
import {CloseCircleOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import {useStateValue} from "../../context/StateProvider";

export interface FormSelectProps extends SelectProps {
    arrow_none?: 'active'
}

const FormSelect = styled(Select)<FormSelectProps>`
  .ant-select-selector {
    height: 40px !important;
    min-width: 122px;
    border-radius: 8px !important;
    display: flex;
    align-items: center;
    font-size: 14px;

    .ant-select-selection-item-content {
      color: #fff;
    }

    .ant-select-selection-placeholder {
      font-size: 14px;
    }
  }

  .ant-select-selection-overflow-item .ant-select-selection-item {
    border-radius: 16px;
    color: #fff;
    background-color: #55caf1;
  }


  &.ant-select-lg .ant-select-selector .ant-select-selection-search-input {
    height: 100% !important;
  }

`;

const HeaderWrapper = styled.div`
  position: relative;
  padding: 18px 21px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;

  .settings {
    position: absolute;
    width: 150px;
    top: 100%;
    right: 0;
    padding: 2px;
    background: #fff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 2;
    justify-content: center;
    align-items: center;
  }

  .logo,
  .user-info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .user {
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 1rem;
  }

  .user:hover {
    transition: 0.5s;
  }

  .clicked {
    font-size: 1.2rem;
  }

  .item {
    border-bottom: 1px solid #dcdcdc;
    padding: 5px 0;
    width: 80%;
  }

  .username {
    width: 80%;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    justify-content: center;
  }

  .username span {
    margin-right: 1rem;
  }

  img {
    height: 30px;
  }

  .logo__line {
    margin: 0 10px;
  }

  .logo__text {
    font-size: 16px;
    font-weight: 600;
  }

  .wrapper-lang {
    width: 150px;
  }
`;

export const Profile2: React.FC = () => {
    const languages = [
        {value: "kk", label: "Қазақша"},
        {value: "ru", label: "Русский"},
        {value: "en", label: "English"},
    ];

    const {t} = useTranslation();

    const navigate = useNavigate();

    const [dispatch] = useStateValue();
    const ref = useRef<HTMLDivElement>(null);

    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);
    const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
        'kk'
    );
    // useOnClickOutside(ref, () => setIsComponentVisible(false));

    const handleClickOpenDropdown = () => setIsComponentVisible(!isComponentVisible);
    const {i18n} = useTranslation();
    const changeLanguage = (lan: string) => {
        i18n.changeLanguage(lan);
        dispatch({
            type: "SET_LNG",
            token: lan,
        });
    };
    const handleChangeLanguage = (value: any) => {
        setSelectedFilterOption(value);
        changeLanguage(value);
    }

    return (
        <header ref={ref}>
            <HeaderWrapper>
        <span
            className={`${isComponentVisible ? "clicked " : ''}user`}
            onClick={handleClickOpenDropdown}
        >
            <UserOutlined style={{color: "#fff", fontSize: "30px", border: "1px solid #fff", padding: "5px", borderRadius: "4px"}} />
        </span>
                {isComponentVisible && <div style={{
                    position: "absolute",
                    top: "94%",
                    left: "82%",
                    zIndex: "100",
                    color: "#F9812B"
                }}
                                            onClick={() => setIsComponentVisible(false)}
                >
                    <CloseCircleOutlined
                        style={{fontSize: "20px", fontWeight: 800, cursor: "pointer"}}
                    />
                </div>}
                {isComponentVisible && (
                    <div className="settings">
                        <span className="item"
                              style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <FormSelect
                  onChange={(i) => {
                      handleChangeLanguage(i)
                  }}
                  options={languages}
                  value={selectedFilterOption}
                  placeholder="Выберите язык"
              />
            </span>

                        <span className="item"
                              style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Button
                  onClick={() => {
                      navigate('/login')
                      setIsComponentVisible(false)
                  }}
                  style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "122px",
                      background: "#F9812B",
                      color: "#fff",
                      height: "40px"
                  }}
              >
                <MdExitToApp/>
                <span>{t("columns.login")}</span>
              </Button>
            </span>
                    </div>
                )}
            </HeaderWrapper>
        </header>
    );
};
