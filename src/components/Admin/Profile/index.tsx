import React, {useRef, useState} from "react";
import {MdExitToApp} from "react-icons/md";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Select, SelectProps} from "antd";
import {useStateValue} from "../../../context/StateProvider";
import {Avatar} from "../../Assets";
import {Roles} from "../../../const/roles";
import {useNavigate} from "react-router-dom";
import {logout, ToggleAdminMode} from "../../../utils/functions";
import {CloseCircleOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import {userService} from "../../../services/userService";

export interface FormSelectProps extends SelectProps {
    arrow_none?: 'active'
}

export const FormSelect = styled(Select)<FormSelectProps>`
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

export const HeaderWrapper = styled.div`
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

export const Profile: React.FC = () => {
    const languages = [
        {value: "kk", label: "Қазақша"},
        {value: "ru", label: "Русский"},
        {value: "en", label: "English"},
    ];

    const {t} = useTranslation();

    const user = userService.getLocalUserEmail()

    const navigate = useNavigate();

    const [{role}, dispatch] = useStateValue();
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
    // debugger
    return (
        <header ref={ref}>
            <HeaderWrapper>
        <span
            className={`${isComponentVisible ? "clicked " : ''}user`}
            onClick={handleClickOpenDropdown}
        >
          {/*<img*/}
          {/*    src={Avatar}*/}
          {/*    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"*/}
          {/*    alt="profile"*/}
          {/*/>*/}
            <UserOutlined style={{color: "#fff", fontSize: "30px", border: "1px solid #fff", padding: "5px", borderRadius: "4px"}} />
        </span>
                {isComponentVisible && <div style={{
                    position: "absolute",
                    top: "104%",
                    left: "74%",
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
                        {role !== Roles.restaurant && <span className="username item">
                  <div
                      className="px-10 py-0 flex items-center text-textColor"
                  >
                    {user}
                  </div>
            </span>}
                        {role === Roles.restaurant && <span className="username item">
                  <div
                      className="cursor-pointer px-6 py-0 flex items-center hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
                      onClick={() => {
                          ToggleAdminMode(dispatch, 'true')
                          navigate('/admin')
                      }}
                  >
                   {t("columns.adminPanel")}
                  </div>
            </span>}
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
                  onClick={() => logout(user, dispatch, navigate)}
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
                <span>{t("columns.logout")}</span>
              </Button>
            </span>
                    </div>
                )}
            </HeaderWrapper>
        </header>
    );
};
