import React, { Component } from "react";
import { fetchChatData } from "../../chatData";
import ConversationList from "./ConversationList";

export default class extends Component {
  state = {
    chosenId: 1,
    page: 1,
    hasNextPage: true,
    conversations: [],
    loadingInitial: true,
    loadingMore: false,
  };

  handleChooseConversation = (e, chatId) => {
    // onClickイベント
    // もしチャットがクリックされたらchosenIdを上書きさせる（違うidだった場合）
    // setStateでidを上書きする
    // e.preventDefault();
    if (chatId !== this.state.chosenId) {
      this.setState({
        chosenId: chatId,
      });
    }
  };

  async componentDidMount() {
    // fetchChatDataファンクションを利用してデータを取得しましょう。
    const chatData = await fetchChatData();
    this.setState({
      loadingInitial: false,
      conversations: chatData.conversations,
    });
  }

  fetchMoreConversations = () => {
    // 2ページ目以降のデータを取得しましょう。
  };

  render() {
    // propsをJSXコンポーネントに渡す用意が必要です
    // ヒントthis.stateを使います
    const {
      chosenId,
      loadingInitial,
      conversations,
      loadingMore,
      hasNextPage,
      hasMore,
    } = this.state;
    const ConversationListProps = {
      chosenId,
      loadingInitial,
      conversations,
      loadingMore,
      hasNextPage,
      hasMore,
      handleChooseConversation: this.handleChooseConversation,
    };
    return <ConversationList {...ConversationListProps} />;
  }
}
