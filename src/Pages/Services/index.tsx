import {Card} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Services = () => {

    const { t } = useTranslation();

    return (
        <div style={{padding: '50px'}}>
            <Card title={t("columns.infoAbout")}>
                {t("columns.aboutInformation")}
            </Card>
        </div>
    );
}

export default Services;