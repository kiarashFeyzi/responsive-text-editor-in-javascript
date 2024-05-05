let isbold = {value : false},
isItalic = {value : false},
isMarked = {value : false},
isDeleted = {value : false},
isSmall = {value : false},
isSuperScript = {value : false},
isSubScript = {value : false},
isUnderLined = {value : false},
isBig = {value : false}


let buttonOf_bold = document.getElementById("boldBtn"),

buttonOf_italic = document.getElementById("italicBtn"),

buttonOf_mark = document.getElementById("markBtn"),

buttonOf_small = document.getElementById("smallBtn"),

buttonOf_delete = document.getElementById("delBtn"),

buttonOf_superscript = document.getElementById("supBtn"),
buttonOf_subscript = document.getElementById("subBtn"),

buttonOf_underline = document.getElementById("underlineBtn"),
buttonOf_big = document.getElementById("bigBtn"),


textField = document.getElementById("textField"),

result = document.getElementById("result");

let word_count = 0;


let functionOfButtons = function(flag, button){
    button.addEventListener('click', function(){
         if(flag.value) {
            flag.value = false;
             button.style.color = "black";
             button.style.backgroundColor = "white"
             button.style.border = "none";
        }
         else {
            flag.value = true;
             button.style.color = "#ccff00";
             button.style.backgroundColor = "#1f1f1f";
             button.style.border = "2px solid white";
        }

    })
    button.addEventListener('mouseover',()=>{
       
            button.style.color = "white";
            button.style.border = "4px double white";
            button.style.backgroundColor = "#1f1f1f";
       
    })
    button.addEventListener('mouseout', ()=>{
        if(flag.value){
            button.style.border = "2px solid white";
            button.style.color = "#ccff00";
        }
        else{
            button.style.border = "none";
            button.style.backgroundColor = "white";
            button.style.color = "black";
        }
        
        
        
    })
    
}

functionOfButtons(isBig, buttonOf_big)
functionOfButtons(isbold, buttonOf_bold)
functionOfButtons(isItalic, buttonOf_italic)
functionOfButtons(isMarked, buttonOf_mark)
functionOfButtons(isDeleted, buttonOf_delete)
functionOfButtons(isSmall, buttonOf_small)
functionOfButtons(isSubScript, buttonOf_subscript)
functionOfButtons(isSuperScript, buttonOf_superscript)
functionOfButtons(isUnderLined, buttonOf_underline)

function CharacterOfHTML(text_value, html_value){
    let val = text_value;
    let html_val = html_value; 
    this.getTextValue = function (){
        return val;
    }
    this.getHTMLValue = function (){
        return html_val;
    }
    this.setTextValue = function (newTextValue){
        val = newTextValue;
    }
    this.setHTMLValue = function (newHTMLValue){
        html_val = newHTMLValue;
    }
    this.equals = function (character){
        if(html_val == "<br>" && character == "\n") return true;
        if(val == "&nbsp" && character == " ") return true;
        if(val === character) return true;

        return false;
    }

}


let arrayOfHtmlCharacters = [];


document.getElementById("textBox").addEventListener('keyup', (event) => {

    if(event.ctrlKey) setTimeout(checkForUpdate, 100);
    if(event.key === "Backspace"){
        let txt = String(textField.value);
        let j = txt.length - 1;
        
        let isAppliedToJustOneCharacter = false;
        if(arrayOfHtmlCharacters.length == txt.length + 1) isAppliedToJustOneCharacter = true;

       
        for(let i = arrayOfHtmlCharacters.length - 1; i >= 0; i-- ){
            if(!(arrayOfHtmlCharacters[i].equals(txt[j]))){
                
                arrayOfHtmlCharacters.splice(i, 1);
                result.innerHTML = arrayOfHtmlCharacters_string();

                if(isAppliedToJustOneCharacter){
                    break;
                }
                j++;
            }

            j--;
        }

    }
});


