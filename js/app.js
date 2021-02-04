// Fonction qui parcours tout le tableau
COURS.forEach(function(cours) {

    // Fonction qui affiche les articles complétement en JS
    creationCarteCours(cours.img, cours.titre, cours.note, cours.prix_initial, cours.prix, cours.stock, cours.id);

});

// Fonction qui crée toutes les cartes des cours disponible en JS grâce au tableau JSON cours
function creationCarteCours(img, titre, note, prix_initial, prix, stock, id) {

    // J'ai récréer tout l'ancien html avec les mêmes classes identiques
    let parent = document.querySelector("body .container__cours");

    let cours__article = document.createElement("div");

    cours__article.classList.add("cours__article");

    parent.appendChild(cours__article);

    let cours_img = document.createElement("figure");

    cours_img.classList.add("cours_img");

    cours__article.appendChild(cours_img);

    let cours_img_img = document.createElement("img");

    cours_img_img.src = "img/cours/" + img;

    cours_img.appendChild(cours_img_img);

    let info__article = document.createElement("div");

    info__article.classList.add("info__article");

    cours__article.appendChild(info__article);

    let h4 = document.createElement("h4");

    h4.innerText = titre;

    info__article.appendChild(h4);

    let note_figure = document.createElement("figure");

    note_figure.classList.add("note");

    note_figure.classList.add("m_" + note);

    info__article.appendChild(note_figure);

    let note_img = document.createElement("img");

    note_img.src = "img/rates.png";

    note_figure.appendChild(note_img);

    let paragrapheUn = document.createElement("p");

    info__article.appendChild(paragrapheUn);

    let spanParagrapheUn = document.createElement("span");

    spanParagrapheUn.classList.add("prix");

    spanParagrapheUn.innerText = prix_initial + " €";

    paragrapheUn.appendChild(spanParagrapheUn);

    let spanParagrapheUnDeux = document.createElement("span");

    spanParagrapheUnDeux.classList.add("soldes");

    spanParagrapheUnDeux.innerText = prix + " €";

    paragrapheUn.appendChild(spanParagrapheUnDeux);

    let paragrapheDeux = document.createElement("p");

    paragrapheDeux.innerText = "Disponible: ";

    info__article.append(paragrapheDeux);

    let spanParagrapheDeux = document.createElement("span");

    spanParagrapheDeux.classList.add("stock");

    spanParagrapheDeux.innerText = stock;

    paragrapheDeux.appendChild(spanParagrapheDeux);

    let ajouter_au_panierA = document.createElement("a");

    ajouter_au_panierA.href = "#";

    ajouter_au_panierA.classList.add("ajouter-au-panier");

    ajouter_au_panierA.setAttribute("data-id", id);

    info__article.appendChild(ajouter_au_panierA);

    let ajouter_au_panierI = document.createElement("i");

    ajouter_au_panierI.classList.add("fa");

    ajouter_au_panierI.classList.add("fa-cart-plus");

    ajouter_au_panierA.appendChild(ajouter_au_panierI);

    let spanAjouter_au_panier = document.createElement("span");

    spanAjouter_au_panier.innerText = "Ajouter au panier";

    ajouter_au_panierA.classList.add("a");
    
    spanAjouter_au_panier.classList.add("a");

    ajouter_au_panierA.appendChild(spanAjouter_au_panier);

}

// On stock et on récupère le local storage
let Objet = getLocalStorage();

console.log(Objet)

// Si la taille du tableu est différent de null alors on boucle sur les article, et on les affiche
if (Objet.length != null) {
    Objet.forEach(function(article) {

        // Cela créer l'html dans le panier
        ajoutCoursPanier(article.nom, article.prix, article.quantite, article.id);

    });
}

// récupère tout les class des boutons ajouter au panier
let panier = document.querySelectorAll(".ajouter-au-panier");

