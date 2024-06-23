    

var users = [];
var userList=[];
var Name = document.getElementById("newname");
var email = document.getElementById("newemail");
var password = document.getElementById("newpassword");
var logEmail = document.getElementById("email");
var logPassword = document.getElementById("password");


var regex = {
    newname: { key: /[a-z]{3}/i, stat: false },
    newemail: { key: /^[a-z][^@ \t\r\n]+@[^@ \t\r\n\d]+\.[^@ \t\r\n\d]{2,4}$/gi, stat: false },
    newpassword: { key: /[a-z0-9]{8}/i, stat: false }
}

// ***************** SignUp Page ***************** //

if (JSON.parse(localStorage.getItem("users")) != null && JSON.parse(localStorage.getItem("users")) != []) 
    {
        users = JSON.parse(localStorage.getItem("users"));
    }

function validateInput(element) {

    if (regex[element.id].key.test(element.value) == true) {

        if (element.id == "newemail")
        {
            emailCheck(element) ;  
        }
        else {
            // console.log("not email === ");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.add("d-none");
            regex[element.id].stat = true;
        }
      
    }
    else {
        // console.log("regex no match");
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
        document.getElementById("emailAlert").classList.add("d-none");
        document.getElementById("emailInvalid").classList.remove("d-none");
        
        regex[element.id].stat = false;
    }

}
// check if email exeist 
function emailCheck(element){

    if (JSON.parse(localStorage.getItem("users")) != null && JSON.parse(localStorage.getItem("users")) != []) 
        {
            userList = JSON.parse(localStorage.getItem("users"));
            var emailExist=0;
            for (var i = 0; i < userList.length; i++) 
                {
                    if ( userList[i].userEmail.toLowerCase() == element.value.toLowerCase()) {
                        element.nextElementSibling.classList.remove("d-none");
                        document.getElementById("emailAlert").classList.remove("d-none");
                        document.getElementById("emailInvalid").classList.add("d-none");
                        regex[element.id].stat = false;
                        emailExist=1;
                    }
                   
                }
                if(emailExist == 0){
                     {
                        console.log("email new === ");
                        element.nextElementSibling.classList.add("d-none");
                        // document.getElementById("emailAlert").classList.add("d-none");
                        element.classList.add("is-valid");
                        element.classList.remove("is-invalid");
                        console.log("regex[element.id].stat = " + element.id );
                        regex[element.id].stat = true;
            
                    }
                }
        }
        else
        {
            element.nextElementSibling.classList.add("d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            regex[element.id].stat = true;
        }
   
}

function addUser(element) {
    var user = {
        userName: Name.value,
        userEmail: email.value,
        userPass: password.value
    }

    if (validation()) {
        users.push(user);
        updateLocalStorage("users", users);
        element.nextElementSibling.classList.add("d-none");
        window.location.href="../index.html";
    }
    else {
        element.nextElementSibling.classList.remove("d-none");
    }

}

// check if all inputs valid 
function validation() {
    var Status = false;
    // if(regex.newemail.stat == true)
    //      emailCheck(email);

    if (regex.newname.stat == true && regex.newemail.stat == true && regex.newpassword.stat == true) {
        Status = true;
    }

    else
        Status = false;
    return Status;
}

// ***************** Log in Page ***************** //

function login(element) {
    if (JSON.parse(localStorage.getItem("users")) != null && JSON.parse(localStorage.getItem("users")) != []) 
        {
            userList = JSON.parse(localStorage.getItem("users"));
            var emailExist=0;
            var passCorrect=0;
            
            for (var i = 0; i < userList.length; i++) 
                {
                    if (userList[i].userEmail.toLowerCase() == logEmail.value.toLowerCase()) {
                        emailExist=1;
                        if (userList[i].userPass == logPassword.value) {
                            passCorrect=1;
                            var  logName= userList[i].userName;
                            updateLocalStorage("userLogName", logName);
                            break;
                        }                        
                    }
                   
                }
                if(emailExist == 0){
                        document.getElementById("message").innerHTML=`email not exist`;
                        element.nextElementSibling.classList.remove("d-none");
  
                }
                else if(emailExist == 1 && passCorrect==0 ){
                    document.getElementById("message").innerHTML=`incorrect password`;
                    element.nextElementSibling.classList.remove("d-none");
                }
                else if(emailExist == 1 && passCorrect==1 ){
                    
                    window.location.href="./pages/welcome.html";
    
                }
        } 
        else{
           
            element.nextElementSibling.classList.remove("d-none");
        }
    
}

// ***************** Welcome Page ***************** //
function getName(){
    
    var x=JSON.parse( localStorage.getItem("userLogName"));
    document.getElementById("hh").innerHTML=`Welcome ${x}`;
}

// *********************************************** //
function updateLocalStorage(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}
