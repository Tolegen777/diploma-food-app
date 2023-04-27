import React from "react";
import {useStateValue} from "../../../context/StateProvider";
import {Card} from 'antd';
import {useQuery} from "react-query";
import {IFoodItemContent} from "../../../../types";
import {productApi} from "../../../api/productApi";
import {ICommentResponse} from "../../../types/commentsTypes";
import {contactApi} from "../../../api/contactApi";

const MessageList = () => {

    const [{ restaurant_id }] =
        useStateValue();

    const { data: comments } = useQuery<ICommentResponse[]>(
        ['comment'],
        () => contactApi.getContact(restaurant_id),
        {enabled: !!restaurant_id},
    );

  return (
      <Card title="Сообщения">
          {comments?.map((item) => <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={"Автор: " + item.email}
          >
              {item.description}
          </Card>)}

      </Card>
  );
};

export default MessageList;
