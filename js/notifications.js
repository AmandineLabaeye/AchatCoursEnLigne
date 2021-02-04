// Fonction de notif, tous se créer ici
function Notif(msg, duree, px) {
    var notif = document.createElement("div");
    notif.setAttribute("style", "position:absolute;top:" + px + "%;left:80%;border:1px solid rgba(0,0,0,0.25);padding:1% 5% 1% 5%;box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);margin-right:1%;margin-top:1%");
    notif.innerHTML = msg;
    setTimeout(function() {
        notif.parentNode.removeChild(notif);
    }, duree);
    document.body.appendChild(notif);
}