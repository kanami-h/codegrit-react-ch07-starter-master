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

const LoadMore = ({ loadingInitial, hasNextPage, loadingMore, hasMore }) => {
  // 最初のローディング時 - 何も表示しない
  if (loadingInitial) return <div />;

  console.log(hasMore);
  // 最初のローディング終了後でhasNextPageがtrue - 「更に読み込む」と表示
  if (hasNextPage) {
    return <LoadMoreMessage hasMore={hasMore}>更に読み込む</LoadMoreMessage>;
  }

  // 「更に読み込む」をクリックしローディング中 - ローディングイメージを既にある会話一覧のすぐ下に表示(幅、高さは40px)
  if (loadingMore) {
    return (
      <LoadMoreBox>
        <Loader width={40} height={40} />
      </LoadMoreBox>
    );
  }

  // hasNextPageがfalse - 「これ以上ありません」と表示
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
      chosenId,
      loadingMore,
      hasNextPage,
      handleChooseConversation,
    } = this.props;
    console.log(this.props);

    if (loadingInitial) {
      return <EmptyBox />;
    }

    const ConversationPart = conversations.map(function (conversation) {
      // 新しい配列の要素を返す
      // コンソールに出ているエラーは、この中にある記述を追加すると解消します
      const isChosen = chosenId === conversation.id;
      return (
        <ConversationListItem
          isChosen={isChosen}
          conversation={conversation}
          handleChooseConversation={handleChooseConversation}
          key={`conversation-${conversation.id}`}
        />
      );
    });

    return (
      <ConversationListWrapper>
        {ConversationPart}
        <LoadMoreBox>
          {/* LoadMoreコンポーネントで定義していて、JSXのレンダーで返すこの場所に記述のないpropsがあります */}
          <LoadMore
            loadingMore={loadingMore}
            loadingInitial={loadingInitial}
            hasNextPage={hasNextPage}
          />
        </LoadMoreBox>
      </ConversationListWrapper>
    );
  }
}
