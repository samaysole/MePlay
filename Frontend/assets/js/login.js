form.addEventListner("submit", () => {
    const login = {
        email: email.value,
        password:password.value
    }
    fetch("/api/login", {
        method: "POST",
        body:JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data =>{
            if(data.status == "error"){
                success.style.display = "block"
                error.style.display = "block"
                error.innerText = data.error
            }else {
                error.style.display = "block"
                success.style.display = "block"
                success.innerText = data.error
            }
        })
}) 