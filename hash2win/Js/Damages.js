/*Fichier contenant les objDamage de tous les persos*/
/* objDamage = {
  Damage = 0;
  Pietinement = 0;
  Fire: [-5 ; +10],
  Ice: [-5 ; +10],
  Elect : [-5 ; +10],
  Earth : [-5 ; +10],
  Wind :[-5 ; +10]

};*/

var objDamageClicker ={  Damage : 0, Pietinement : 0,
  Fire: 0, Ice: 0, Elect : 0, Earth : 0, Wind :0,
  DPS : 0
};

var objDamageMashgicien ={  Damage : 0, Pietinement : 0,
  Fire: 0, Ice: 0, Elect : 0, Earth : 0, Wind :0,
  DPS: 0
};


//Gestion des dmgsec
setInterval(function(){

  MashDPS = objDamageMashgicien.DPS;
  objDamageMashgicien.DPS = 0;
  ClickDPS = objDamageClicker.DPS;
  objDamageClicker.DPS=0;

},1000);
