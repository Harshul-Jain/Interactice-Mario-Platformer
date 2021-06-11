let config={
    type:Phaser.AUTO,
    
    scale:{
        mode:Phaser.Scale.FIT,
        width:800,
        height:600,
    },
    backgroundColor:0xfff111,
    
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:1000,
            }
        }
    },
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    },
};
let game=new Phaser.Game(config);

function preload(){
    this.load.image("ground","./Assets/topground.png");
    this.load.image("sky","./Assets/background.png");
    this.load.spritesheet('dude',"./Assets/dude.png",{frameWidth:32,frameHeight:48});
    
    
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
    
    //Adding player
    let player=this.physics.add.sprite(100,100,'dude',4);
    
    this.physics.add.existing(ground);
    ground.body.allowGravity=false;
    ground.body.immovable=true;
    //if we directly make ground as static by writing 
    //this.physics.add.existing(ground,true);true->make it static(false by default)
    //no need to write these
    // ground.body.allowGravity=false;
    //ground.body.immovable=true;
    
    //add a collision detection between player and ground
    this.physics.add.collider(player,ground);
    
    
}

function update(){
    
}