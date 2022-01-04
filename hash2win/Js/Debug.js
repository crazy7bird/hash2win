/*
* Fichier contenant les outils de debug et d'essai
*/

/*Ajout d'un mode debug*/
if(window.location.href.indexOf("debug") != -1)
{
  document.getElementById("debug_nextmonster").classList.remove("debug");
  document.getElementById("debug_10coins").classList.remove("debug");
  document.getElementById("debug_nextzone").classList.remove("debug");
	document.getElementById("debug_nextzone").classList.remove("debug");
  document.getElementById('db_Fire_p').classList.remove("debug");
  document.getElementById('db_Fire_m').classList.remove("debug");
  document.getElementById('db_Ice_p').classList.remove("debug");
  document.getElementById('db_Ice_m').classList.remove("debug");
}


/*Boutons de debug*/

/*Ajoute des coins*/
document.getElementById('debug_10coins').onclick = function() {
		earn_coin(coins*10);
};

/*Monstre suivant*/
document.getElementById('debug_nextmonster').onclick = function() {
		new_monster();
};

/*Zone suivante*/
document.getElementById('debug_nextzone').onclick = function() {
		change_zone_rand();
};

/*Elements*/
document.getElementById('db_Fire_p').onclick = function() {
		objDamageClicker.Fire += 1;
    log_e_player();
};

document.getElementById('db_Fire_m').onclick = function() {
		objDamageClicker.Fire -= 1;
    log_e_player();
};

document.getElementById('db_Ice_p').onclick = function() {
		objDamageClicker.Ice += 1;
    log_e_player();
};

document.getElementById('db_Ice_m').onclick = function() {
		objDamageClicker.Ice -= 1;
    log_e_player();
};

function log_e_player()
{
  console.log(JSON.stringify(objDamageClicker));
}
