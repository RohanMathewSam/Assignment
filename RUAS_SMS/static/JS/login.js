let baseUrl = "http://127.0.0.1:8000/";
function getCSRFToken() {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null;  // Return null or handle the case where the CSRF token is not found
}

function login(event){
    event.preventDefault();
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    console.log(username,password);
    fetch(`${baseUrl}verifyUser`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'X-CSRFToken': getCSRFToken(),
                },
        body: JSON.stringify({username,password})
    }).then(response=>{
        if (!response.ok){
            throw new Error ("Encountered some problem");
        }
        return response.json();
    }).then(data=>{
        console.log(data.message);
        console.log(document.getElementById('card'));
        if (data.message==="Login Successful"){
            document.getElementById('card').style.boxShadow = '0 0 10px 2px green';
            document.getElementById('card').style.borderColor = 'green';
            document.getElementById('Username').style.boxShadow = '0 0 5px 0px green';
            document.getElementById('Username').style.borderRadius = '0px';
            document.getElementById('Password').style.boxShadow = '0 0 5px 0px green';
            document.getElementById('Password').style.borderRadius = '0px';
            window.location.href = `${baseUrl}detail/${data.position}`
        }
        else{
            document.getElementById('card').style.boxShadow = '0 0 10px 5px red';
            document.getElementById('card').style.borderColor = 'red';
            document.getElementById('Username').style.boxShadow = '0 0 5px 0px red';
            document.getElementById('Username').style.borderRadius = '0px';
            document.getElementById('Password').style.boxShadow = '0 0 5px 0px red';
            document.getElementById('Password').style.borderRadius = '0px';
            document.getElementById('message').textContent = data.message;
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').style.fontWeight = 'bold';
        }
    }).catch(error=>{
        console.log("Error: ",error);
    })
}

document.getElementById("login-btn").addEventListener('click',login);