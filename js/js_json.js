var url="https://rawgit.com/Marcroman181/XMLprova/master/preguntes.json";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  // función personalizada que gestiona la respuesta a la petición de fichero
  gestionarJson(this.responseText); 
 }
};
xhttp.open("GET", url, true); //url del fichero
xhttp.send();

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarJson(dadesJson){

	var questions = JSON.parse(dadesJson);
	var titulos;
	var opciones=[];
	var numeroQuestion;

	//Titles
	for(numeroQuestion=0; numeroQuestion<10;numeroQuestion++){
		titulos=questions[numeroQuestion].title;
		document.getElementsByTagName("h3")[numeroQuestion].innerHTML=titulos;
	}
	
	//Selects y SelectMultiple
	for(numeroQuestion=0; numeroQuestion<4;numeroQuestion++){
	  
	  	opciones=[];
		var nopt = questions[numeroQuestion+2].option.length;
		for (j = 0; j < nopt; j++) { 
	  		opciones[j] = questions[numeroQuestion+2].option[j];
	  	}
		 ponerDatosSelectHtml(opciones,numeroQuestion);
	}

	//Checkbox
	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){

		opciones=[];
 		var nopt = questions[numeroQuestion+6].option.length;
 		for (j = 0; j < nopt; j++) { 
    		opciones[j] = questions[numeroQuestion+6].option[j];
  		}
 		ponerDatosCheckboxHtml(opciones,numeroQuestion);
 	}

 	//Radio
	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){

		opciones=[];
 		var nopt = questions[numeroQuestion+8].option.length;
 		for (j = 0; j < nopt; j++) { 
    		opciones[j] = questions[numeroQuestion+8].option[j];
 		}
 		ponerDatosRadioHtml(opciones,numeroQuestion);
 	}
}


function ponerDatosSelectHtml(opt,nSelect){

  var select = document.getElementsByTagName("select")[nSelect];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 } 
}

function ponerDatosCheckboxHtml(opt, nCheckbox){

	var checkboxContainer=document.getElementsByTagName("fieldset")[nCheckbox+6];
 	for (i = 0; i < opt.length; i++) { 
	    var input = document.createElement("input");
	    var label = document.createElement("label");
	    label.innerHTML=opt[i];
	    label.setAttribute("for", "color_"+i+nCheckbox);
	    input.type="checkbox";
	    input.name="color";
	    input.id="color_"+i+nCheckbox;    
	    checkboxContainer.appendChild(input);
	    checkboxContainer.appendChild(label);
	    checkboxContainer.appendChild(document.createElement("br"));
 }  
 checkboxContainer.appendChild(document.createElement("br"));
 checkboxContainer.appendChild(document.createElement("br"));
}

function ponerDatosRadioHtml(opt, nRadio){

	var checkboxContainer=document.getElementsByTagName("fieldset")[nRadio+8];
 	for (i = 0; i < opt.length; i++) { 
	    var input = document.createElement("input");
	    var label = document.createElement("label");
	    label.innerHTML=opt[i];
	    label.setAttribute("for", "color_"+i+nRadio+2);
	    input.type="radio";
	    input.name="color";
	    input.id="color_"+i+nRadio+2;    
	    checkboxContainer.appendChild(input);
	    checkboxContainer.appendChild(label);
	    checkboxContainer.appendChild(document.createElement("br"));
 }  
 checkboxContainer.appendChild(document.createElement("br"));
 checkboxContainer.appendChild(document.createElement("br"));
}
