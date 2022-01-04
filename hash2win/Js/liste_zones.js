/*
Ce fichier liste les zones du jeux.
On empacte le tout dans un grand objet js
*/

/* structure zone
  var nom =
  {
    name:"nom", // Sert de path pour les img.
    prob: [1-10], //0 pour les zone cachées.

    health: [0.5;1.5], //monster_vie * health.
    coins:  [0.5;1.5], // monster_coin * coins.
    Fire: [-5 ; +10], // 0 dégats normaux, -5 dégats x5, 1 Dégatsx0, 10 degatsx(-9).
    Ice: [-5 ; +10], // dégat_élémental = dégat_élémental* (1 - monstre.element).
    Elect : [-5 ; +10],
    Earth : [-5 ; +10],
    wind :[-5 ; +10]
  }

  var ZONE =[nom1,nom2, ...];

  pour générer un monstre :
  ex capacité Fire:
  monstreGénéré.Fire = Random()*monstre.Fire + Random()*zone.Fire;
  random nombre float entre 0 et 1 (0.99999999...)

  Probabilitée pour le moment
  5 très commun
  4 commun
  3 rare
  2 très rare
  1 Mythe
  0 Zone cachée.


var ZoneDemo ={   name:"ZoneDemo",prob:0,
                  health: 1, coins: 1,
                  Fire: 0, Ice: 0, Elect : 0, Earth : 0, wind :0
                };

*/


var Plain ={   name:"Plain",prob:5,
                  health: 1, coins: 1,
                  Fire: 0, Ice: 0, Elect : 0, Earth : 0, wind :0
                };
var River ={   name:"River",prob:4,
                  health: 1, coins: 2,
                  Fire: 0, Ice: 0, Elect : 0, Earth : 0, wind :0
                };

var SnowMountain ={   name:"snowMountain",prob:3,
                  health: 2, coins: 1,
                  Fire: 0, Ice: 0, Elect : 0, Earth : 0, wind :0
                };





var LISTE_ZONE_PROB = []; //Liste a fournire

function init_liste_zone_prob() //Créer une liste des monstres, avec probabilité, plus qua piocher aléatoirement dedans.
{
  //Liste des monstres.
  var ZONE = [Plain,River,SnowMountain];
  var i;
  var y;
  for (i = 0; i < ZONE.length; i++) {
  	for(y=0; y<ZONE[i].prob;y++)
    {
    	LISTE_ZONE_PROB.push(ZONE[i]);
    }
  }
}
init_liste_zone_prob(); // Le lance 1 fois.
