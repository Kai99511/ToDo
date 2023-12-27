const form = document.getElementById("form");
const input = document.getElementById("input");
const Ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function (event) {
    event.preventDefault(); //フォームをサブミットしたときのリロードをしないようにする
    add();//呼び出し元
})

//入力された値をリストに追加
function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText.length > 0) //0文字以上の値が入力された場合true (length>0)はなくても良い暗黙的型変換
    {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through")
        }
        //右クリックで削除
        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });
        //左クリックで取り消し線をつける
        li.addEventListener("click", function () {
            li.classList.toggle
                ("text-decoration-line-through")//toggleなければつける。あれば消す
            saveData();
        });

        Ul.appendChild(li);//ulタグの子供としてタグ追加できる
        input.value = "";//入力フォームを空にする
        saveData();
    }
}

//TODOの記録
function saveData() {
    const lists = document.querySelectorAll("li");//liタグをすべて取ってくる
    let todos = [];

    //例:forEach
    //const array = [1,2,3]
    //array.forEach(value=>{
    //console.log(value * 2);
    //});2.4.6

    lists.forEach(list => {
        //オブジェクト
        let todo = {
            text: list.innerText,
            completed: list.classList.contains
                ("text-decoration-line-through")
        };
        todos.push(todo);
    });
    //ローカルストレージへの保存
    localStorage.setItem("todos", JSON.stringify(todos));
}