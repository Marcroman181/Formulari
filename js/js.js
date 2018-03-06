var url="https://rawgit.com/Marcroman181/Formulari/master/xml/questions.xml";
var i=0;
var respuestas=[];
var nRespuestas=[];//COntiene la cantidad de respuestas de cada pregunta
var nota=0;
var examenRealizado=false;

window.onload = function(){ 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
	  // función personalizada que gestiona la respuesta a la petición de fichero
	  gestionarXml(this); 
	 }
	};
	xhttp.open("GET", url, true); //url del fichero
	xhttp.send();
	
	formElement=document.getElementById('myform');
	
	formElement.onsubmit=function(){
		if (!examenRealizado) {

		   	inicializar();
		   	if (confirm("¿Quieres corregir el examen?")){
				
				if (comprobar()){
					corregirText();
					corregirSelect();
					corregirMultiple();
					corregirCheckbox();
					corregirRadio();
					presentarNota();
					examenRealizado=true;
				}
			}
		}else{
			alert("Ya has corregido el examen");
		}
		return false;		
	}

}
// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){

	var xmlDoc = dadesXml.responseXML;
	var titulos;
	var opciones=[];
	var numeroQuestion;

	//Titles i numero de respostes
	for(numeroQuestion=0; numeroQuestion<10;numeroQuestion++){
		titulos=xmlDoc.getElementsByTagName("title")[numeroQuestion].innerHTML;
		document.getElementsByTagName("h3")[numeroQuestion].innerHTML=titulos;
		
		nRespuestas[numeroQuestion]=xmlDoc.getElementsByTagName("question")[numeroQuestion].getElementsByTagName("answer").length;
		respuestas[numeroQuestion]=[];
		for(i=0; i<nRespuestas[numeroQuestion]; i++){

			respuestas[numeroQuestion][i] = xmlDoc.getElementsByTagName("question")[numeroQuestion].getElementsByTagName("answer")[i].innerHTML;
			
		}
	}

	//Selects y SelectMultiple
	for(numeroQuestion=0; numeroQuestion<4;numeroQuestion++){
	  
	  	opciones=[];
		var nopt = xmlDoc.getElementsByTagName("question")[numeroQuestion+2].getElementsByTagName("option").length;
	  	for (j = 0; j < nopt; j++) { 
	  		opciones[j] = xmlDoc.getElementsByTagName("question")[numeroQuestion+2].getElementsByTagName("option")[j].innerHTML;
	  	}
		 ponerDatosSelectHtml(opciones,numeroQuestion);
	}

	//Checkbox
	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){

		opciones=[];
 		var nopt = xmlDoc.getElementsByTagName("question")[numeroQuestion+6].getElementsByTagName("option").length;
 		for (j = 0; j < nopt; j++) { 
    		opciones[j] = xmlDoc.getElementsByTagName("question")[numeroQuestion+6].getElementsByTagName("option")[j].innerHTML;
 		}
 		ponerDatosCheckboxHtml(opciones,numeroQuestion);
 	}

 	//Radio
	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){

		opciones=[];
 		var nopt = xmlDoc.getElementsByTagName("question")[numeroQuestion+8].getElementsByTagName("option").length;
 		for (j = 0; j < nopt; j++) { 
    		opciones[j] = xmlDoc.getElementsByTagName("question")[numeroQuestion+8].getElementsByTagName("option")[j].innerHTML;
 		}
 		ponerDatosRadioHtml(opciones,numeroQuestion);
 	}
}


function ponerDatosSelectHtml(opt,nSelect){

  var select = document.getElementsByTagName("select")[nSelect];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i;
    select.options.add(option);
 } 
}

function ponerDatosCheckboxHtml(opt, nCheckbox){
	var pregunta="siete";
	if (nCheckbox==1){
		pregunta="ocho";
	}
	
	var checkboxContainer=document.getElementsByTagName("fieldset")[nCheckbox+6];
 	for (i = 0; i < opt.length; i++) { 
	    var input = document.createElement("input");
	    var label = document.createElement("label");
	    label.innerHTML=opt[i];
	    label.setAttribute("for", pregunta+i+nCheckbox);
	    input.type="checkbox";
	    input.name=pregunta;
	    input.id=pregunta+i+nCheckbox;      
	    checkboxContainer.appendChild(input);
	    checkboxContainer.appendChild(label);
	    checkboxContainer.appendChild(document.createElement("br"));
 }  
 checkboxContainer.appendChild(document.createElement("br"));
 checkboxContainer.appendChild(document.createElement("br"));
}

