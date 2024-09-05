# **School System**

### **開発計画書 Development Plan Document**

**#### 基本情報**

学校管理

- *Github Repository SSH**

[https://github.com/mardoodmuh/School-System](https://github.com/mardoodmuh/School-System)
- *編集者の名前**

モハンマド

- *チームの名前**

Horizon

- *チームメンバー名前**

モハンマド

- *開発期間**

６ヶ月

- *使用する言語、ライブラリ、開発ツール、環境など**

- Django
- React.js
- MongoDB

- *テーマや条件などがある場合は記述**

なし

- *開発物の大まかな内容や対象の説明**

学校管理のアプリは、名前通り、学校の管理員や学生だけがアクセスできるWebサイトです。Webサイトでは、先生は課題や試験の内容や時間を入力し、学生は課題を提出したり、試験の結果を見たりすることができます。

---

**#### 詳細情報**

- *開発物の意義**

管理システムはどこの組織でも使われており、学校では先生/担当者と生徒つなぐ便利な工具です。

- *開発する理由や動機**

発展したサイトを作ることで、自分のWebに関する知識を増やすことができ、せっかく日本語でサイトを作るなら日本語の練習にもなるかと。

- *画面遷移のイメージ画像と説明**
- *完成像のイメージ画像と説明**
- *ディレクトリ構造(ファイル構造)の設計と説明**

```
school management system/
├── backend
│   ├── backend
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── settings.cpython-312.pyc
│   │   │   ├── urls.cpython-312.pyc
│   │   │   └── wsgi.cpython-312.pyc
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── main
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   └── views.py
│   ├── manage.py
│   └── users
│       ├── admin.py
│       ├── apps.py
│       ├── __init__.py
│       ├── migrations
│       │   └── __init__.py
│       ├── models.py
│       ├── tests.py
│       └── views.py
└── frontend
    ├── package.json
    ├── package-lock.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── README.md
    └── src
        ├── App.css
        ├── App.js
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        └── setupTests.js
```

- *プロジェクトの設計と説明**

![名称未設定ファイル.drawio.png](97XpHRv1E-名称未設定ファイル.drawio.png)
