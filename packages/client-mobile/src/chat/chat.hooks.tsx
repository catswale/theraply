import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import {
  mutations, subscriptions, queries, Message,
} from '@theraply/lib';

export const useChat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  async function fetchMessages(channelID: string) {
    const messageData = await API.graphql(graphqlOperation(queries.messagesByChannelId, {
      channelID,
      sortDirection: 'ASC',
    })) as MessageData;

    type MessageData = {data: {messagesByChannelID: {items: Message[]}}}
    return messageData.data.messagesByChannelID.items;
  }

  async function getMessage(id: string) {
    const messageData = await API.graphql(graphqlOperation(queries.getMessage, { id })) as Data;
    type Data = {data: {getMessage: Message}}
    console.log(messageData.data);
  }

  return {
    fetchMessages,
  };
};
