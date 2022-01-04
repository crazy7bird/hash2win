var tcoins = 0;
var coins = 0;

/*-----------Skills--Variables------------------------------------------------*/
/*--------Gerrier -- Cliker-----------*/
var Skill_player_Att ={lvl:1  ,Max_lvl:0,
                      price:10 , price_coeff: 1.1,
                      html_lvl:"lvl_player",html_price:"price_lvl_player", html_btn:"btn_lvl_player"};

var Skill_player_velocity ={lvl:0  ,Max_lvl:0,
                      price:10 , price_coeff: 5,
                      html_lvl:"lvl_player_velocity",html_price:"price_lvl_player_velocity", html_btn:"btn_lvl_player_velocity"};

var Skill_player_hold ={lvl:0  ,Max_lvl:0,
                      price:10 , price_coeff: 5,
                      html_lvl:"lvl_player_hold",html_price:"price_lvl_player_hold", html_btn:"btn_lvl_player_hold"};

var Skill_player_crit_cha ={lvl:0  ,Max_lvl:50,
                      price:10 , price_coeff: 1.5,
                      html_lvl:"lvl_player_crit_cha",html_price:"price_lvl_player_crit_cha", html_btn:"btn_lvl_player_crit_cha"};

var Skill_player_crit_dmg ={lvl:0  ,Max_lvl:0,
                      price:10 , price_coeff: 1.5,
                      html_lvl:"lvl_player_crit_dmg",html_price:"price_lvl_player_crit_dmg", html_btn:"btn_lvl_player_crit_dmg"};

var Skill_player_pietinement ={lvl:0  ,Max_lvl:0,
                      price:100 , price_coeff: 10,
                      html_lvl:"lvl_player_pietinement",html_price:"price_lvl_player_pietinement", html_btn:"btn_lvl_player_pietinement"};

/*------- Mhashgicien -- AutoBot---------*/
var Skill_mash_Att ={lvl:1  ,Max_lvl:0,
                      price:10 , price_coeff: 1.3,
                      html_lvl:"lvl_autobot",html_price:"price_lvl_autobot", html_btn:"btn_lvl_autobot"};

var Skill_mash_sagesse ={lvl:0  ,Max_lvl:0,
                      price:10 , price_coeff: 1.5,
                      html_lvl:"lvl_autobot_sagesse",html_price:"price_lvl_autobot_sagesse", html_btn:"btn_lvl_autobot_sagesse"};

var Skill_mash_coin ={lvl:0  ,Max_lvl:0,
                      price:10 , price_coeff: 1.5,
                      html_lvl:"lvl_autobot_coin",html_price:"price_lvl_autobot_coin", html_btn:"btn_lvl_autobot_coin"};

var Skill_mash_furie ={lvl:0  ,Max_lvl:9,
                      price:100 , price_coeff: 10,
                      html_lvl:"lvl_autobot_speed",html_price:"price_lvl_autobot_speed", html_btn:"btn_lvl_autobot_speed"};
/*-----------------------------------*/

var IsMobile = 0;

var HashRate = 0;
var TotalHash = 0;
var ResetTotalHash = 0;
var AcceptedHashes = 0;
var MashDPS = 0;

var TotalClick = 0;
var ClickSec = 0;
var ClickSecInter = 0;
var ClickDPS = 0;

/* Functions Start */


/*******************/

function number_format (n) {
    var prefix = ["", " k", " M", " G", " T", " P", " E", " Z", " Y"]; // Fin des prefix du système métrique
    var i = 0;
    while ((n = n/1000) >= 1) { i++; }

    if(!(i<prefix.length))
     {
       return (n * 1000).toFixed(3) + " x10^" + i*3;
     }
     else
     {
       if(i === 0)
       {
         return ((n * 1000).toFixed(0) + "");
       }
       else
       {
        return (n * 1000).toFixed(3) + prefix[i];
       }
     }
};

