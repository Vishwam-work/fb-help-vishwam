function Validation(value){
    let error ={}
  
    const email_patter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //email pattern
    const password_pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;   //password pattern
    if(!value.email === ""){
        error.email="Please enter your Email"
    }
    else if (!email_patter.test(value.email)){
        error.email = "Email is not valid"
    }
    else{
        error.email=""
    }
    if(!value.password === " ") {
        error.password = "Password field can't be empty"
    }
    else if (value.password.length < 6) {
        error.password = 'Password must contain at least 6 characters'
    
    }
    else if (!password_pattern.test(value.password)) {
        error.password = 'Password should include one uppercase letter, one lower case letter and one number.'
    }
    else{
        error.passwords=""
    }
    return error

}
export default Validation;