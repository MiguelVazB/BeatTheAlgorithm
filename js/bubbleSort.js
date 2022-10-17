for (let i=0; i<10; i++){
    let number = Math.floor(Math.random() * 11);
    let newNumber = document.createElement("p");
    newNumber.innerHTML = number;
    $(".random-numbers-list").append(newNumber);
}