function ponerDatosRadioHtml(opt, nRadio){

	var pregunta="nueve";
	if (nRadio==1){
		pregunta="diez";
	}

	var checkboxContainer=document.getElementsByTagName("fieldset")[nRadio+8];
 	for (i = 0; i < opt.length; i++) { 
	    var input = document.createElement("input");
	    var label = document.createElement("label");
	    label.innerHTML=opt[i];
	    label.setAttribute("for", pregunta+i+nRadio);
	    input.type="radio";
	    input.name=pregunta;
	    input.id=pregunta+i+nRadio;
	    input.value=i;    
	    checkboxContainer.appendChild(input);
	    checkboxContainer.appendChild(label);
	    checkboxContainer.appendChild(document.createElement("br"));
 }  
 checkboxContainer.appendChild(document.createElement("br"));
 checkboxContainer.appendChild(document.createElement("br"));
}
function inicializar(){
  // document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

function comprobar(){
   var f=formElement;
   var checked;
   var name;

	//Comprobar selects
	for(i=1;i<4;i++){
		if(f.elements[i+4].selectedIndex==0) {
			f.elements[i+4].focus();
			alert("Selecciona una opción");
			return false;
		}
	} 
	
	//Comprobar selects-multiple
	for(i=1;i<4;i++){
		if(f.elements[i+8].selectedIndex==-1) {
			f.elements[i+8].focus();
			alert("Selecciona almenos una opción");
			return false;
		}
	} 
	
	//Comprobar checkbox
	for(i=0; i< 2; i++){
		checked=false;
		
		name=f.siete;
		if (i==1){
			name=f.ocho;
		}
		
		for (var j = 0; j < name.length; j++) {  //"name" es el nombre asignado a todos los checkbox
			if (name[j].checked) checked=true;
		}	
		
		if(!checked){
			name[0].focus();
			alert("Selecciona almenos una opción");
			return false;
		}
	}
	
	
	//Comprobar radios
	for(i=0;i<2;i++){
		name=f.nueve;
        if (i==1){
            name=f.diez;
        }
        if (name.value=="") {
            name[0].focus();
            alert("Seleciona una opción");
            return false;
        }   
    }
	
	return true;	//Todas las preguntas contestadas
}

function corregirText(){

	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){
		
		if(respuestas[numeroQuestion][0]==document.getElementsByTagName("input")[numeroQuestion].value){
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Correcta +1 punto");
			nota+=1;
		}else{
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Incorrecta");
		}
	}
}

function corregirSelect(){

	for(numeroQuestion=2; numeroQuestion<4; numeroQuestion++){
		
		if(respuestas[numeroQuestion][0]==document.getElementsByTagName("select")[numeroQuestion-2].value){
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Correcta +1 punto");
			nota+=1;
		}else{
			nota-=1.0/document.getElementsByTagName("select")[0].options.length;
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Incorrecta -" + (1.0/document.getElementsByTagName("select")[0].options.length).toFixed(2) +" puntos");
			
		}
	}
}

function corregirMultiple(){
	for(numeroQuestion=4;numeroQuestion<6;numeroQuestion++){
        
        var sel = document.getElementsByTagName("select")[numeroQuestion-2];
        var esCorrecta=[];
        // var incorrecto=false;

        for(i=1; i<(sel.length); i++){		// recorr per tantes opcions que hi ha, saltant la primera que es la defecte
            
            var opt=sel.options[i];			// obte la opció i

            if(opt.selected){				//si la opció i està selecionada
            	esCorrecta[i]=false;
            	for(j=0; j<nRespuestas[numeroQuestion]; j++){
            			//guardamos si es correcta o no
            		if(i-1==respuestas[numeroQuestion][j]) esCorrecta[i]=true;
            	}
            	//poner nota por correcta o no
            	if(esCorrecta[i]){
            		nota +=1.0/nRespuestas[numeroQuestion];    
                    darExplicacion("Respuesta " + (numeroQuestion+1) + ": Opción: " + i + " Correcta +" + (1.0/nRespuestas[numeroQuestion]).toFixed(2) + " puntos");
                }else{
                	nota -=1.0/nRespuestas[numeroQuestion];  
                	darExplicacion("Respuesta " + (numeroQuestion+1) + ": Opción: " + i + " Incorrecta -" + (1.0/nRespuestas[numeroQuestion]).toFixed(2) + " puntos");
                 
                   // incorrecto=true;
                }
            }           
        }
        //corregir si falta alguna correcta por contestar
        //if(incorrecto&&)
	}
}

function corregirCheckbox(){
	var checkbox;
	for(numeroQuestion=6;numeroQuestion<8;numeroQuestion++){
		var esCorrecta=[];

		if(numeroQuestion==6){
			checkbox=document.getElementsByName("siete");
		}else{
			checkbox=document.getElementsByName("ocho");
		}

		for(i=0; i<(checkbox.length); i++){	
			
			if(checkbox[i].checked){

				esCorrecta[i]=false;
				for (j = 0; j<nRespuestas[numeroQuestion]; j++) {
					if(i==respuestas[numeroQuestion][j]) esCorrecta[i]=true;
				}

				if(esCorrecta[i]){
	            	nota +=1.0/nRespuestas[numeroQuestion];    
	                darExplicacion("Respuesta " + (numeroQuestion+1) + ": Opción: " + (i+1) + " Correcta +" + (1.0/nRespuestas[numeroQuestion]).toFixed(2) + " puntos");    
	            }else{
	                nota -=1.0/nRespuestas[numeroQuestion];   
	                darExplicacion("Respuesta " + (numeroQuestion+1) + ": Opción: " + (i+1) + " Incorrecta -" + (1.0/nRespuestas[numeroQuestion]).toFixed(2) + " puntos");
                    // incorrecto=true;
	            }
			}
		}
	}
}

function corregirRadio(){
	var f=formElement;
	var radio;
	for (numeroQuestion=8; numeroQuestion<10; numeroQuestion++) {
		if(numeroQuestion==8){
			radio=f.nueve;
		}else{
			radio=f.diez;
		}
		if(radio.value==respuestas[numeroQuestion][0]){
			nota+=1.0;
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Correcta +1 punto");
		}else{
			nota-=1.0/radio.length;
			darExplicacion("Respuesta " + (numeroQuestion+1) + ": Incorrecta -" + (1.0/radio.length).toFixed(2) +" puntos");
		}
	}
}

function presentarNota(){
	var p = document.createElement("h3");
	if(nota<0) nota=0;
    var node = document.createTextNode("Tu nota es: " + nota.toFixed(2));
    p.appendChild(node);
    document.getElementById("nota").appendChild(p);
    document.getElementById("resultado").style.display="block";
}

function darExplicacion(e) {
    var p = document.createElement("h4");
    var node = document.createTextNode(" - " + e);
    p.appendChild(node);
    document.getElementById("resultado").appendChild(p);
}
