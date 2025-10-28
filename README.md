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
