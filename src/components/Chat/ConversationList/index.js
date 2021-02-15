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
  // stateは親コンポーネント（コンテナーコンポーネント）に定義して使うもので、子コンポーネント（プレゼンテーションコンポーネント）ではprops呼び出しの記述です
  // state = {
  //   loadingInitial: false,
  // }
  render() {
    const {
      loadingInitial,
    } = this.props;// このファイルはプレゼンテーションコンポーネントなのでstateがなく、受け取りのthis.propsです
    // let card; EmptyBoxを格納する必要はなく、JSXとして返り値に指定すればOKです
    // remderはメソッド、つまり関数なので、最終的に変える返り値が必要です。返り値を返すreturn文が必要です
    if(loadingInitial){// loadingInitialの初期値はfalseです。つまりloadingInitialだけでも意味は同じです
      return <EmptyBox />;
    }
    // 個々のチャットをどうリストの塊としてここに処理をしていくか指示していく必要があるので、もう少し具体的な処理内容の返り値が必要になりそうです。
    // elseでは説明が十分にできないので、ここは一度elseで何も返さないreturnで終えてしまい、まずはそこまででコンパイルできる状態まで持っていきます
    // {card}そのほかに渡すべきpropsを渡しましょう
    return (
      <ConversationListWrapper>
        {loadingInitial}
      </ConversationListWrapper>
    );
  }

}