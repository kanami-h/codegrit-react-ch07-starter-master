import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import ConversationListItem from '../ConversationListItem';
import { ReactComponent as Loader } from '../../../images/loading.svg';

const ConversationListWrapper = styled.ul({
  "height": "360px",
  "width": "360px",
  "overflowY": "scroll",
  "display": "flex",
  "flexDirection": "column",
  "border": "1px solid #ddd",
  "list-style": 'none',
})

const LoadMoreBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 10
})

const LoadMoreMessage = styled.div({
  color: '#999',
  fontSize: '0.8em',
}, ({ hasMore }) => {
  const styles = []
  if (hasMore) {
    styles.push({
      cursor: 'pointer',
    })
  }
  return styles;
});

// 無名関数宣言で定義されいてるLoadMoreコンポーネントですが、返り値を持っていないですね
// 「さらに読み込む」「これ以上ありません」と表示切り替えをするコンポーネントなので、仮に何か文字列をJSXで返すように記述すると一時的にブラウザでも反映がチェックできるようになります
// 例:
// return (
//   <LoadMoreMessage>LoadMoreコンポーネント</LoadMoreMessage>
// )
const LoadMore = () => {
  return(
    <LoadMoreMessage>LoadMoreコンポーネント</LoadMoreMessage>
  )
}

const EmptyBox = () => (
  <div css={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "360px",
    width: "360px",
    border: "1px solid #ddd",
  }}>
    <Loader width={60} height={60} />
  </div>
);

export default class extends Component {
  render() {
    return (
      <ConversationListWrapper>
        <LoadMore />
      </ConversationListWrapper>
    );
  }

}