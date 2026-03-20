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

1. ダウンロードしたexeを起動
2. [ファイル] → [保存先のパスをコピー]
3. OBSで「テキスト（GDI+）」を追加
4. 「ファイルから読み込み」をON
5. さっきコピーした保存パスを上のアドレスバーにペーストしてkill.txtを指定

<video src="./readmeAsset/output.mp4" controls></video>

## kill.txtの場所

kill.txt は以下のフォルダに自動生成されます：

Documents\killCountTool

※ OneDriveを使用している場合は  
OneDrive\Documents\killCountTool になることがあります

## 注意

- 初回起動時にセキュリティ警告が表示される場合があります
- Windows Defenderにブロックされることがありますが、安全なアプリです

### 起動方法

![警告1](./readmeAsset/Screenshot%202026-03-20%20125114.png)
「詳細情報」をクリック

![警告2](./readmeAsset/Screenshot%202026-03-20%20124910.png)  
「実行」をクリック  

※一度許可すると、次回以降は通常通り起動します

## 設定リセット

設定をリセットしたい場合は、  
保存先フォルダ内のファイルを削除してください。

## ライセンス

MIT