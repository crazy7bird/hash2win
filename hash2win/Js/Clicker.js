/*Variables globales */

var hold_click_start = 0;
var hold_click_end = 0;
var hold_en =0;

//var timerID = 0

/*Click seconde*/
setInterval(function() {
        ClickSec = ClickSecInter;
        ClickSecInter = 0;
}, 1000);


/*Action lorsque le monstre est clické */
document.getElementById("Attaquer").onmousedown = function(){
	hold_click_start = new Date();
	hold_en = 1;
	//chrono();
	var damage = Math.round(Skill_player_Att.lvl + (Skill_player_velocity.lvl * ClickSec *ClickSec * 0.1));
	player_critique(damage);

  TotalClick = TotalClick +1;
  ClickSecInter = ClickSecInter+1;
};

//Fonction pour le hold_click_timer
function chrono(){
	hold_click_end = new Date();
	document.getElementById('holdclick').innerHTML = (hold_click_end - hold_click_start)/1000;
	timerID = setTimeout("chrono()", 1000); //Temps de rafraichissement du chrono.
}

setInterval(function() {
	hold_click_end = new Date();
	var diff = hold_en*((hold_click_end - hold_click_start)/1000);

	document.getElementById('holdclick').innerHTML = diff.toFixed(2);

}, 500);


/*Action lorsque le monstre est relaché */
document.getElementById("Attaquer").onmouseup = function(){
	//clearTimeout(timerID);
	hold_click_end = new Date();
	var diff = ((hold_click_end - hold_click_start)/1000);
	document.getElementById('holdclick').innerHTML= diff.toFixed(2);
	hold_en =0;
	//Dégats au monstre
	if(diff >= 1)
	{
		var damage = Math.round(diff*diff*Math.log(Skill_player_hold.lvl+1));
		player_critique(damage);
	}
};

//Gestion dégats critiques
function player_critique(Damage)
{
	//Traitement des Dommages
  if( Skill_player_crit_cha.lvl >= Math.floor((Math.random() * 100) + 1))
  {
    console.log("Criticallll");
    Damage = Damage * ( 1 + Skill_player_crit_dmg.lvl);
  }
  objDamageClicker.Damage = Damage;
  objDamageClicker.Pietinement = Skill_player_pietinement.lvl; // le déplacer dans les Lvl_Up
  Att_monster(objDamageClicker);
}
