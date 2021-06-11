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
            },
            debug:false,
        }
    },
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    },
};

let game=new Phaser.Game(config);
let player_config={
    player_speed:150,
    player_jump:-700,
};

function preload(){
    this.load.image("ground","./Assets/topground.png");
    this.load.image("sky","./Assets/background.png");
    this.load.spritesheet('dude',"./Assets/dude.png",{frameWidth:32,frameHeight:48});
    this.load.image("apple","./Assets/apple.png");
    this.load.image("ray","./Assets/ray.png");
    
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
    background.depth=-2;
    background.displayWidth=W;
    background.displayHeight=H;
    
    //create ray on the background
    let rays=[];
    
    for(let i=-10;i<=10;i++){
        let ray=this.add.sprite(W/2,H-100,'ray');
        ray.displayHeight=1.2*H;
        ray.setOrigin(0.5,1);
        ray.alpha=0.2;
        ray.angle=i*20;
        ray.depth=-1;
        rays.push(ray);
    }
    
    //tweens
    this.tweens.add({
        targets:rays,
        props:{
            angle:{
                value:"+=20",
            },
        },
        duration:8000,
        repeat:-1
    });
    
    //Adding player
    this.player=this.physics.add.sprite(100,100,'dude',4);
    //set bounce values
    this.player.setBounce(0.5);
    
    //don't allow player to move out of game world
    this.player.setCollideWorldBounds(true);
    
    this.anims.create({
       key:'left',
        frames:this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate:10,
        repeat:-1,

    });
     this.anims.create({
       key:'center',
        frames:[{key:'dude',frame:4}],
        frameRate:10,
        repeat:-1,

    });
     this.anims.create({
       key:'right',
        frames:this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate:10,
        repeat:-1,

    });
    //Add a group of apples
    let fruits=this.physics.add.group({
        key:"apple",
        repeat:8,
        setScale:{x:0.2,y:0.2},
        setXY:{x:10,y:0,stepX:100},
    });
    
    //add bouncing effect to all apples(One method of creating Groups)
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.72));
    });
    
    //create more platforms(Second Method of creating Groups)
    let platforms=this.physics.add.staticGroup();
    platforms.create(600,400,'ground').setScale(2,0.5).refreshBody();
    platforms.create(700,200,'ground').setScale(2,0.5).refreshBody();
    platforms.create(100,200,'ground').setScale(2,0.5).refreshBody();
    platforms.add(ground);
    
    this.physics.add.existing(ground);
    ground.body.allowGravity=false;
    ground.body.immovable=true;
    //if we directly make ground as static by writing 
    //this.physics.add.existing(ground,true);true->make it static(false by default)
    //no need to write these
    // ground.body.allowGravity=false;
    //ground.body.immovable=true;
    
    //add a collision detection between player and ground
    this.physics.add.collider(this.player,platforms);
    //this.physics.add.collider(ground,fruits);
    this.physics.add.collider(platforms,fruits);
    this.physics.add.overlap(this.player,fruits,eatFruit,null,this);
    
    //input cursor-keyboard
    this.cursors=this.input.keyboard.createCursorKeys();
    
    //create camera
    this.cameras.main.setBounds(0,0,W,H);
    this.cameras.main.startFollow(this.player,true,true);
    this.physics.world.setBounds(0,0,W,H);
    this.cameras.main.setZoom(1.5);
    
}

function update(){
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    }
    else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play('center');
    }
    
    //add jumping ability
    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(player_config.player_jump);
    }
}

function eatFruit(player,fruits){
    fruits.disableBody(true,true);
}