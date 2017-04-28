# Suika

[![Build Status by Travis CI](https://travis-ci.org/tamaina/Suika.svg?branch=master)](https://travis-ci.org/tamaina/Suika)
[![Build status by AppVeyor](https://ci.appveyor.com/api/projects/status/b6rn5tseqbc0w3v7/branch/master?svg=true)](https://ci.appveyor.com/project/tamaina/suika/branch/master)
[![devDependency Status](https://david-dm.org/tamaina/Suika/master/dev-status.svg)](https://david-dm.org/tamaina/Suika/master?type=dev)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[https://suika.tmin.cf/v4-alpha.4/](https://suika.tmin.cf/v4-alpha.4/)

[![Suika](docs/assets/img/sample.png)](https://suika.tmin.cf/v4-alpha.4/)

"Suika" は日本語も美しく表示できるBootstrapテーマです。

## About "Suika"

通常の[Bootstrap](http://getbootstrap.com/)では、日本語のフォント指定や文字サイズは最適とはいえません。"Suika"のベースとなった["Honoka"](honokak.osaka)は、そんなBootstrapをベースに、日本語表示に適したフォント指定や、文字サイズに関するコードを追記したBootstrapテーマの一つです。

"Suika"では、日本語JIS第2水準漢字まで対応のウェブフォントが付加されています。(英字フォントもちゃっかりM+に置き換わっています。)

簡単にエセ和風にしたい方は、どうぞお使いください。

名前に意味は特にないです。そういう風潮だったので適当に東方Projectからキャラクターの名前を選んだだけです。

## Live Demo

 * [日本語デモ: https://suika.tmin.cf/v4-alpha.4/bootstrap.html](https://suika.tmin.cf/v4-alpha.4/bootstrap.html) 

## Getting Started


### Basic Template

Bootstrapをつかってウェブページを作成する際に基本となるHTML部分は以下のようになります。CDNを指定してありますから、すぐに利用することが出来ます。

**また、v3系をお使いの場合、必ずご確認ください。**

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- 上記のmetaタグ群は必須ですので、常にhtmlの最初に書かれるようにしてください。 -->
    <title>Bootstrap 雛形</title>

    <!-- BootstrapのCSS -->
    <link href="https://cdn.tmin.cf/suika/4.0.0-alpha.4/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- bodyの一番最後 -->
    <!-- 「①jquery(v3系)」「②Tether」「③bootstrap(.min).js」の順で読み込みます。 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://cdn.tmin.cf/suika/4.0.0-alpha.4/js/bootstrap.min.js"></script>
  </body>
</html>
```

### CDN

SuikaではCloudFlareを利用したCDNを利用できます。

```html
<link href="https://cdn.tmin.cf/suika/4.0.0-alpha.4/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<script src="https://cdn.tmin.cf/suika/4.0.0-alpha.4/js/bootstrap.min.js"></script>
```

### Download

[Releases](https://github.com/tamaina/Suika/releases)から最新版をダウンロードしてください。

### Bower

[Bower](http://bower.io/)からインストールすることができます。パッケージ名は**Suika**です。

以下のコマンドを実行してください。

```
bower install --save-dev Suika#v4.0.0-alpha.4
```

## Usage

Suikaは単なるBootstrapテーマにしか過ぎないため，基本的な使い方は本家Bootstrapとほとんど変わりません。よって以下に書くことは[本家Bootstrap](http://v4-alpha.getbootstrap.com/getting-started/)からの引用，もしくはその一部を変更したものです。用意されたCSSクラスやコンポーネントなど，より詳細な使い方のドキュメントは本家Bootstrapの各種リファレンスページをご覧になることを推奨します。

* [Documentation](http://v4-alpha.getbootstrap.com/getting-started/introduction/)

### Package

配布しているzipファイルの内容物は以下のとおりです。``bootstrap.min.*``といったように，ファイル名に``min``がつくファイルは，改行やインデント・スペーシングをなくした(minifyされた)コードで，ユーザがウェブページを読み込む際の転送量を少なくすることができます。通常はこの``bootstrap.min.*``を使うことをおすすめします。

```
master/
├─ index.html
├─ bootstrap.html
├─ README.md (このファイル)
├─ css/
│   ├─ bootstrap.css
│   └─ bootstrap.min.css
├─ fonts/
│   ├─ (全48ファイル･省略)
└─ js/
     ├─ bootstrap.js
     └─ bootstrap.min.js
```

### Do you hate WebFont?

WebFontを利用したくない場合は、fork元の[Honoka](http://honokak.osaka)をご利用ください。

普通の源真ゴシックは、fork元の[Honoka](http://chen.tmin.cf/v4-alpha.4)をご利用ください。

というか、これを使うとどう足掻いても3MBの読み込みが必須になるため、使うのは良くないと思います(じゃあなぜ公開したし)。

[このあたりでWebFontを軽くする(見せる)方法を紹介してたりします。](https://tamaina.github.io/The-Japanese-Web-Fonts/#!HowToSet.md)

補足:```.text-font-mpp```または```.text-font-mpc```の付与で"M+ P"と"M+ C"の切り替えができます。

## License

[MIT License](LICENSE)

但しいろは角クラシック(GenShinGothic又はirohakakuCから始まるファイル群)は[SIL Open Font License 1.1](https://ja.osdn.net/projects/opensource/wiki/SIL_Open_Font_License_1.1)

## Author

 * windyakin ([http://windyakin.net](http://windyakin.net/))

## Editor

 * tamaina ([http://tmin.cf](https://tamaina.github.io/))