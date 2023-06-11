import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import "./infoCard.css"

const InfoCard = () => {
    return (
        <>
                    <li className="cards_item">
                        <div className="card">
                            <div className="card_image">
                                <img src="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg"
                                     alt="mixed vegetable salad in a mason jar."/>
                                <span className="card_price"><ShoppingCartOutlined style={{fontSize: "30px"}} /></span>
                            </div>
                            <div className="card_content">
                                <h2 className="card_title">
                                    Farmstand Salad
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <div className="card_price2">kkkk</div>
                                    </div>

                                </h2>
                                <div className="card_text">
                                    <p>Dig into the freshest veggies of the season! This salad-in-a-jar features a
                                        mixture of
                                        leafy greens and seasonal vegetables, fresh from the farmer's market.
                                    </p>
                                    <hr/>
                                    <p>Served with your choice of dressing on the side: <strong>housemade
                                        ranch</strong>, <strong>cherry balsamic
                                        vinaigrette</strong>, <strong>creamy chipotle</strong>, <strong>avocado green
                                        goddess</strong>, or <strong>honey mustard</strong>. Add your choice
                                        of protein for $2 more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
        </>
    );
};

export default InfoCard;