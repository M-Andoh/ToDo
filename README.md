# ToDo

## 準備
```
$ composer create-project laravel/laravel todo-app  
$ cd todo-app  
$ echo "# ToDo" >> README.md  
$ git init  
$ git add README.md  
$ git commit -m "first commit"  
$ git branch -M main  
$ git remote add origin git@github.com:xxxxx/ToDo.git  
$ git push -u origin main  
```

## sail インストール & 初期設定
```
$ php artisan sail:install  
(mysqlを選択：ご自由に）   
$ sail artisan key:generate
```

### config/app.php の変更
```
    'timezone' => 'UTC',
    ==>    
    'timezone' => env('APP_TIMEZONE', 'UTC'),
```

### .env の変更
```
APP_NAME=ToDo
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja
APP_FAKER_LOCALE=ja_JP

（以下は自由に）
DB_DATABASE
DB_USERNAME
DB_PASSWORD
```

```
$ sail up -d  
(mysqlを選択：ご自由に）   
$ sail artisan key:generate
```

### db準備
- database/migrations/0001_01_01_000000_create_users_table.php の変更   

以下を追加してみました。
```
$table->tinyInteger('role_id')->default(0);
```

- 動作確認
```
$ sail up -d
$ sail artisan migrate
```

http://localhost に接続

## breeze インストール
### breeze 初期設定
```
$ sail composer require laravel/breeze --dev
$ sail artisan breeze:install
(Blade with Alpine, dark mode, PHPUnit を選択)
```
### breez 日本語化
```
$ sail composer require askdkc/breezejp --dev
$ sail artisan breezejp
```

http://localhost に接続

## API有効化
```
$ sail artisan install:api
```


## ToDo/ToDoDetailモデルの作成
### ファイルの準備
  migrateファイル  
  seedファイル  
  factoryファイル  
  controlファイル(resource)  
```
$ sail artisan make:model ToDo -msfr
$ sail artisan make:model ToDoDetail -msfr
$ sail artisan make:request ToDo/StoreRequest
$ sail artisan make:request ToDo/UpdateRequest
$ sail artisan make:request ToDoDetail/StoreRequest
$ sail artisan make:request ToDoDetail/UpdateRequest
```

### migrateファイルの変更
- to_dosテーブルにフィールド追加
```
$table->string('title');
```

- to_do_detailsテーブルにフィールド追加
```
$table->foreignId('to_do_id')
->references('id')
->on('to_dos');
$table->text('name');
$table->boolean('completed_flag')->default(false);
```
- 設定実施
```
$ sail artisan migrate
```

### factoryファイルの変更

database/factories/ToDoFactory.php　  
database/factories/ToDoDetailFactory.php  

### Seederファイルの変更

database/seeders/DatabaseSeeder.php

### Seeder実行
```
$ sail artisan db:seed
```

### Modeファイルの変更
app/Models/ToDo.php  
app/Models/ToDoDetail.php　  

## APIの設定
### ToDo/ToDoDetailルートの設定
routes/api.php

### コントローラーの作成
app\Http\Controllers\ToDoController;
app\Http\Controllers\ToDoDetailController;

## React のインストール
### モジュールのインストール
```
$ sail npm install
$ sail npm install -D react react-dom @types/react @types/react-dom
$ sail npm install -D @vitejs/plugin-react
```

### Typescriptのインストール
```
sail npm install -D typescript
sail npx tsc --init --jsx react-jsx
```

### Viteの設定
vite.config.js の修正
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; //追加する

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/app.tsx'], // ts/app.tsxに変更 ※tsディレクトリは後ほど作成する
            refresh: true,
        }),
        react(), //追加する
    ],
});
```

### resources/views/index.blade.phpを作成
resources/views/index.blade.php を追加  
resources/ts/app.tsx を追加  
resources/components/index.tsx を追加  

### ルーティングの変更
```
Route::get('/', function () {
    return view('index');
})->middleware(['auth', 'verified'])->name('dashboard');

```

### MaterialUIをインストールする
```
$ npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### サンプルアプリ追加
表示機能のみ

### 変更処理追加
    phpmyadmin起動追加
    hocksの分離
    import修正
    props修正
    key指定
    ディレクトリ名修正

### ToDo更新追加

### ToDoDetail.name更新追加l

### ToDoDetail.completed_flag更新追加l

### ToDo更新時Optimistic Update

### ToDoDetail更新時Optimistic Update

### ToDoDetailを削除する

### ToDoを削除する




