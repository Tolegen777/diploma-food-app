import {FaUserCog} from "react-icons/fa";
import {MdExitToApp} from "react-icons/md";
import {RiAdminLine} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useStateValue} from "../../context/StateProvider";
import {logout, ToggleAdminMode} from "../../utils/functions";
import {Roles} from "../../const/roles";
import {useTranslation} from "react-i18next";
import {useRef, useState} from "react";
import {Button, Select} from "antd";
import styled from "styled-components";
import {useOnClickOutside} from "../../hook/hooks";

export const HeaderWrapper = styled.div`
  box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  -webkit-box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  -moz-box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  position: relative;
  padding: 18px 21px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;

  .settings {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 0.5rem 2rem;
    background: #fff;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 2;
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
    color: #4cd964;
    transition: 0.5s;
  }

  .clicked {
    font-size: 1.2rem;
    color: #4cd964;
  }

  .item {
    border-bottom: 1px solid #dcdcdc;
    padding: 5px 0;
    width: 100%;
  }

  .username {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  .username span {
    margin-right: 1rem;
  }

  img {
    height: 30px;
  }

  .logo__line {
    margin: 0 10px;
    color: #5ac8fa;
  }

  .logo__text {
    font-size: 16px;
    font-weight: 600;
  }

  .wrapper-lang {
    width: 150px;
  }
`;
const DropDown = ({user}: { user: any; }) => {
    const navigate = useNavigate();
    const [{role}, dispatch] = useStateValue();

    const {i18n, t} = useTranslation();

    const ref = useRef<HTMLDivElement>(null);

    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);

    useOnClickOutside(ref, () => setIsComponentVisible(false));

    const languages = [
        {value: "ru", label: "Русский"},
        {value: "kk", label: "Қазақша"},
        {value: "en", label: "English"},
    ];

    const changeLanguage = (lan: string) => {
        i18n.changeLanguage(lan);
        localStorage.setItem("language", lan);
    };

    const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
        localStorage.getItem("language") || ''
    );
    const handleChangeLanguage = (value: any) => {
        typeof value?.value === "string" && setSelectedFilterOption(value.value);
        changeLanguage(`${value?.value}`);
    }

    const handleClickOpenDropdown = () => setIsComponentVisible(true);

    return (
        <header>
            <HeaderWrapper>
                <span
                    className={`${isComponentVisible ? "clicked " : ''}user`}
                    onClick={handleClickOpenDropdown}
                >
          <FaUserCog/>
        </span>
                {isComponentVisible && (
                    <div ref={ref} className="settings">
            <span className="username item">
              <span>
                <FaUserCog/>
              </span>
                {user?.displayName || user?.email}
            </span>
                        <span className="item">
              <Select
                  options={languages}
                  placeholder={t("columns.language")}
                  onChange={(i) => handleChangeLanguage(i)}
                  value={languages.find((e) => e.value === selectedFilterOption)}
              />
            </span>

                        {role === Roles.restaurant && (
                            <Link
                                className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
                                to={"/admin"}
                                onClick={() => ToggleAdminMode(dispatch, true)}
                            >
                                Панель управления
                                <RiAdminLine/>
                            </Link>
                        )}

                        <span className="item">
              <Button
                  className={"primary"}
                  onClick={() => logout(user, dispatch, navigate)}
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

export default DropDown;