let updateArrayOfCharacters = function(newElement, index){
    for(let i = arrayOfHtmlCharacters.length - 1; i >= index; i--){
        arrayOfHtmlCharacters[i + 1] = arrayOfHtmlCharacters[i]
    }
    arrayOfHtmlCharacters[index] = newElement;
}

let arrayOfHtmlCharacters_string = function(){
    let res = "";
    for(let i = 0; i < arrayOfHtmlCharacters.length; i++){
        res += arrayOfHtmlCharacters[i].getHTMLValue();
    }
    return res;
}

document.getElementById("textBox").addEventListener('keypress', (event) => {
 
    let x = event.key;

    let value = x;


    if(x == " " ) {
        value = "&nbsp";
        x = value;
    }

    if(x == "Enter" ) {
        value = null;
        x = "<br>";
    }
    else{
        if(isbold.value) {
            x = "<b>" + x + "</b>";
        }
        if(isItalic.value){
            x = "<i>" + x + "</i>";
        }
        if(isMarked.value){
            x = "<mark>" + x + "</mark>"
        }
        if(isSmall.value){
            x = "<small>" + x + "</small>";
        }
        if(isDeleted.value){
            x = "<del>" + x + "</del>";
        }
        if(isSubScript.value){
            x = "<sub>" + x + "</sub>";
        }
        if(isSuperScript.value){
            x = "<sup>" + x + "</sup>";
        }
        if(isBig.value){
            x = "<big>" + x + "</big>";
        }
        if(isUnderLined.value){
            x = "<u>" + x + "</u>";
        }
    }

    let element = new CharacterOfHTML(value, x)
   
 
    let run = function(){
    
        let txt = String(textField.value);
        
        if(arrayOfHtmlCharacters.length == 0) {
            
            result.innerHTML += element.getHTMLValue();
            arrayOfHtmlCharacters[0] = element;
            return;
        }
        let j = 0;
        
        for(let i = 0; i < arrayOfHtmlCharacters.length; i++){

            if(!arrayOfHtmlCharacters[i].equals(txt[j])){
              
                updateArrayOfCharacters(element, i);
                result.innerHTML = arrayOfHtmlCharacters_string();
        
                return;
            }
            
            j++;
                  
        }
        
     
       updateArrayOfCharacters(element, arrayOfHtmlCharacters.length);
       result.innerHTML = arrayOfHtmlCharacters_string();

    }

    setTimeout(run, 100)

 
})



let checkForUpdate = ()=>{
    let txt = String(textField.value),
    lengthOfCopiedItem = txt.length - arrayOfHtmlCharacters.length ;

    let j = 0;

    let flag = true;

    let insert = (base) => {
        let arr_1 = arrayOfHtmlCharacters.slice(0, base),
        arr_2 = arrayOfHtmlCharacters.slice(base, arrayOfHtmlCharacters.length);

        let backupOfTextField = String(textField.value);
        textField.value = backupOfTextField.substring(base, base + lengthOfCopiedItem);


        arrayOfHtmlCharacters = [];
        for(let k = 0; k < lengthOfCopiedItem; k++){
           
            let chr = txt[base + k];
            if(chr == "\n") chr = "Enter";
          
            let event = new KeyboardEvent('keypress', {'key': chr})
            document.getElementById("textBox").dispatchEvent(event);
        }

        setTimeout(()=>{
            textField.value = backupOfTextField;
             arrayOfHtmlCharacters = arr_1.concat(arrayOfHtmlCharacters).concat(arr_2);
        
             result.innerHTML = arrayOfHtmlCharacters_string();
        }, 200)
       
    }

    for(let i = 0; i < arrayOfHtmlCharacters.length; i++){

        if(!arrayOfHtmlCharacters[i].equals(txt[j])){

            insert(i);

            flag = false;
            break;

        }

        j++;

    }

    if(flag){

        insert(arrayOfHtmlCharacters.length);
    }
    
}


