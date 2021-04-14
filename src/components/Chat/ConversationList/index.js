import React, { Component } from "react";
import styled from "@emotion/styled/macro";
import ConversationListItem from "../ConversationListItem";
import { ReactComponent as Loader } from "../../../images/loading.svg";

const ConversationListWrapper = styled.ul({
  height: "360px",
  width: "360px",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ddd",
  "list-style": "none",
});

const LoadMoreBox = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "360px",
  height: "360px",
  border: "1px solid #ddd",
  padding: 10,
});

const LoadMoreMessage = styled.div(
  {
    color: "#999",
    fontSize: "0.8em",
  },
  ({ hasMore }) => {
    const styles = [];
    if (hasMore) {
      styles.push({
        cursor: "pointer",
      });
    }
    return styles;
  },
);

const LoadMore = ({ loadingInitial, hasNextPage }) => {
  // 最初のローディング時 - 何も表示しない
  // 最初のローディング終了後でhasNextPageがtrue - 「更に読み込む」と表示
  // 「更に読み込む」をクリックしローディング中 - ローディングイメージを既にある会話一覧のすぐ下に表示(幅、高さは40px)
  // hasNextPageがfalse - 「これ以上ありません」と表示

  if (loadingInitial) return <div />;

  if (hasNextPage) {
    return <LoadMoreMessage hasMore={true}>更に読み込む</LoadMoreMessage>;
  }

  if (LoadMoreBox) {
    return (
      <LoadMoreBox>
        <Loader width={40} height={40} />
      </LoadMoreBox>
    );
  }

  if (!hasNextPage) {
    return <LoadMoreMessage>これ以上ありません</LoadMoreMessage>;
  }
};

const EmptyBox = () => {
  return (
    <LoadMoreBox>
      <Loader width={60} height={60} />
    </LoadMoreBox>
  );
};

export default class extends Component {
  render() {
    const {
      loadingInitial,
      conversations,
      handleChooseConversation,
      conversation,
      isChosen,
    } = this.props;
    // propsにどんな値が渡っているかを検証します。
    // そうすると今の状態は、loadingInitialしか値が渡っていないので、conversationsの配列が取得できず、mapがundefinedと出ているようです
    console.log(this.props);

    if (loadingInitial) {
      return <EmptyBox />;
    }
    // 個々のチャットをどうリストの塊としてここに処理をしていくか指示していく必要があるので、もう少し具体的な処理内容の返り値が必要になりそうです。
    // elseでは説明が十分にできないので、ここは一度elseで何も返さないreturnで終えてしまい、まずはそこまででコンパイルできる状態まで持っていきます
    // {card}そのほかに渡すべきpropsを渡しましょう

    // ConversationPartの文字色が薄いので、ConversationPart自体が返している返り値が、まだ返されていないことになります
    const ConversationPart = conversations.map(function (conversation) {
      // 新しい配列の要素を返す
      return (
        <ConversationListItem
          handleChooseConversation={handleChooseConversation}
          conversation={conversation}
          isChosen={isChosen}
        />
      );
    });

    return (
      <ConversationListWrapper>
        {/* ConversationPartの値の型は、無名関数なので、コンポーネントのシンタックスだと現在のエラーが出ます */}
        <ConversationPart />
        <LoadMore />
      </ConversationListWrapper>
    );
  }
}
