# Formulario
## Práctica html, css, javascript y xml de un formulario

**Autor: Marc Antoni Román Martínez**

[Link del rawgit de la portada del formulario](https://rawgit.com/Marcroman181/Formulari/master/portada.html)

[Link del rawgit del XML](https://rawgit.com/Marcroman181/Formulari/master/xml/questions.xml)

[Link del rawgit del XML validado con XSD](https://rawgit.com/Marcroman181/Formulari/master/xml/questionsXSD.xml)

[Link del rawgit del JSON](https://rawgit.com/Marcroman181/Formulari/master/json/preguntes.json)

**Este repositorio contiene una branch con todo el codigo minimificado**


### Documentación

**HTML:**

El HTML tiene la siguiente estructura:

La pantalla està compuesta por varios contenedores principales:
  
  -El contenedor de la cabecera (llamado "cabecera") que contiene el logo de la universidad y el titulo de la página.
  
  -Un contenedor llamado "menú" que contiene links para navegar por la web.
  
  -El formulario "myform" contiene varios divs clasificados en par o impar para decorar la web con diferentes colores. 
    
  -Un contenedor llamado "resultado" para poner ahí la nota final y las respuestas correctas e incorrectas una vez corregido.

**CSS:**

Siguiendo la estructura del html:


  -Contenedor "cabecera": Simplemente hemos establecido la amplitud del div para que ocupe toda la pantalla y hemos cambiado el color de los divs.
  
  -Contenedor "menu": Este contenedor esta colocado debajo de la cabecera, y esta colocado para que haya una barra horizontal que contenga los diferentes links.
  
   -El formulario "myform": Este contenedor simplemente contiene varios divs colocados, uno debajo del otro. Con sus márgenes, sus colores y sus preguntas con las letras responsive.
    
  -El contenedor "resultado": Este simplemente contiene los margenes, los colores y las letras responsive.


**XML:**
 
 Este formulario está hecho a partir de un XML donde se encuentran las preguntas y las respuestas que luego leeremos con javascript. Este XML simplemente contiene las siguientes etiquetas:
 
 -Questions: Contiene las diez preguntas de nuestro examen.
 
 -Question: Contiene cada una de las preguntas del examen. Las siguientes etiquetas se encuentran dentro de question.
 
 -Type: Contiene el tipo de pregunta
 -Title: Título de la pregunta.
 -Option: Contiene una opción de respuesta de la pregunta.
 -Answer: Contiene las respuestas de una pregunta.


**JavaScript:**
 
 Este javascript está compuesto principalmente por dos partes. Una parte que se encarga de gestionar el XML al cargar la página y otra parte que se encarga de reaccionar al pulsar el botón de submit:
 
 -Gestionar XML: Esta parte se encarga de cargar la web con toda la información que se encuentra en el xml. Para ello lo hacemos en partes separadas:
 
  **-Carga de los títulos y respuestas:** Aquí lo que haremos es recorrer una por una cada una de las preguntas del xml y presentar la información de los titulos y recoger el número de respuestas en otro array y las respuestas en un array bidimensional, donde indicaremos el número de la pregunta con la primera dimensión y el número de respuesta con la segunda dimensión.
   
  **-Presentar las opciones del tipo select y select múltiple:** Seguidamente, presentaremos las opciones de los selects. Para ello realizarmos un recorrido para cada pregunta tipo select para insertar tantas opciones como haya para cada pregunta. 
  
  **-Presentar las opciones del tipo checkbox y radio:** Es lo mismo pero con una diferencia. Ya que aquí deberemos insertar un input i label para cada opción, a las cuales le deberemos poner sus debidas propiedades.
 
 -Reacción al submit: Esta parte se encarga de corregir, preguntando antes si se desea corregir, el examen. Además, solo nos permitirá corregir el examen una vez. Para ello, hemos tenido que insertar las siguientes funcionalidades:
 
  **-Inicializar:** Pone la nota inicial a 0. 
  
  **-Comprobar:** Esta funcionalidad nos permite saber si el usuario ha contesado todas las preguntas antes de corregir el examen. Para ello, iremos comprobando las respuestas a las preguntas. Las preguntas tipo text basta con un required en el html, los selects y selects múltiples hay que comprobar que el indice seleccionado no sea el 0 o el -1 respectivamente, los tipo checkbox hay que recorrer cada una de las opciones y mirar si almenos una está checkeada, y por último, las tipo radio hay que mirer que el value sea distinto a nada. Una vez, hemos comprobado devolveremos un true y pasaremos a la corrección, en caso que no esté contestado devuelve un false y enfoca donde falte por contestar. 
  
  **-CorregirText:** Simplemente iremos recorriendo cada una de las preguntas y comparando la respuesta guardada en el array con la respuesta enviada por el usuario. Sumaremos 1 a la nota si es correcta. 
  
  **-CorregirSelect:** Parecida a la anterior, con la diferencia que miraremos el value, en lugar del contenido, para saber la respuesta seleccionada y restaremos 1/opciones a la nota si es incorrecta. 
  
  **-CorregirMultiple:** Esta es un poco más complicada, vamos a recorrer cada una de las preguntas y dentro de ellas vamos a recorrer cada una de las opciones y observar si está seleccionada. En caso de que esté seleccionada, comprobaremos si es correcta o no es correcta. En caso positivo sumará a la nota 1/respuestas, y en caso contrario, restará la misma cantidad.
  
  **-CorregirCheckbox:** Es exactamente el mismo funcionamiento que el anterior.

  **-CoregirRadio:** Este es igual que el select.
  
  **-PresentarNota:** Esta funcionalidad nos va a permitir insertar la nota final y realizar un focus a la nota.
  
  **-DarExplicación:** Este método es para simplificar el código, nos permite insertándole una variable por parámetro imprimir el contenido de esta variable debajo de la nota. Nos es útil para mostrar las respuestas correctas e incorrectas que ha contestado el usuario.
  
Por último, al intentar pulsar inicio en el menú para salir del examen, le pregunta al usuario si de verdad desea salir del examen.
