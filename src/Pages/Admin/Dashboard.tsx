import {useState} from 'react';
import {Content, Sidenav, Stats} from '../../components';
import {useTranslation} from "react-i18next";


const Dashboard = () => {

    const { t } = useTranslation();

    const [activePage, setActivePage] = useState(t("columns.adminPanel") ?? '');
    const [element, setElement] = useState<JSX.Element>(<Stats/>);
    return (
        <div className="h-screen flex w-full gap-2 items-start">
            <Sidenav activePage={activePage} setActivePage={setActivePage} setPageContent={setElement}/>
            <Content pageTitle={activePage} Element={element}/>
        </div>
    );
}


export default Dashboard;