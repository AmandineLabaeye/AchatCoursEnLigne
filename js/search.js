let champ = document.querySelector(".search-content");
// Quand on appuie sur une touche dans le champ
champ.addEventListener("keyup", function(event) {
    event.preventDefault();
    // Création de la variable valeurChamp, on cherche dans le document l'ID "search-item", on cherche la class ".search-content", on récupère la valeur et on la met en majuscule
    let valeurChamp = document.getElementById("search-item").querySelector(".search-content").value.toUpperCase();
    //Création de la variable textElement, on cherche dans le document l'id "no_course"
    let textElement = document.getElementById("no_course");
    //On défini par défaut la valeur de trouve sur faux
    let trouve = false;
    // On enleve à l'élément la class hidden
    textElement.classList.remove("hidden");
    // On créé une variable qui séléctionne tous les h4 du document
    let h4 = document.querySelectorAll("h4");
    // On affiche tous les éléments qui ont comme tag "h4" ( ici nos titres)
    console.log(h4);

    h4.forEach(function(element) {
        // On récupérer le parent du parent de l'élément
        let divParent = element.parentElement.parentElement;
        console.log(valeurChamp);
        console.log(element.textContent);
        // On créé une condition dans laquelle on dit que si valeurChamp n'est pas égal à ce que l'utilisateur entre alors
        if (valeurChamp != element.textContent.toUpperCase()) {
            //On cache tous les éléments
            divParent.classList.add("hidden");
        } else {
            //Sinon on affiche 
            console.log("Il y a bien l'article " + valeurChamp);
            textElement.innerText = "Il y a bien l'article " + '"' + valeurChamp + '"';
            // Et on affiche les éléments
            divParent.classList.remove("hidden");
            // on défini trouve sur true, car on a trouvé un élément
            trouve = true;
        }
    });

    if (!trouve) {
        // Si rien est trouvé dans la saisie de l'utilisateur on affiche 
        console.log('"' + valeurChamp + '"' + " ne correspond à aucun article");
        textElement.innerText = " ";
        textElement.innerText = '"' + valeurChamp + '"' + " ne correspond à aucun article";
    }

});