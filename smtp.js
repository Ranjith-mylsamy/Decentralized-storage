function sendmail(){
    console.log("Email has been sent");
    Email.send({
        SecureToken :"adc5ade1-bd51-4c68-aa0d-8b7da731aa33",
        To : 'www.ranjithranjithsmart@gmail.com',
        From : "www.ranjithranjithsmart@gmail.com",
        Subject : document.getElementById('subject').value,
        Body : "Name: " + document.getElementById("text").value
            + "<br> Email: " + document.getElementById("email").value
            + "<br> Phone No: " + document.getElementById('number').value
            + "<br> Message: " + document.getElementById('query').value
    })};