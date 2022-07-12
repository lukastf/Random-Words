// -----------------------------------Instruções -----------------------------------------
var content = [
    "Seu objetivo é reorganizar as letras e formar a",
    "palavra correta antes do tempo esgotar, para isso",
    "você deve pressionar o bloco com a letra que deseja",
    "mudar de lugar e pressionar outro bloco para que os",
    "dois blocos troquem de lugar."
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

//--------------------------------------------------------------------------------------------


var P2Game = {};

var palavra_selecionada;

var palavra_anterior;

var finalword = "";

var pontos = 0;

var inpwords = [];

Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function select (item){
    if (!this.selected){
        this.selected = item;
        this.selected.alpha = 0.5;
    }
    else {
        if (this.selected != item){
            this.game.add.tween(this.selected).to( { x: item.x, y: item.y }, 500, Phaser.Easing.Quartic.Out, true);
            this.game.add.tween(item).to( { x: this.selected.x, y: this.selected.y }, 500, Phaser.Easing.Quartic.Out, true);
            this.selected.inputEnabled = true;
            this.selected.alpha = 1;
            inpwords.swapItems(inpwords.indexOf(this.selected),inpwords.indexOf(item));
            console.log(this.selected.texto.text);
        }
        else {
            this.selected.alpha = 1;
        }
        // After checking, now clear the helper var.
        this.selected = null;
        item = null;
    }
};




P2Game.Menu = function (game){
    this.button;
    this.text;
};

P2Game.Menu.prototype = {

    makeButton: function(name, x, y, click){

        this.button = this.add.button(x, y, 'botao', click, this, 2, 1, 0);
        this.button.name = name;
        this.button.smoothed = false;
        this.text = this.add.bitmapText(x, y + 20, 'nokia', name, 20);
        this.text.x += (this.button.width / 2) - (this.text.textWidth / 2);

    },

    jogar: function(){
        pontos = 0;
        this.state.start('Nivel');

    },

    instrucoes: function(){

        this.state.start('Instrucoes');
    },

    recordes: function(){
    },

    preload: function(){

        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');

        this.load.image('background', 'assets/images/backgroundinicio.jpg');
        this.load.spritesheet('botao', 'assets/images/botao.png', 196, 75);
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');

    },

    create: function(){

        this.game.stage.backgroundColor = '#182d3b';
        this.add.image(0,0, 'background');

        this.add.image(this.world.centerX - 200, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (200 - 15), (30 + 5), 'nokia', 'R', 40);

        this.add.image(this.world.centerX - 130, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (130 - 15), (30 + 5), 'nokia', 'A', 40);

        this.add.image(this.world.centerX - 60, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (60 - 15), (30 + 5), 'nokia', 'N', 40);

        this.add.image(this.world.centerX + 10, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (10 + 15), (30 + 5), 'nokia', 'D', 40);

        this.add.image(this.world.centerX + 80, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (80 + 15), (30 + 5), 'nokia', 'O', 40);

        this.add.image(this.world.centerX + 150, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (150 + 15), (30 + 5), 'nokia', 'M', 40);

        this.add.image(this.world.centerX - 60, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (60 - 15), (110 + 5), 'nokia', 'W', 40);

        this.add.image(this.world.centerX + 10, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (10 + 15), (110 + 5), 'nokia', 'O', 40);

        this.add.image(this.world.centerX + 80, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (80 + 15), (110 + 5), 'nokia', 'R', 40);

        this.add.image(this.world.centerX + 150, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (150 + 15), (110 + 5), 'nokia', 'D', 40);

        this.add.image(this.world.centerX + 220, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (220 + 15), (110 + 5), 'nokia', 'S', 40);

        this.makeButton('Jogar', 300, 300, this.jogar);
        this.makeButton('Instruções', 300, 400, this.instrucoes);
        //this.makeButton('Recordes', 300, 500, this.recordes);
    },

    update: function(){

    }
};

P2Game.GameOver = function (game){
    this.button;
    this.text;
};

P2Game.GameOver.prototype = {

    makeButton: function(name, x, y, click){

        this.button = this.add.button(x, y, 'botao', click, this, 2, 1, 0);
        this.button.name = name;
        this.button.smoothed = false;
        this.text = this.add.bitmapText(x, y + 20, 'nokia', name, 20);
        this.text.x += (this.button.width / 2) - (this.text.textWidth / 2);

    },

    voltar: function(){
        this.state.start('Menu');
    },

    preload: function(){

        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');

        this.load.image('background', 'assets/images/cemit.jpg');
        this.load.spritesheet('botao', 'assets/images/botao.png', 196, 75);
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');

    },

    create: function(){

        this.game.stage.backgroundColor = '#182d3b';
        this.add.image(0,0, 'background');

        this.add.image(this.world.centerX - 60, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (60 - 15), (30 + 5), 'nokia', 'G', 40);

        this.add.image(this.world.centerX + 10, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (10 + 15), (30 + 5), 'nokia', 'A', 40);

        this.add.image(this.world.centerX + 80, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (80 + 15), (30 + 5), 'nokia', 'M', 40);

        this.add.image(this.world.centerX + 150, 30, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (150 + 15), (30 + 5), 'nokia', 'E', 40);

        this.add.image(this.world.centerX - 60, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (60 - 15), (110 + 5), 'nokia', 'O', 40);

        this.add.image(this.world.centerX + 10, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (10 + 15), (110 + 5), 'nokia', 'V', 40);

        this.add.image(this.world.centerX + 80, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (80 + 15), (110 + 5), 'nokia', 'E', 40);

        this.add.image(this.world.centerX + 150, 110, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (150 + 15), (110 + 5), 'nokia', 'R', 40);

        this.pontotexto = this.add.text(this.world.centerX - 60, this.world.centerY, "Você fez " + pontos + " pontos",{ font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});

        if(pontos == 1){
            this.pontotexto.text = "Você fez " + pontos + " ponto";
        }

        this.palavraperdida = this.add.text(this.world.centerX - 60, this.world.centerY + 80, "A palavra era: " + palavra_anterior + " :'(",{ font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});

        this.makeButton('< Voltar', 20, 500, this.voltar);
    },

    update: function(){

    }
};

P2Game.Instrucoes = function (game){
    this.button;
    this.text;
    this.intrucoes;
};

P2Game.Instrucoes.prototype = {

    makeButton: function(name, x, y, click){

        this.button = this.add.button(x, y, 'botao', click, this, 2, 1, 0);
        this.button.name = name;
        this.button.smoothed = false;
        this.text = this.add.bitmapText(x, y + 20, 'nokia', name, 20);
        this.text.x += (this.button.width / 2) - (this.text.textWidth / 2);

    },

    voltar: function(){
        this.state.start('Menu');
    },

    preload: function(){
        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');

        this.load.image('background', 'assets/images/praia.jpg');
        this.load.spritesheet('botao', 'assets/images/botao.png', 196, 75);
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
    },

    create: function(){

        this.game.stage.backgroundColor = '#182d3b';
        this.add.image(0,0, 'background');

        this.add.image(this.world.centerX - 390, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (390 - 15), (140 + 5), 'nokia', 'I', 40);

        this.add.image(this.world.centerX - 320, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (320 - 15), (140 + 5), 'nokia', 'N', 40);

        this.add.image(this.world.centerX - 250, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (250 - 15), (140 + 5), 'nokia', 'S', 40);

        this.add.image(this.world.centerX - 180, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (180 - 15), (140 + 5), 'nokia', 'T', 40);

        this.add.image(this.world.centerX - 110, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (110 - 15), (140 + 5), 'nokia', 'R', 40);

        this.add.image(this.world.centerX - 40, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (40 - 15), (140 + 5), 'nokia', 'U', 40);

        this.add.image(this.world.centerX + 30, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (30 + 15), (140 + 5), 'nokia', 'Ç', 40);

        this.add.image(this.world.centerX + 100, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (100 + 15), (140 + 5), 'nokia', 'Õ', 40);

        this.add.image(this.world.centerX + 170, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (170 + 15), (140 + 5), 'nokia', 'E', 40);

        this.add.image(this.world.centerX + 240, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (240 + 15), (140 + 5), 'nokia', 'S', 40);


        this.makeButton('< Voltar', 20, 500, this.voltar);

        wordIndex = 0;
        lineIndex = 0;


        this.instrucoes = this.add.text(32, 200, '', { font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});
        
        this.nextLine();
    },

    nextLine: function(){
            if (lineIndex === content.length)
        {
            //  We're finished
            return;
        }

        //  Split the current line on spaces, so one word per array element
        line = content[lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        this.time.events.repeat(wordDelay, line.length, this.nextWord, this);

        //  Advance to the next line
        lineIndex++;
    },

    nextWord: function(){
        //  Add the next word onto the text string, followed by a space
        this.instrucoes.text = this.instrucoes.text.concat(line[wordIndex] + " ");

        //  Advance the word index to the next word in the line
        wordIndex++;

        //  Last word?
        if (wordIndex === line.length)
        {
            //  Add a carriage return
            this.instrucoes.text = this.instrucoes.text.concat("\n");

            //  Get the next line after the lineDelay amount of ms has elapsed
            game.time.events.add(lineDelay, this.nextLine, this);
        }
    },

    update: function(){

    }
};



P2Game.Nivel = function(game){
    this.button;
    this.text;
};

P2Game.Nivel.prototype = {

    makeButton: function(name, x, y, click){

        this.button = this.add.button(x, y, 'botao', click, this, 2, 1, 0);
        this.button.name = name;
        this.button.smoothed = false;
        this.text = this.add.bitmapText(x, y + 20, 'nokia', name, 20);
        this.text.x += (this.button.width / 2) - (this.text.textWidth / 2);

    },

    facil: function(){
        this.state.start('JogoFacil');
    },

    medio: function(){
        this.state.start('JogoMedio');
    },

    dificil: function(){
        this.state.start('JogoDificil');
    },

    voltar: function(){
        this.state.start('Menu');
    },

    preload: function(){
        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');

        this.load.image('background', 'assets/images/ceu-azul.jpg');
        this.load.spritesheet('botao', 'assets/images/botao.png', 196, 75);
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
    },

    create: function(){

        this.game.stage.backgroundColor = '#182d3b';
        this.add.image(0,0, 'background');

        this.add.image(this.world.centerX - 390, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (390 - 15), (140 + 5), 'nokia', 'D', 40);

        this.add.image(this.world.centerX - 320, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (320 - 15), (140 + 5), 'nokia', 'I', 40);

        this.add.image(this.world.centerX - 250, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (250 - 15), (140 + 5), 'nokia', 'F', 40);

        this.add.image(this.world.centerX - 180, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (180 - 15), (140 + 5), 'nokia', 'I', 40);

        this.add.image(this.world.centerX - 110, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (110 - 15), (140 + 5), 'nokia', 'C', 40);

        this.add.image(this.world.centerX - 40, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX - (40 - 15), (140 + 5), 'nokia', 'U', 40);

        this.add.image(this.world.centerX + 30, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (30 + 15), (140 + 5), 'nokia', 'L', 40);

        this.add.image(this.world.centerX + 100, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (100 + 15), (140 + 5), 'nokia', 'D', 40);

        this.add.image(this.world.centerX + 170, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (170 + 15), (140 + 5), 'nokia', 'A', 40);

        this.add.image(this.world.centerX + 240, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (240 + 15), (140 + 5), 'nokia', 'D', 40);

        this.add.image(this.world.centerX + 310, 140, "blq" + this.rnd.integerInRange(1,8));
        this.add.bitmapText(this.world.centerX + (310 + 15), (140 + 5), 'nokia', 'E', 40);

        this.makeButton('Facil', 300, 300, this.facil);
        this.makeButton('Medio', 300, 400, this.medio);
        this.makeButton('Dificil', 300, 500, this.dificil);
        this.makeButton('< Voltar', 20, 500, this.voltar);
    },

    update: function(){

    }
};

P2Game.JogoFacil = function(game){
    this.words;
    this.inpwords = [];
    this.item;
    this.cacheword;
    this.rndword;
    this.finalword;
    this.selected;
    this.cron;
    this.contar;
    this.blqselecionado;
};

P2Game.JogoFacil.prototype= {

    preload: function(){
        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');
        this.load.json('word', 'js/words.json');
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
        this.load.image('background', 'assets/images/lousa.jpg');
        this.load.spritesheet('cronometro', 'assets/images/cronometro.png', 73, 67, 20);

    },

    create: function(){

        this.add.image(0,0, 'background');
        this.words = this.add.group();
        this.item = this.rnd.integerInRange(0,9);
        this.cacheword = this.cache.getJSON('word');
        this.rndword = this.cacheword.facil[this.item];
        if (this.rndword.palavra == palavra_anterior){
            this.state.start('JogoFacil');
        }
        this.rndword.letras.sort(function(a, b){return 0.5 - Math.random()});
        palavra_anterior = this.rndword.palavra;
        palavra_selecionada = this.rndword.palavra;

        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i] = this.words.create(70 * (i + 1), 250, "blq" + this.rnd.integerInRange(1,8), i);
            inpwords[i].letra = this.rndword.letras[i];
            inpwords[i].texto = this.add.bitmapText(inpwords[i].x, inpwords[i].y, 'nokia', inpwords[i].letra, 40);
            inpwords[i].inputEnabled = true;
            inpwords[i].events.onInputUp.add(select);
        }
        
        // pontos e cronometro
        this.pontotexto = this.add.text(30,30, "Pontos: 0",{ font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});

        this.gametime =  this.game.time.events.add(Phaser.Timer.SECOND * 20, this.tempoEsgotado, this);

         this.cron = this.add.sprite(400, 50, 'cronometro');
        
        this.contar = this.cron.animations.add('contar');
        
        this.contar.enableUpdate = true;
        
        this.cron.animations.play('contar', 1, false);

        this.dica = this.add.text(70 ,400, "Dica: "+ this.rndword.dica,{ font: "15px Arial", fill: "#ffff00" , fontSize: "40px", fontWeight: "bold"});
    },

    tempoEsgotado: function(){
        this.state.start('GameOver');
    },

    update: function(){
         
        this.pontotexto.text = "Pontos: " + pontos;
        
        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i].texto.x = Math.floor(inpwords[i].x  + inpwords[i].width / 4);
            inpwords[i].texto.y = Math.floor(inpwords[i].y  + inpwords[i].height / 15);
            finalword = finalword + inpwords[i].letra;
        }
        
       console.log(finalword);

        if(finalword == palavra_selecionada){

            this.blqselecionado = "blq" + this.rnd.integerInRange(1,8);
            
            for (var i = 0; i < this.rndword.letras.length; i++){
                inpwords[i].loadTexture(this.blqselecionado);
                inpwords[i].inputEnabled = false;
            }

            this.game.time.events.remove(this.gametime);

            this.gamedelay =  this.game.time.events.add(Phaser.Timer.SECOND * 1.5, proximafase, this);

            function proximafase(){
                pontos++;
                this.state.start('JogoFacil');
            }

            
        }

        else{
            finalword = "";
        }

        
    }

};

