# Reading Notes (Inertia Rails Sample)

ブログ記事「Inertia.js + Rails」用のサンプルアプリ。読書メモを管理する最小構成。

## スタック

- Rails 8.1 + SQLite + Solid Queue/Cache
- inertia_rails 3.21
- React 19 + TypeScript + Vite + Tailwind CSS 4
- Rails 8 built-in authentication

## 起動

### Docker（推奨）

```bash
docker compose up --build           # 初回ビルド + 起動
docker compose exec app bin/rails db:prepare  # 別ターミナルで初期化（初回のみ）
```

ブラウザで http://localhost:3000 を開く。

ホストにRubyやNodeを入れる必要はない。コードは bind mount しているのでホストでファイルを編集すれば即反映される（Vite HMR + Railsのcode reload）。

停止は `docker compose down`、ボリュームごと消すなら `docker compose down -v`。

### ローカル（mise + foreman）

```bash
mise use ruby@3.4.8     # 初回のみ
bundle install
pnpm install
bin/rails db:setup       # create + migrate + seed
bin/dev                  # foremanが必要 (gem install foreman)
```

## デモアカウント

- email: `demo@example.com`
- password: `password`

## ディレクトリ

```
app/
├── controllers/
│   ├── notes_controller.rb       # Inertiaでpropsを返す
│   ├── sessions_controller.rb    # Sessions/New に切替済み
│   ├── registrations_controller.rb
│   └── tags_controller.rb
├── frontend/                      # Vite管理下
│   ├── entrypoints/inertia.tsx   # Inertia起動点
│   ├── layouts/AppLayout.tsx
│   ├── components/NoteForm.tsx
│   ├── pages/
│   │   ├── Sessions/New.tsx
│   │   ├── Registrations/New.tsx
│   │   └── Notes/{Index,Show,New,Edit}.tsx
│   └── types/index.ts
└── models/{user,note,tag,note_tag}.rb
```

開発用のDocker周辺ファイル：

- `Dockerfile.dev` — Ruby 3.4.8 + Node 22 + pnpm入りの開発イメージ
- `compose.yml` — bundle / node_modules / tmp をvolumeで永続化、3000/3036をexpose
- `.dockerignore` — Rails標準 + `.idea` `.vscode` `.claude` を除外

## 確認できるInertia機能

- `render inertia: 'Notes/Index', props: { ... }` でcontrollerからpropsを返す
- `useForm` でRailsのvalidation errorsをそのままformに反映
- `inertia_share` で `current_user` / flash を全pageに共有
- `router.get(... { only: [...] })` で部分propsだけ更新（タグフィルタ）
- `redirect_to ... inertia: { errors: ... }` でPRGしつつエラーをUIへ
- Rails 8セッション + CSRFがそのまま機能する
