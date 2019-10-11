var App = function(){
    function helloWorld(){
        console.log('helloWorld');
    }
    return {
        initWorld:function(){
            helloWorld();
        }
    };
}();



App.initWorld();