// On boucle pour parcourir tous les boutons
panier.forEach(function(cours) {

    // Lors du clic sur le bouton, tous ce code s'execute
    cours.addEventListener("click", function(event) {

        // On récupère l'id grâce à l'attribut data-id
        let idCours = cours.getAttribute("data-id");

        // On remonte à l'élément parent du bouton en question
        let parentPanier = event.target;

        // Vu que l'on a rajouter un span dans le a on est obligé rechercher le parent du parent
        let parentPanierElement = parentPanier.parentElement.parentElement;

        // On récupére le nom du cours
        let contenuPanier = parentPanierElement.querySelector("h4");

        // On récupére le prix en solde
        let prixCours = parentPanierElement.querySelector(".soldes");

        // On récupérer le solde
        let stockCours = parentPanierElement.querySelector(".stock")

        // Je défini le tableau grâce à la fonction qui récupère le local storage
        let Objet = getLocalStorage();

        // On push à chaque clique dans le local storage
        Objet.push({
            id: idCours,
            nom: contenuPanier.textContent,
            prix: prixCours.textContent,
            quantite: 1
        })

        ajoutCoursPanier(Objet[Objet.length - 1].nom, Objet[Objet.length - 1].prix, Objet[Objet.length - 1].quantite, Objet[Objet.length - 1].id);

        // Ca ajoute le tableau objet au local storage
        localStorage.setItem("panier", JSON.stringify(Objet));

        //stockCours.innerText = stockCours.value - 1;

    })

});

// Récupére le local storage
function getLocalStorage() {

    // Stock les données récupérer du local storage panier
    let recupCoursPanier = localStorage.getItem("panier");

    // Il vérifie si le local storage est nul alors on retourne un tableau vide pour pouvoir push quand même
    if (recupCoursPanier == null) {
        return [];
    }

    // Sinon on parse la chaîne de caractère en JSON pour pouvoir le parcourir et on le retourne
    let Json = JSON.parse(recupCoursPanier);

    return Json;

}

// Ajout et crée du tableau dans le panier pour chaque article
function ajoutCoursPanier(nom, prix, quantite, idCours) {

    // On récupère la div du panier
    let panierTable = document.querySelector("#table-panier tbody");

    // On crée l'élément TR 
    let panierColonne = document.createElement("tr");

    // On défini son parent
    panierTable.appendChild(panierColonne);

    // On crée l'élément td qui sera vide
    let panierColDeb = document.createElement("td");

    // On défini son parent
    panierColonne.appendChild(panierColDeb);

    let panierColUne = document.createElement("td");

    panierColonne.appendChild(panierColUne);

    // On défini son contenu soit le paramètre nom
    panierColUne.innerText = nom;

    let panierColDeux = document.createElement("td");

    panierColonne.appendChild(panierColDeux);

    // On défini son contenu soit le prix
    panierColDeux.innerText = prix;

    let panierColTrois = document.createElement("td");

    panierColonne.appendChild(panierColTrois);

    // On défini son contenu soit quantite
    panierColTrois.innerText = quantite;

    let panierColQuatre = document.createElement("td");

    panierColonne.appendChild(panierColQuatre);

    // On crée le bouton supprimer
    let boutonColQuatre = document.createElement("button");

    panierColQuatre.appendChild(boutonColQuatre);

    // On lui ajoute une class
    boutonColQuatre.classList.add("supprimer-du-panier");

    // On lui ajout un data-id avec le paramètre idCours
    boutonColQuatre.setAttribute("data-id", idCours);

    // On lui défini son texte
    boutonColQuatre.innerText = "Supprimer";

}

// récupère le divParent dans lequel se trouve le bouton
let panierContainer = document.getElementById("panier");

// On fait un évenemnt de click dessus,
panierContainer.addEventListener("click", function(event) {

    // On vérifie que l'élement selectionné dans cette div comporte bien la class "supprimer-du-panier",
    if (event.target.className == "supprimer-du-panier") {

        // On récup le local storage dans le tableau
        let Objet = getLocalStorage();

        // On remonte au parent parent de l'élément
        let panierTable = event.target.parentElement.parentElement;

        // On le supprimer grâce à l'id en cours
        Objet.splice(Objet.id, 1);

        // On vide l'html du panier
        panierTable.innerHTML = "";

        // On actualise le local storage
        localStorage.setItem("panier", JSON.stringify(Objet));

    }

})

// Lors du clic sur le bouton vider le panier
document.getElementById("vider-panier").addEventListener("click", function() {

    // On selectionne le tbody du panier
    let panierTable = document.querySelector("#table-panier tbody");

    // Vide le html
    panierTable.innerHTML = "";

    // Le local storage est clear
    localStorage.removeItem("panier");

});