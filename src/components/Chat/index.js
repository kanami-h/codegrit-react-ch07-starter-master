import React, { Component } from 'react';
import { fetchChatData } from '../../chatData';
import ConversationList from './ConversationList';

export default class extends Component {
  state = {
    chosenId: 1,
    page: 1,
    hasNextPage: true,
    conversations: [],
    loadingInitial: true,
    loadingMore: false
  }

  handleChooseConversation = () => {}
  
  componentDidMount() {
    // fetchChatDataファンクションを利用してデータを取得しましょう。
    const chatData = await fetchChatData();
    this.setState({
      loadingInitial: false,
      conversations: chatData.conversations
    })
    console.log(chatData.conversations)
    console.log(chatData)
  }

  fetchMoreConversations = () => {
    // 2ページ目以降のデータを取得しましょう。
  }

  render() {
    return (
      <ConversationList />
    );
  }
}