P2Game.JogoMedio = function(game){
    this.words;
    this.inpwords = [];
    this.item;
    this.cacheword;
    this.rndword;
    this.finalword;
    this.selected;
    this.cron;
    this.contar;
    this.blqselecionado;
};

P2Game.JogoMedio.prototype= {

    preload: function(){
        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');
        this.load.json('word', 'js/words.json');
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
        this.load.image('background', 'assets/images/lousa.jpg');
        this.load.spritesheet('cronometro', 'assets/images/cronometro.png', 73, 67, 20);

    },

    create: function(){

        this.add.image(0,0, 'background');
        this.words = this.add.group();
        this.item = this.rnd.integerInRange(0,9);
        this.cacheword = this.cache.getJSON('word');
        this.rndword = this.cacheword.medio[this.item];
        if (this.rndword.palavra == palavra_anterior){
            this.state.start('JogoMedio');
        }
        this.rndword.letras.sort(function(a, b){return 0.5 - Math.random()});
        palavra_anterior = this.rndword.palavra;
        palavra_selecionada = this.rndword.palavra;
        

        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i] = this.words.create(70 * (i + 1), 250, "blq" + this.rnd.integerInRange(1,8), i);
            inpwords[i].letra = this.rndword.letras[i];
            inpwords[i].texto = this.add.bitmapText(inpwords[i].x, inpwords[i].y, 'nokia', inpwords[i].letra, 40);
            inpwords[i].inputEnabled = true;
            inpwords[i].events.onInputUp.add(select);
        }
        
        // pontos e cronometro
        this.pontotexto = this.add.text(30,30, "Pontos: 0",{ font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});

        this.game.time.events.add(Phaser.Timer.SECOND * 21, this.tempoEsgotado, this);

         this.cron = this.add.sprite(400, 50, 'cronometro');
        
        this.contar = this.cron.animations.add('contar');
        
        this.contar.enableUpdate = true;
        
        this.cron.animations.play('contar', 1, false);

        this.dica = this.add.text(70 ,400, "Dica: "+ this.rndword.dica,{ font: "15px Arial", fill: "#ffff00" , fontSize: "40px", fontWeight: "bold"});
    },

    tempoEsgotado: function(){
        this.state.start('GameOver');
    },

    update: function(){
         
        this.pontotexto.text = "Pontos: " + pontos;
        
        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i].texto.x = Math.floor(inpwords[i].x  + inpwords[i].width / 4);
            inpwords[i].texto.y = Math.floor(inpwords[i].y  + inpwords[i].height / 15);
            finalword = finalword + inpwords[i].letra;
        }
        
       console.log(finalword);

        if(finalword == palavra_selecionada){

            this.blqselecionado = "blq" + this.rnd.integerInRange(1,8);
            
            for (var i = 0; i < this.rndword.letras.length; i++){
                inpwords[i].loadTexture(this.blqselecionado);
                inpwords[i].inputEnabled = false;
            }

            this.game.time.events.remove(this.gametime);

            this.gamedelay =  this.game.time.events.add(Phaser.Timer.SECOND * 1.5, proximafase, this);

            function proximafase(){
                pontos++;
                this.state.start('JogoMedio');
            }
        }

        else{
            finalword = "";
        }

        
    }

};

