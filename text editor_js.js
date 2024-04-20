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


document.getElementById("textBox").addEventListener('keyup', (event) => {

    if(event.ctrlKey) setTimeout(checkForUpdate, 100);
    if(event.key === "Backspace"){
        let l = String(result.innerHTML).length - 1,
        res = String(result.innerHTML),
        txt = String(textField.value);
       let j = txt.length - 1;
        
        

       let io = 0;
        for(let i = l;( i >= 0/* && j >= 0 && io < 1000*/); i--){
        //    console.log(res + "    " + txt + "    here67")
           
            let lengthOfTag = 0 ;
            if(res[i] == ">"){
                if(txt[j] == "\n" && res.substring(i - 3, i + 1) == "<br>"){
                    j--;
                    i = i - 3;

                    continue;

                }
                else if(txt[j] != "\n" && res.substring(i - 3, i + 1) == "<br>"){
                    let str = res.substring(0, i - 3) + " " + res.substring(i + 1);
                    result.innerHTML = deleteHtmlElement(str, i - 3);
                    res = result.innerHTML;
                  //  txt = txt.substring
                    i = String(result.innerHTML).length ;
                    j = txt.length - 1;
                    continue;
                }

                while(res[i] != "<"){ 

                    i--;
                    lengthOfTag++;
                }

                continue;
            }
            if(res[i] != txt[j]){

                result.innerHTML = deleteHtmlElement(res, i)
                res = result.innerHTML;
                
                i = String(result.innerHTML).length ;
                j = txt.length - 1;
                io++;
                continue;
               
            }
        
            j--;
        }
    }
});

let deleteHtmlElement = function(htmlText, index){
    let txt = String(htmlText);
    let indx = Number(index); 
    
  //  console.log(txt);

    if(txt[indx + 1] != "<" || txt[indx - 1] != ">" || txt[indx + 2] != "/"){
        return txt.substring(0, indx) + txt.substring(indx + 1);
    }
    
    let i = indx + 1;
    while(/*txt[i] != ">" &&*/ i < txt.length  && txt[i] == "<"){
        
        if(txt[i + 1] != "/" || txt.substring(i, i + 4) == "<br>") break;
        while(txt[i] != ">"){
           
            i++;
        }
        i++;
    }

    let i2 = indx -1;
    while(/*txt[i2] != "<"*/ i2 >= 0 && txt[i2 ] == ">"){
        let i3 = i2;

        
        while(txt[i3] != "<"){
            
            i3--;
        }
        if(txt[i3 + 1] == "/" || txt.substring(i3, i3 + 4) == "<br>") {
            
            break;
        }
     
        while(txt[i2] != "<"){
            i2--;
           
        }
        i2--;
    }
    
    

    return txt.substring(0, i2 + 1) + txt.substring(i );
}

let lastplainTextIndex_inHtmlString = (htmlText) =>{
    input = String(htmlText);
    for(let i = input.length - 1; i >= 0; i--){
        if(input[i] == ">"){
            while(input[i] != "<") i--;

            continue;
        }
        return i;
    }
}

document.getElementById("textBox").addEventListener('keypress', (event) => {
 
    let x = event.key

         if(x == "Enter" ) {
     
            x = "<br>";
        }
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
   
 
    let run = function(){
            let res = String(result.innerHTML),
        txt = String(textField.value);

       //console.log(res);

        if(res.length == 0) {
            result.innerHTML += x;
            return;
        }
        let j = 0;
        let offset = 0,
        numberOfTag = 0;
        for(let i = 0; i < res.length; i++){
        
            if(res[i] == "<"){
              
                if(res.substring(i , i + 4) == "<br>"){
                    if(txt[j] == "\n"){
                        i = i + 3;
                        j++;
                        continue; 
                    }
                    else if(txt[j + 1] != "\n"){
                        result.innerHTML = res.substring(0, i) + "<br>" + res.substring(i);
                        
                         return;
                    }
                    else{
                        result.innerHTML = res.substring(0, i) + x + res.substring(i);
                        return;
                    }
                }


                let flag = false;
                if(res[i + 1] == "/") flag = true;
                while(res[i] != ">"){  
                    i++;
            
                offset++;
                }
                numberOfTag++;
                offset++;

                if(flag){
                    offset = 0;
                    numberOfTag = 0;
                }
                

                continue;
            }
          
            if(res[i] != txt[j]  ){

                result.innerHTML = res.substring(0, i - offset  ) + x + res.substring(i - (offset )/*, lastplainTextIndex_inHtmlString(result.innerHTML)*/ );
                res = String(result.innerHTML);
        
                return;
            }
            
            j++;
        }
        
        result.innerHTML += x;

    }

    setTimeout(run, 100)

 
})

let checkForUpdate = ()=>{
  
    let l = String(result.innerHTML).length - 1,
    res = String(result.innerHTML),
    txt = String(textField.value);
    let j = 0;


    if(res.length == 0) {
    //    theInsertedTxt = txt.slice(j + 1, j + lengthOfCopiedItem + 1);

            for(let i = 0; i < txt.length; i ++){
                txt = txt.replace("\n","<br>");
            }
            
            result.innerHTML += txt;
    }


    let plainTextOfRes = toPlainText(res);
    let lengthOfCopiedItem =  txt.length - plainTextOfRes.length;

    let theInsertedTxt = "";

    let offset = 0,
    numberOfTag = 0;
        

    for(let i = 0; i < res.length; i++){


        if(res[i] == "<"){
            
            if(res.substring(i , i + 4) == "<br>"){
                if(txt[j] == "\n"){
                    i = i + 3;
                    j++;
                    continue;
                }
                else{

                

                    theInsertedTxt = txt.slice(j, j + lengthOfCopiedItem);
                    for(let i = 0; i < theInsertedTxt.length; i ++){
                         theInsertedTxt = theInsertedTxt.replace("\n","<br>");
                    }
                    
                   
                    result.innerHTML = res.substring(0, i - offset) + theInsertedTxt + res.substring(i - offset);
                    break;
                }
                
            }
          
            flag = false;
            if(res[i + 1] == "/") flag = true;

            while(res[i] != ">") {
                 i++;
                 offset++;
            }
            numberOfTag++;
            offset++;

            if(flag) {
                offset = 0;
                numberOfTag = 0;
            }
            continue;
        }
       
        if(res[i] != txt[j] ){
      
            theInsertedTxt = txt.slice(j, j + lengthOfCopiedItem);

            for(let i = 0; i < theInsertedTxt.length; i ++){
                theInsertedTxt = theInsertedTxt.replace("\n","<br>");
           }
            result.innerHTML = res.substring(0, i - offset) + theInsertedTxt + res.substring(i - offset);
   
            break;
        }

        if(j + 1 == plainTextOfRes.length){

            theInsertedTxt = txt.slice(j + 1, j + lengthOfCopiedItem + 1);

            for(let i = 0; i < theInsertedTxt.length; i ++){
                theInsertedTxt = theInsertedTxt.replace("\n","<br>");
            }
            
            result.innerHTML += theInsertedTxt;
            break;
        }

        j++;
    }
    
}

let toPlainText = function(htmlText){
    let txt = String(htmlText);
    for(let i = 0; i < txt.length; i++){
        if(txt[i] == "<"){
           
            while(txt[i] != ">"){
                txt = txt.substring(0, i) + "" + txt.substring(i + 1)
            }
            txt = txt.substring(0, i) + "" + txt.substring(i + 1)
            i--;
        }
    }
    return txt;
}

