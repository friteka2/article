const login_btn = document.getElementById("login_btn")
const email_input = document.getElementById("email")
const password_input = document.getElementById("password")

login_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "") {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3000/login", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        const data = {
            email: email_input.value,
            password: password_input.value
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200){
                    localStorage.setItem("user", JSON.stringify(data))
                    location.href = "../html/article.html"
                }
                else {
                    console.log(JSON.parse(xhr.responseText))
                    const message = JSON.parse(xhr.responseText)
                    if (message.error === "User not found"){
                        alert("Пользвотель не найден!")
                    }
                    else if (message.error === "Password is wrong"){
                        alert("Неверный пароль!")
                    }

                    else{
                        alert("Произошла неизвестная ошибка!")
                    }
                }       
            }
        }
        xhr.send(JSON.stringify(data))
    }
    else{
        alert("Поля не могут быть пустыми!")
    }
}
