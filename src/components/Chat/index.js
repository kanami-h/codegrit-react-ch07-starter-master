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

  async componentDidMount() {
    // fetchChatDataファンクションを利用してデータを取得しましょう。
    // fetchChatDataがPromiseなのでthenで返したくなりますが、componentDidMountが実行されなければsvgローディング画像が代わりにずっと回り続けるので、エラーハンドリングはある意味そこでされます

    // ヒント: 関数fetchChatDataが実行されるべきタイミングは、「チャットデータなどのpropsが上書きされる前」それとも「後」のどちらでしょうか？ 後の場合は「待たせておく」技法がありましたね
    await fetchChatData();
    // conversations propsにからの配列を格納しているので、チャットデータではなく、空の配列がそのまま返ってきます。初期値は空でいいですが、setStateは具体的に値を代入して上書きをするものですので、stateと同じ値は重複になりますね
    // ↓ 関数fetchChatData自体を実行することによって得られる値を検証してみましょう。何が格納されていますか？
    console.log(fetchChatData());
    this.setState({
      loadingInitial: false,
      conversations: []
    })
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