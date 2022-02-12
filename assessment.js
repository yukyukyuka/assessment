'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = "";
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたに本命チョコを渡したい人') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #私にに本命チョコを渡したい人';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

};

const answers = [
  '{userName}に本命チョコを渡したい人は1人です。',
  '{userName}に本命チョコを渡したい人は6人です。',
  '{userName}に本命チョコを渡したい人は8人です。',
  '{userName}に本命チョコを渡したい人は34人です。',
  '{userName}に本命チョコを渡したい人は5人です。',
  '{userName}に本命チョコを渡したい人は65人です。',
  '{userName}に本命チョコを渡したい人は142人です。',
  '{userName}に本命チョコを渡したい人は74人です。',
  '{userName}に本命チョコを渡したい人は188人です。',
  '{userName}に本命チョコを渡したい人は123人です。',
  '{userName}に本命チョコを渡したい人は4人です。',
  '{userName}に本命チョコを渡したい人は2人です。',
  '{userName}に本命チョコを渡したい人は3人です。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);