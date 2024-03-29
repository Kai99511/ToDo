const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));//localStorage.getItem("キー")データの取得

//todosが(true)空じゃなかったらliタグを追加する
if (todos) {
    todos.forEach(todo => {
        add(todo);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault(); //フォームをサブミットしたときのリロードをしないようにする
    add();//呼び出し元
});

//入力された値をリストに追加
function add(todo) {    //todo引数を受け取る
    let todoText = input.value;//valueフォームの値を取り出す

    if (todo) {
        todoText = todo.text;
    }

    if (todoText.length > 0) { //0文字以上の値が入力された場合true (length>0)はなくても良い。暗黙的型変換
        const li = document.createElement("li");

        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through")
        }

        // 削除ボタンを生成
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '削除';
        deleteButton.classList.add('btn', 'btn-danger','ms-2',); // Bootstrapのスタイルを追加

        // 削除ボタンをクリックしたときの処理
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation(); // クリックイベントが親要素に伝播しないようにする
            deleteTask(li);
        });

        // リストアイテムに削除ボタンを追加
        li.appendChild(deleteButton);
       
        ul.appendChild(li);//ulタグの子供としてタグ追加できる
        input.value = "";//入力フォームを空にする
        saveData();
    }
}

// タスクを削除する関数
function deleteTask(task) {
    ul.removeChild(task);
    saveData();
}


//TODOの記録
function saveData() {
    const lists = document.querySelectorAll("li");//liタグをすべて取ってくる
    let todos = [];//配列

    //例:forEach
    //const array = [1,2,3]
    //array.forEach(value=>{
    //console.log(value * 2);
    //});2.4.6

    lists.forEach(list => {
        //オブジェクト
        let todo = {
            text: list.textContent.replace("削除", ""),
            completed: list.classList.contains
                ("text-decoration-line-through")
        };
        todos.push(todo);
    });
    //localStorage.setItem("キー","値")　ローカルストレージへの保存
    //JSON.stringify JSON:JavaScriptのオブジェクトの書き方を元にしたデータ定義方法
    //ローカルへの保存ができる　検証＞アプリケーション＞ローカルストレージ
    localStorage.setItem("todos", JSON.stringify(todos));
}


