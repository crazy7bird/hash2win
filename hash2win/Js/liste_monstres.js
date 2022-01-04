/*
Ce fichier liste les monstre du jeux.
On empacte le tout dans un grand objet js
*/

/* structure zone
  var nom =
  {
    name:"nom", // Sert de path pour les img.
    health: [0.5;1.5], //monster_vie * health.
    coins:  [0.5;1.5], // monster_coin * coins.
    Fire: [-5 ; +10], // 0 dégats normaux, -5 dégats x5, 1 Dégatsx0, 10 degatsx(-9). //-5 => -6
    Ice: [-5 ; +10], // dégat_élémental = dégat_élémental* (1 - monstre.element).
    Elect : [-5 ; +10],
    Earth : [-5 ; +10],
    Wind :[-5 ; +10],
    isInvok, //propriété pour dire qun monstre est une Invok, des que le mostre est battu il rejoint les rangs
  }

  var MONSTRE =[nom1,nom2, ...];


var MonstreDemo = {   name:"MonstreDemo",
                      health: 1, coins: 1,
                      Fire:0, Ice:0, Elect : 0, Earth :0, wind :0
                    };
*/

const spiderman = {   name:"spiderman", prob:5,
                      health: 1, coins: 1,
                      Fire:0, Ice:0, Elect :0, Earth :0, Wind :0
                    };

const venom = {   name:"venom", prob:4,
                      health: 1, coins: 2,
                      Fire:0, Ice:0, Elect : 0, Earth:0, Wind :0
                    };

const carnage = {   name:"carnage", prob:3,
                      health: 2, coins: 1,
                      Fire:0, Ice:0, Elect : 0, Earth:0, Wind :0
                    };
const fire_ant = {   name:"fire-ant", prob:3,
                      health: 2, coins: 2,
                      Fire:5, Ice:-5, Elect : 1, Earth :0, Wind :0,
                    };


var LISTE_MONSTRE_PROB = []; //Liste a fournire

function init_liste_monstre_prob() //Créer une liste des monstres, avec probabilité, plus qua piocher aléatoirement dedans.
{
  //Liste des monstres.
  var MONSTRE = [spiderman,venom,carnage,fire_ant];
  var i;
  var y;
  for (i = 0; i < MONSTRE.length; i++) {
  	for(y=0; y<MONSTRE[i].prob;y++)
    {
    	LISTE_MONSTRE_PROB.push(MONSTRE[i]);
    }
  }
}
init_liste_monstre_prob(); // Le lance 1 fois.
