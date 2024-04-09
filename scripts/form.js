//hämtar elementen från Html
const nameinput = document.getElementById("username");
const ageinput = document.getElementById("age");
const cityinput = document.getElementById("city");
const submitBtn = document.getElementById("submitbtn");

//kollar om personen i fråga finns i localstorage, för att senare använda i if-stats.
function isPersonInLocalstorage(nameinput)
{
    return localStorage.getItem(nameinput);
}

submitBtn.addEventListener("click", 
function(event){
    
    event.preventDefault();
    console.log("we got here");
    let dude = new person(nameinput.value, ageinput.value, cityinput.value);
    
    if(isPersonInLocalstorage(dude.name) == null && nameinput != "")
    {
        localStorage.setItem(dude.name, JSON.stringify(dude));
        console.log( dude.name + " added to localstorage");
    }
    else
    {
        console.log(dude.name + " already exisist in localstorage");
    }
    nameinput.value = "";
    ageinput.value = "";
    cityinput.value = "";

    window.location = "receiver.html";
});