import React from "react";
import {useStateValue} from "../../../context/StateProvider";
import {Card} from 'antd';
import {useQuery} from "react-query";
import {ICommentResponse} from "../../../types/commentsTypes";
import {contactApi} from "../../../api/contactApi";
import {userService} from "../../../services/userService";

const MessageList = () => {

    const restaurant_id = userService.getRestId()

    const [] =
        useStateValue();

    const {data: comments} = useQuery<ICommentResponse[]>(
        ['comment'],
        () => contactApi.getContact(restaurant_id.toString()),
        {enabled: !!restaurant_id},
    );

    return (
        <Card title="Сообщения">
            {comments?.map((item) => <Card
                style={{marginTop: 16}}
                type="inner"
                title={"Автор: " + item.email}
            >
                {item.description}
            </Card>)}

        </Card>
    );
};

export default MessageList;
