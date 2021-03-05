import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import {
  mutations, subscriptions, queries, Message,
} from '@theraply/lib';
import { useTherapist } from '../therapists/therapists.hooks';
import { setChats } from './chat.slice';

export const useChat = () => {
  const dispatch = useDispatch();
  const {therapists} = useTherapist();
  const {chats} = useSelector((state) => state.chat);

  useEffect(() => {
    getChats()
  }, [therapists]);

  async function getChats() {
    let chats = {} as {[key:string]: Message[]};
    for (const therapist of therapists) {
      const msgs = await fetchMessages(therapist.relationship.id);
      chats[therapist.id] = msgs;
    }
    dispatch(setChats(chats));
  }

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

  function addMessage(id: string, message: Message) {
    console.log(message.body)
    const newChat = [...chats[id]];
    newChat.push(message)
    const newChats = {...chats};
    newChats[id] = newChat;
    dispatch(setChats(newChats));
  }

  return {
    setChats: (chats) => dispatch(setChats(chats)),
    chats,
    fetchMessages,
    addMessage,
  };
};
