/*Monster ----------*/
/*Générateur de monstre alléatoire suivant une courbe de progression*/

var num_monster = 0;	//Variable statique, elle s'incrémente pour déterminer le progression.
// const progression_hp = 0.01;
// const progression_coin = 1;
const progression_hp = 3;
const progression_coin = 2;
var MonsterIs; // Pour propager les stats du monstre
var monster_hp = 0;	//stats du monstre en cours
var monster_coins = 0;



function new_monster()
{
	gestion_zone();
	num_monster = num_monster +1;

//chose monster
	MonsterIs = LISTE_MONSTRE_PROB[Math.floor((Math.random() * LISTE_MONSTRE_PROB.length))];
	var url = 'url(img/monstres/'+ MonsterIs.name +'.gif)';
	document.getElementById('Attaquer').style.backgroundImage = url;

	monster_hp = 	Math.round(
							num_monster * progression_hp
						+ (Math.random()*num_monster)
						);
	monster_coins = Math.round(
						num_monster * progression_coin
						+ (Math.random()*num_monster)
						);


//Application des stats Zone et monstre
	monster_hp = monster_hp * MonsterIs.health * ZoneIs.health;
	monster_coins = monster_coins * MonsterIs.coins * ZoneIs.coins;

	//Génération de Boss
	var Boss = 10;
	while(num_monster % Boss == 0)
	{
		monster_hp = monster_hp *10;
		monster_coins = monster_coins *12;
		Boss = Boss * 10;
	}

	document.getElementById('monsterlife').innerHTML = number_format (monster_hp);
	document.getElementById('monstertotallife').innerHTML = number_format (monster_hp);
	document.getElementById('monstercoins').innerHTML = number_format (monster_coins);
	document.getElementById('nummonster').innerHTML = number_format (num_monster);
	document.getElementById('namemonster').innerHTML = MonsterIs.name;
}

//Reset monster LVLs.
function reset_monstre()
{
		//TODO - Change for a more fair formula !
		earn_coin(Math.log(TotalHash + 1));
		ResetTotalHash = ResetTotalHash + TotalHash;

	num_monster = 0;
	new_monster();
}

//Boutons lié aux monstres

//Bouton reset
document.getElementById('resetmonster').onclick = function() {
		reset_monstre();
};


function Att_monster(objDamage)
{
	var boucle=0;
	while(boucle <= (objDamage.Pietinement))
	{
		//Envoi les dommages au monstre
		Damage_monster(objDamage);
		if( monster_hp <= 0)
		{
			Damage = Math.abs(monster_hp);
			//Compétence morecoin du mhashgicien
			var drop_coin = monster_coins * (1 + (0.1 * Skill_mash_coin.lvl));
			earn_coin(drop_coin);
			new_monster();
			boucle = boucle +1;
		}
		else
		{
			boucle = objDamage.Pietinement+1;
		}
	}
	document.getElementById('monsterlife').innerHTML = number_format (monster_hp); //Essais : Actualisation hp monstre en dernier
}


//Dégat élémentaux
function Damage_monster(objDamage)
{

	//Dommages normaux = Dommages -%F -%G -%El -%Ea -%W
	//Dommages normaux tjrs >=0
	// Dommages = Dommages (1-F-G-El-Ea-W);
	//DommagesElem = Domages * (1-M.Elem) * Elem
	var Dmg_norm = objDamage.Damage * (1 - objDamage.Fire - objDamage.Ice - objDamage.Elect - objDamage.Earth - objDamage.Wind );
	if (Dmg_norm > 0){
		monster_hp -= Dmg_norm;
		objDamage.DPS +=Dmg_norm;
	}

	var Elements = 0;
			Elements += 	(1 - MonsterIs.Fire ) * objDamage.Fire;
			Elements += (1 - MonsterIs.Ice ) * objDamage.Ice;
			Elements +=	(1 - MonsterIs.Elect ) * objDamage.Elect;
			Elements +=	(1 - MonsterIs.Earth ) * objDamage.Earth ;
			Elements +=	(1 - MonsterIs.Wind ) * objDamage.Wind ;
			monster_hp = monster_hp - (objDamage.Damage * Elements);
			objDamage.DPS +=(objDamage.Damage * Elements);

}


//Start
new_monster();
