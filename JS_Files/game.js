let config={
    type:Phaser.AUTO,
    
    scale:{
        mode:Phaser.Scale.FIT,
        width:800,
        height:600,
    },
    backgroundColor:0xfff111,
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
};
let game=new Phaser.Game(config);

function preload(){
    this.load.image("ground","./Assets/topground.png");
    this.load.image("sky","./Assets/background.png");
}

function create(){
    W=game.config.width;
    H=game.config.height;
    
    //Add tileSprite
    let ground=this.add.tileSprite(0,H-128,W,128,'ground');
    ground.setOrigin(0,0);
    
    //try to create background 
    let background=this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.depth=-1;
    background.displayWidth=W;
    background.displayHeight=H;
    
    
}

function update(){
    
}