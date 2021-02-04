const COURS = [
    { id: 1, img: 'ux_ui.jpg', titre: 'UX/UI', prix_initial: 200, prix: 9.99, note: 4, stock: 10 },
    { id: 2, img: 'php_8.png', titre: 'PHP 8', prix_initial: 200, prix: 9.99, note: 3, stock: 10 },
    { id: 3, img: 'react_js.png', titre: 'React JS', prix_initial: 200, prix: 9.99, note: 2, stock: 5 },
    { id: 4, img: 'node_js.jpg', titre: 'Node JS', prix_initial: 200, prix: 9.99, note: 5, stock: 3 },
    { id: 5, img: 'my_sql.png', titre: 'MySQL', prix_initial: 200, prix: 9.99, note: 4, stock: 2 }
]

// Vérifie si les localstorage sont vide si oui on initialise les cours
if (localStorage.getItem("cours") == null || localStorage.getItem("panier") == null) {
    localStorage.setItem("cours", JSON.stringify(COURS));
}

let Cours = recupererLeStorageCours();

function affichage(Cours) {
    // Fonction qui parcours tout le tableau
    Cours.forEach(function(cours) {

        // Fonction qui affiche les articles complétement en JS
        creationCarteCours(cours.img, cours.titre, cours.note, cours.prix_initial, cours.prix, cours.stock, cours.id);

    });
}

affichage(Cours);

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

    ajouter_au_panierA.classList.add("a");

    info__article.appendChild(ajouter_au_panierA);

    let ajouter_au_panierI = document.createElement("i");

    ajouter_au_panierI.classList.add("fa");

    ajouter_au_panierI.classList.add("fa-cart-plus");

    ajouter_au_panierA.appendChild(ajouter_au_panierI);

    let spanAjouter_au_panier = document.createElement("span");

    spanAjouter_au_panier.innerText = "Ajouter au panier";

    spanAjouter_au_panier.classList.add("a");

    ajouter_au_panierA.appendChild(spanAjouter_au_panier);

}

// Récupére le local storage
function recupererLeStorageCours() {

    // Stock les données récupérer du local storage panier
    let recupCours = localStorage.getItem("cours");

    // Il vérifie si le local storage est nul alors on retourne un tableau vide pour pouvoir push quand même
    if (recupCours == null) {
        return [];
    }

    // Sinon on parse la chaîne de caractère en JSON pour pouvoir le parcourir et on le retourne
    let Json = JSON.parse(recupCours);

    return Json;

}