function earn_coin(amount) {
  coins = coins + amount;
  tcoins = tcoins + amount;
}
setInterval(function() {

  document.getElementById("tcoins").innerHTML = number_format(tcoins);
  document.getElementById("coins").innerHTML = number_format(coins);

  document.getElementById("hashrate").innerHTML = number_format(HashRate);
  document.getElementById("totalhash").innerHTML = number_format(TotalHash);
  document.getElementById("totalclick").innerHTML = number_format(TotalClick);
  document.getElementById("clicksec").innerHTML = number_format(ClickSec);

  document.getElementById("DPS_clicker").innerHTML = number_format(ClickDPS);
  document.getElementById("DPS_mash").innerHTML = number_format(MashDPS);


//Mise a jours des boutons :
/*Boutons du player*/
  gestion_buttun(Skill_player_Att);
  gestion_buttun(Skill_player_velocity);
  gestion_buttun(Skill_player_hold);
  gestion_buttun(Skill_player_crit_cha);
  gestion_buttun(Skill_player_crit_dmg);
  gestion_buttun(Skill_player_pietinement);

/*Boutons de l'autobot*/
  gestion_buttun(Skill_mash_Att);
  gestion_buttun(Skill_mash_sagesse);
  gestion_buttun(Skill_mash_coin);
  gestion_buttun(Skill_mash_furie);

 /*********************/
}, 150);


//Action boutons player
document.getElementById(Skill_player_Att.html_btn).onclick = function(){
  Skill_clicked(Skill_player_Att);
};
document.getElementById(Skill_player_velocity.html_btn).onclick = function(){
  Skill_clicked(Skill_player_velocity);
};
document.getElementById(Skill_player_hold.html_btn).onclick = function(){
  Skill_clicked(Skill_player_hold);
};
document.getElementById(Skill_player_crit_cha.html_btn).onclick = function(){
  Skill_clicked(Skill_player_crit_cha);
};
document.getElementById(Skill_player_crit_dmg.html_btn).onclick = function(){
  Skill_clicked(Skill_player_crit_dmg);
};
document.getElementById(Skill_player_pietinement.html_btn).onclick = function(){
  Skill_clicked(Skill_player_pietinement);
};

//Actions boutons autobot :
document.getElementById(Skill_mash_Att.html_btn).onclick = function(){
  Skill_clicked(Skill_mash_Att);
};
document.getElementById(Skill_mash_sagesse.html_btn).onclick = function(){
  Skill_clicked(Skill_mash_sagesse);
};
document.getElementById(Skill_mash_coin.html_btn).onclick = function(){
  Skill_clicked(Skill_mash_coin);
};
document.getElementById(Skill_mash_furie.html_btn).onclick = function(){
  Skill_clicked(Skill_mash_furie);
  mhashgicien_interval(); //refresh si l'interval a changé
};


function Skill_clicked(objSkill){
  var IsNotMax = objSkill.lvl < ((objSkill.Max_lvl != 0) ? objSkill.Max_lvl : objSkill.lvl +1 );
  if((coins >= objSkill.price) &&  IsNotMax){
    coins = coins - objSkill.price;
    objSkill.price = objSkill.price * objSkill.price_coeff;
    objSkill.lvl += 1;
  }
  if((objSkill.Max_lvl == 0) || objSkill.Max_lvl != objSkill.lvl){
    document.getElementById(objSkill.html_price).innerHTML = number_format(objSkill.price);
  }
  else{
    document.getElementById(objSkill.html_price).innerHTML = "Max";
  }
  document.getElementById(objSkill.html_lvl).innerHTML = number_format(objSkill.lvl);
};

function gestion_buttun(objSkill){
  var IsNotMax = objSkill.lvl < ((objSkill.Max_lvl != 0) ? objSkill.Max_lvl : objSkill.lvl +1 );
  if (coins >= objSkill.price && IsNotMax) {
    document.getElementById(objSkill.html_btn).classList.remove("disabled");
  } else {
    document.getElementById(objSkill.html_btn).classList.add("disabled");
  }
};
