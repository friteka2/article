const reg_btn = document.getElementById("reg_btn")
const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const confim_input = document.getElementById("confim")

reg_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "" && confim_input.value !== "") {
        if (password_input.value === confim_input.value){
            const xhr = new XMLHttpRequest()
            xhr.open("POST", "http://localhost:3000/register", true)
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
                    else{
                        const message = JSON.parse(xhr.responseText)
                        if (message.error === "Email already used"){
                            alert("Почта уже используется!")
                        }
                        else{
                            alert("Произошла неизвестная ошибка!")
                        }
                    }      
                }
            }
            
            xhr.send(JSON.stringify(data))
        }        
        else alert("Пароль не совпадают!")
    }
    else alert("Поля не могут быть пустыми!")

}