# THE 65TH SUIRANFES

https://2017.suiranfes.com

License: MIT License

## お知らせ

FontForgeはやっぱ必要ないです。

## Build Info

![travis-ci badge](https://travis-ci.org/suiranfes/2017.suiranfes.com.svg?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/suiranfes/2017.suiranfes.com.svg)](https://greenkeeper.io/)

## How to Build

1. node.jsをインストールします
2. https://github.com/suiranfes/2017.suiranfes.com の中身をダウンロードします
3. 解凍するかgit cloneしたらそこで以下のコマンドを実行していきます

```
npm i
npm i grunt-cli node-gyp -g
grunt
```

IDEの併用がほぼ必須です。持っていない人はVS Codeをインストールしましょう。

## 公開前にやること

Service Workerの更新を自動化するのが面倒臭いので、手動でやってください。

1. `grunt pug`を実行し、url群をコピーする
  * それぞれのパラメーターをキャッシュする必要があるみたい
2. `src/text/urls.txt`に以下の要領で書き込む
  * 下半分の`/assets/**/*`,`/api/**/*`は消さないように
  * `https://2017.suiranfes.com`または`https://2017-dev.suiranfes.com`を削除する
  * 空行とかなしで
3. package.jsonのversionを上げる
4. `grunt`、または`grunt sw`単体でも
  * Service Workerのキャッシュのversionを上げる(**3.**に依存)

## About This Site

できることはGruntfile.jsに記載されていることだけなので、まずその最後の方からたどっていって解読してください。

ビルド前のコード自体はsrcにあります。

pugがhtmlになり、stylがcssになり、jsがjsになります。imgは手動でdocsに投げてください(ただしたいていの画像はdocs/filesに格納します。docs/filesはService Workerの枠組みから外れて半永久的なキャシュです。)。

中央集約ファイルとして、stylはstyle.styl,jsはmain.jsに集約しています。ファイルを分ける場合は、これにそのファイルをそのように追加してください。

pugのmixin(+～～()で参照しているもの)はincludes/mixins.pugにすべて集約しています(でないと面倒臭い)。その他にも多くの共通部品はincludesにあります。

pug記法、styl記法は慣れられるはず、というよりむしろhtmlやcssより使いやすいはずです。わからなかったらggr。

apiの素はconfigに入っています。2つファイルがありますが、同じように使えます。pugでは普通に(.区切りで)、stylでは-区切りで参照できます。

一般展示、イベントなどの配列リストタイプはpug/includes/_script.pugではじめに適宜ソートしています。

Service Workerのsw.jsはOneSignalを導入する過程で捨てられました。キャッシュバージョンが99999とかになってます。

サブセットとwoff&woff2化はGruntfile.jsの上半分にあるgrunt-fontminで行っています。

あとは、見よう見まねで(汗)
