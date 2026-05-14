# flippers-guitar-archives

The Flipper's Guitar(フリッパーズ・ギター)のファン運営アーカイブサイト。

## 目的 / Why

- 本人ら(小山田圭吾・小沢健二)がきちんとしたアーカイブを残す意思がなく、公式の網羅的な記録が存在しない。今後もそのようなプロジェクトが立ち上がる見込みは薄い。
- ファンの間で誤った情報が事実として流通している現状を是正したい。
- 過去にファンサイトは存在したが、現在メンテナンスされているものは無い。
- ライブ音源・セットリストレベルまでアーカイブしたサイトは(我々が把握する限り)存在しない。

## やること / Scope

ディスコグラフィに留まらず、以下を網羅的にアーカイブする:

1. **Discography** — シングル/アルバム/参加作品/プロデュース作品/ボックスセット/映像作品など。
   - 期間: Flipper's Guitar 期 (1987–1991) の作品が主軸。**前身バンドの Lollipop Sonic 時代 (1987–1988) の参加作品 (ソノシート・ライブカセット等) もアーカイブ対象**。**解散後にリリースされた Flipper's Guitar 名義のコンピレーション・ボックスセット・リマスター再発・映像作品もアーカイブ対象**。解散後の小山田・小沢個人の活動 (Cornelius / 小沢健二ソロ等) は対象外。
   - リマスター・再発は型番が異なれば**別エントリ**として扱う。
2. **Media (媒体出演・掲載)** — 雑誌・新聞・TV・ラジオ・Web 等の出演および掲載記録。 *(旧称 Press。TV/ラジオ出演を含むため拡張)*
3. **ライブ / Live** — 公演ごとの日付・会場・セットリスト・参加メンバーなど。
4. **ヒストリー / History** — 結成から解散、その後の動きまでを時系列で辿れる年表。各イベントは Discography / Media / Live のエントリと相互リンクできる構造にしたい。

各エントリは典拠(出典)を明示できる構造にする。誤情報訂正を目的とするため、**ソース無しの主張を載せない**方針 (Discography スキーマでは `sources.min(1)` で強制)。

### Live と Media の境界

**「客入れ (有観客) かどうか」で判定する**:

- **客入れあり → Live**
  - 単独公演・対バン・フェス
  - 公開録音・公開生放送 (例: TokyoFM ホールでのラストライブのような有観客のラジオ録音)
- **客入れなし → Media (tv / radio)**
  - TV スタジオでの演奏・トーク
  - スタジオ収録のラジオ番組
  - 雑誌・新聞・Web (当然)

両方に該当しうるイベント (有観客の TV/ラジオ収録) は **Live を主エントリ**とし、Media 側からは `relatedLive` で参照する。Media 側に重複エントリは作らない。

## 多言語 / i18n

すべてのコンテンツを **日本語と英語の両方**で閲覧可能にする。データ構造の段階で多言語前提のスキーマにする(後付けで国際化しない)。

## 技術スタック

- **フレームワーク: Astro 5** — Content Collections + Zod でスキーマ駆動、i18n ルーティング (`ja` デフォルト / `en`) が標準、デフォルトでJSを吐かないため静的アーカイブに適する。
- データは Content Collections 配下のJSONで管理し、Gitで履歴を追う。
- インタラクティブ要素(検索など)が必要になったら部分的に Islands(React/Svelte等)を導入する。

### 多言語フィールドの形式

`{ ja: string, en: string }` オブジェクトでフィールド単位に持つ (両言語必須は `localized`、片方可は `localizedOptional`)。タイトル等は両言語必須、解説などは片方のみでも可。

### コレクション構成

- `discography` — 単一コレクション + `type` フィールドで種別 (`single` / `album` / `mini-album` / `compilation` / `box-set` / `participation` / `production` / `other`) を区別。スキーマは [src/content.config.ts](src/content.config.ts)。
- Media / Live / History コレクションは未実装。実装時に discography の `relatedPress` / `relatedLive` / `relatedHistory` を `reference()` 型に置き換える。

### エントリ ID 命名規則

- ファイル名 = エントリ ID = スラッグ (Astro Content Collections のデフォルト)
- 例: `koi-to-machine-gun.json`, `doctor-heads-world-tower.json`
- `type` で種別が分かるため、ファイル名にプレフィックスは付けない

## まだ決まっていないこと / Open Questions

- ホスティング先(Cloudflare Pages / Vercel / GitHub Pages など)
- Media / Live / History コレクションのスキーマ詳細
- 検索・フィルタリングのUX
- 出典管理の粒度(現状はエントリ全体に `sources` 配列。フィールド単位の出典が必要になったら拡張)
