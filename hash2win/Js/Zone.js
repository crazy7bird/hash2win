var cpt_gestion_zone =0;
const min_gestion_zone = 10;

var ZoneIs =LISTE_ZONE_PROB[0]; //Permet de transmètre la map en cours à Monster.js


function change_zone_rand()
{
	ZoneIs = LISTE_ZONE_PROB[Math.floor((Math.random() * LISTE_ZONE_PROB.length))];
	var url = 'url(img/zones/'+ ZoneIs.name+'.gif)';
	document.getElementById('divmonster').style.backgroundImage = url;

}
function gestion_zone()
{
	cpt_gestion_zone = cpt_gestion_zone +1;
	if( cpt_gestion_zone > (Math.floor(Math.random() * 10)+min_gestion_zone))
	{
		change_zone_rand();
		cpt_gestion_zone = 0;
	}
}
