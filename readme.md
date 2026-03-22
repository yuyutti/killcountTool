# Kill Count Tool

配信者向けのシンプルなキルカウンターです。

## アプリ画面

![アプリケーションUI](./readmeAsset/Screenshot%202026-03-20%20124244.png)

## 機能

- キル数の加算 / 減算
- 金額からキル数を自動計算
- OBS連携（kill.txt出力）

アプリで設定した数字をリアルタイムにOBSへ出力できます！  
テキストとして読み込むためフォントや色も自由に変更可能です！

※環境によっては数秒程度の更新遅延が発生する場合があります

## ダウンロード

👉 GitHubの[Releases](https://github.com/yuyutti/killcountTool/releases)からダウンロードしてください  
※スタンドアロン(インストール不要)のアプリケーションです。

## 使い方

1. アプリを起動
2. OBSで「テキスト（GDI+）」を追加
3. 「ファイルから読み込み」をON
4. 「ドキュメント」→「killCountTool」を開く
5. 「kill.txt」を開く

[![Watch the video](https://img.youtube.com/vi/5Lbg-Q8XlCs/hqdefault.jpg)](https://www.youtube.com/embed/5Lbg-Q8XlCs)

[<img src="https://img.youtube.com/vi/5Lbg-Q8XlCs/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/5Lbg-Q8XlCs)

## kill.txtの場所

kill.txt は以下のフォルダに自動生成されます：

Documents\killCountTool

※ OneDriveを使用している場合は  
OneDrive\Documents\killCountTool になることがあります

## 注意

初回起動時にWindowsの警告（PCを保護しました）が表示される場合があります。
「詳細情報」→「実行」を押してください。

![警告1](./readmeAsset/Screenshot%202026-03-20%20125114.png)
「詳細情報」をクリック

![警告2](./readmeAsset/Screenshot%202026-03-20%20124910.png)  
「実行」をクリック  

※一度許可すると、次回以降は通常通り起動します

## 設定リセット

設定をリセットしたい場合は、  
保存先フォルダ内のファイルを削除してください。

## 免責事項
本ソフトウェアは無保証で提供されています。
本ソフトウェアの使用または使用不能によって生じた損害（データの損失、業務の中断、その他のあらゆる損害を含みますがこれに限りません）について、開発者は一切の責任を負いません。

## ライセンス

MIT