P2Game.JogoDificil = function(game){
    this.words;
    this.inpwords = [];
    this.item;
    this.cacheword;
    this.rndword;
    this.finalword;
    this.selected;
    this.cron;
    this.contar;
    this.blqselecionado;
};

P2Game.JogoDificil.prototype= {

    preload: function(){
        this.load.image('blq1','assets/images/blocks/blq1.png');
        this.load.image('blq2','assets/images/blocks/blq2.png');
        this.load.image('blq3','assets/images/blocks/blq3.png');
        this.load.image('blq4','assets/images/blocks/blq4.png');
        this.load.image('blq5','assets/images/blocks/blq5.png');
        this.load.image('blq6','assets/images/blocks/blq6.png');
        this.load.image('blq7','assets/images/blocks/blq7.png');
        this.load.image('blq8','assets/images/blocks/blq8.png');
        this.load.json('word', 'js/words.json');
        this.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
        this.load.image('background', 'assets/images/lousa.jpg');
        this.load.spritesheet('cronometro', 'assets/images/cronometro.png', 73, 67, 20);

    },

    create: function(){

        this.add.image(0,0, 'background');
        this.words = this.add.group();
        this.item = this.rnd.integerInRange(0,9);
        this.cacheword = this.cache.getJSON('word');
        this.rndword = this.cacheword.dificil[this.item];
        if (this.rndword.palavra == palavra_anterior){
            this.state.start('JogoDificil');
        }
        this.rndword.letras.sort(function(a, b){return 0.5 - Math.random()});
        palavra_anterior = this.rndword.palavra;
        palavra_selecionada = this.rndword.palavra;



        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i] = this.words.create(70 * (i + 1), 250, "blq" + this.rnd.integerInRange(1,8), i);
            inpwords[i].letra = this.rndword.letras[i];
            inpwords[i].texto = this.add.bitmapText(inpwords[i].x, inpwords[i].y, 'nokia', inpwords[i].letra, 40);
            inpwords[i].inputEnabled = true;
            inpwords[i].events.onInputUp.add(select);
        }
        
        // pontos e cronometro
        this.pontotexto = this.add.text(30,30, "Pontos: 0",{ font: "15px Arial", fill: "#ffff00" , fontSize: "30px", fontWeight: "bold"});

        this.game.time.events.add(Phaser.Timer.SECOND * 20, this.tempoEsgotado, this);

         this.cron = this.add.sprite(400, 50, 'cronometro');
        
        this.contar = this.cron.animations.add('contar');
        
        this.contar.enableUpdate = true;
        
        this.cron.animations.play('contar', 1, false);

        this.dica = this.add.text(70 ,400, "Dica: "+ this.rndword.dica,{ font: "15px Arial", fill: "#ffff00" , fontSize: "40px", fontWeight: "bold"});
    },

    tempoEsgotado: function(){
        this.state.start('GameOver');
    },

    update: function(){
         
        this.pontotexto.text = "Pontos: " + pontos;
        
        for (var i = 0; i < this.rndword.letras.length; i++){

            inpwords[i].texto.x = Math.floor(inpwords[i].x  + inpwords[i].width / 4);
            inpwords[i].texto.y = Math.floor(inpwords[i].y  + inpwords[i].height / 15);
            finalword = finalword + inpwords[i].letra;
        }
        
       console.log(finalword);

        if(finalword == palavra_selecionada){

            this.blqselecionado = "blq" + this.rnd.integerInRange(1,8);
            
            for (var i = 0; i < this.rndword.letras.length; i++){
                inpwords[i].loadTexture(this.blqselecionado);
                inpwords[i].inputEnabled = false;
            }

            this.game.time.events.remove(this.gametime);

            this.gamedelay =  this.game.time.events.add(Phaser.Timer.SECOND * 1.5, proximafase, this);

            function proximafase(){
                pontos++;
                this.state.start('JogoDificil');
            }
        }
        else{
            finalword = "";
        }

        
    }

};


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'exemplo');

game.state.add('Menu', P2Game.Menu);
game.state.add('Nivel', P2Game.Nivel);
game.state.add('JogoFacil', P2Game.JogoFacil);
game.state.add('JogoMedio', P2Game.JogoMedio);
game.state.add('JogoDificil', P2Game.JogoDificil);
game.state.add('Instrucoes', P2Game.Instrucoes);
game.state.add('GameOver', P2Game.GameOver);

game.state.start('Menu');