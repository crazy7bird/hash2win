/*Gestion de l'auto-personnage le mhashgicien*/

/*Dmg/s*/
var mhash_interval;

function mhashgicien_interval()
{
  clearInterval(mhash_interval);
  mhash_interval = setInterval(function() {

      Dmg = Math.log(HashRate +1) *(Skill_mash_Att.lvl*Math.log((TotalHash*Skill_mash_sagesse.lvl +1 )+2.8)); //Degats standards
      //Add +1 to all log for never get -infinity !
      Dmg = Dmg *(10 - Skill_mash_furie.lvl) /10 ;                                    //Diminution des dégats en fonction du speed
      Dmg = Math.round(Dmg);
      objDamageMashgicien.Damage = Dmg;
      Att_monster(objDamageMashgicien);
  }, (1000 - (Skill_mash_furie.lvl * 100)));
}

//Exécution au démarrage
mhashgicien_interval();
