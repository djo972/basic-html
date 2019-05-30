//Nous importons la librairie assert
var assert = require('assert');
//On créé un groupe que l’on nomme Testons les opérations
describe('Testons les opérations', function(){
    //On teste l’addition
    it('Devra retourner 4', function() {
        //Mon assertion est de dire que 4 sera égal à 2+2
        assert.equal(4,2+2);
    });
    it('Ne devra pas retourner 5', function() {
        //Mon assertion est de dire que 5 n’est pas égal à 2+2
        assert.notEqual(5,2+2);
    });

});