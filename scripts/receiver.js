const wrapper = document.querySelector("#wrapper");
const question = document.querySelector("#question");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const gif = document.getElementById("gif-div");
const counter = document.getElementById("nobtnCounter");
var clickcounter = 0;
const personList = [];

// Hämta wrapper-elementets position relativt till sidans överkant och vänsterkant
const wrapperBounds = wrapper.getBoundingClientRect();
const wrapperLeft = wrapperBounds.left;
const wrapperTop = wrapperBounds.top;

noBtn.addEventListener("mouseover", () => {
    const maxLeft = wrapperBounds.width - noBtn.offsetWidth;
    const maxTop = wrapperBounds.height - noBtn.offsetHeight;
    // Generera slumpmässiga positioner inom wrapper-elementet
    let newLeft = Math.floor(Math.random() * maxLeft);
    let newTop = Math.floor(Math.random() * maxTop);

    // Begränsa knappens position så att den hoppar inom //   // wrapper-elementet
    newLeft = Math.max(0, newLeft);
    newTop = Math.max(0, newTop);
    newLeft = Math.min(maxLeft, newLeft);
    newTop = Math.min(maxTop, newTop);

    // Tillämpa den nya positionen på knappen
    noBtn.style.left = newLeft + "px";
    noBtn.style.top = newTop + "px";

});

document.addEventListener("DOMContentLoaded", function(event){
    GetLocalStorageData();
    CreateHTML();
  });

yesBtn.addEventListener("click", 
    function(){
        var audio = new Audio("sounds/hitmarker.mp3");
        audio.play();

    setTimeout(function(){
        gif.style.backgroundImage = 'url("../images/dancingkid.mp4.gif")';
        gif.style.border = "2px solid white";

        noBtn.style.border = "2px solid white";
        noBtn.style.background = "black";
        noBtn.style.color = "white";

        yesBtn.style.border = "2px solid white";
        yesBtn.style.background = "white"
        yesBtn.style.color = "black"

    }, 0);
    wrapper.style.background = "black";
    question.style.color = "white";
    question.textContent = "Man tackar!";
    counter.style.color = "white";
});

noBtn.addEventListener("click", 
function(){

        clickcounter ++;
        counter.textContent = "Good job counter: " + clickcounter;
        
})

//hämtar data från localstoragae och lägger till i personlist.
function GetLocalStorageData() {

    //går igenom alla data i localstorage
    for (var i = 0; i < localStorage.length; i++) 
    {
        var key = localStorage.key([i]);
        var data = JSON.parse(localStorage.getItem(key));

        dude = new person(data.name, data.age, data.city);

        //kollar in personen existerar.
        var exists = personList.some(existingPerson => 
        {
            return existingPerson.name == dude.name && 
                   existingPerson.age == dude.age && 
                   existingPerson.city == dude.city;
        });

        //lägger till personen i listan om den inte existerar.
        if(!exists)
        {
            personList.push(dude);
        }
    }
}

const mainDiv = document.getElementById("divContainer");
var created = false;
//skapar HTML-element baserat på datan i personlist
function CreateHTML(){

    let div;

    if(!created)
    {
        div = document.createElement("div");
        div.style.padding = "10px";
        div.style.backgroundColor = "aliceblue";
        div.style.height = "auto";
        div.style.maxHeight = "200px";
        div.style.width = "590px";
        div.style.border = "1px solid black";
        div.style.borderRadius = "15px";
        div.style.borderRadius = "15px";
        div.style.marginTop = "1%";
        div.style.overflowY = "scroll";
        
        mainDiv.appendChild(div)
        created = true;
    }
    
    for(let i in personList)
        {
            let container = document.createElement("div");
            container.style.display = "grid";
            container.style.gridTemplateColumns = "80% 20%";
            container.style.height = "45px";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";
            container.style.borderBottom = "1px solid black";

            let p = document.createElement("p");
            let nameUpperCase = personList[i].name;
            p.style.fontFamily = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
            p.style.fontSize = "17px";
            p.style.marginTop = "20px";
            p.style.color = "black";
            p.style.alignContent = "center";
            p.textContent = "Thank you"+ " " + nameUpperCase + " " + "from" + " " + personList[i].city; 
            p.style.gridColumn = "1";

            let button = document.createElement("button");
            button.style.borderRadius = "10px";
            button.classList.add("remove-button");
            button.style.background = "IndianRed";
            button.innerText = "Delete";
            button.style.color = "white";
            button.style.border = "1px solid red"
            button.style.width = "auto";
            button.style.height = "35px";
            button.style.gridColumn = "2";
            button.style.cursor = "pointer";

            button.addEventListener("click", 
            function RemoveObject(){

                div.removeChild(container);

                var elementCounter = div.childElementCount;
                console.log("count"+ " " + elementCounter);

                if(elementCounter ===0)
                {
                    div.remove();
                }})

            container.appendChild(p);
            container.appendChild(button);
            div.appendChild(container);
        }

    //räknar child-elementen av divsen(personerna) är dem färre än 1 så raderar vi diven. 
    
}
