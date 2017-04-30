# THE 65TH SUIRANFES


## Build Info

![travis-ci badge](https://travis-ci.org/suiranfes/2017.suiranfes.com.svg?branch=master)

## How to Build

1. node.jsをインストールします
2. https://github.com/suiranfes/2017.suiranfes.com の中身をダウンロードします
3. 解凍するかgit cloneしたらそこで以下のコマンドを実行していきます

```
npm i
npm i grunt-cli -g
grunt
```

## 公開前にやること

Service Workerの更新を自動化するのが面倒臭いので、手動でやってください。

1. `grunt pug`を実行し、url群をコピーする
2. `src/text/urls.txt`に以下の要領で書き込む
  * `https://2017.suiranfes.com`または`https://2017-dev.suiranfes.com`を削除する
3. いったんコミットする
4. `grunt`または単体でも`grunt sw`

## About This Site

ビルド前のコード自体はsrcにあります。

pugがhtmlになり、stylがcssになり、jsがjsになります。imgは手動でdocsに投げてください(ただしたいていの画像はcdnに格納します)。

中央集約ファイルとして、stylはstyle.styl,jsはmain.jsに集約しています。ファイルを分ける場合は、これにそのファイルをそのように追加してください。

pugのmixin(+～～()で参照しているもの)はincludes/mixins.pugにすべて集約しています(でないと面倒臭い)。その他にも多くの共通部品はincludesにあります。

pug記法、styl記法は慣れられるはず、というよりむしろhtmlやcssより使いやすいはずです。わからなかったらggr。

apiの素はconfigに入っています。2つファイルがありますが、同じように使えます。pugでは普通に(.区切りで)、stylでは-区切りで参照できます。

一般展示、イベントなどの配列リストタイプはpug/includes/_script.pugではじめに適宜ソートしています。

あとは、見よう見まねで(汗)

## Commit Message

- 機能追加:`すごーい！`
- 機能追加続き:`すっごーい！`
- 破壊的変更:`やったね！`
- バグ修正:`たのしー！`
- バグ修正続き:`たーのしー！`
- 細かい変更:`わーい！`
- Typo:`あれれー？`
- 打ち止め:`はやくはやくー！`