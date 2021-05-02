var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let loadImage = (src, callback) =>{
    var img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};
let imagePath = (frameno, animation) =>{

    return "\images/"+animation+"/"+ frameno+".png";
};
let frames = {
 idle : [1,2,3,4,5,6,7,8],
 kick : [1,2,3,4,5,6,7],
 punch : [1,2,3,4,5,6,7],
 backward : [1,2,3,4,5,6],
 block : [1,2,3,4,5,6,7, 8, 9],
 forward : [1,2,3,4,5,6],
};
let loadImages = (callback) =>{
    //let no = [1,2,3,4,5,6,7,8];
    let imagesToLoad = 0;
    let images = {idle : [], kick : [], punch:[] , forward : [], backward: [], block : []};
    ["idle", "kick", "punch", "forward", "backward", "block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad += animationFrames.length;
        animationFrames.forEach((frameno) => {
            let path = imagePath(frameno, animation);
            loadImage(path, (image)=>{
                images[animation][frameno - 1] = image;
                imagesToLoad -= 1;
    
                if(imagesToLoad === 0)
                {
                    callback(images);
                }
            });

        });
/*
        let path = imagePath(frameno);
        loadImage(path, (image)=>{
            images[frameno - 1] = image;
            imagesToLoad -= 1;

            if(imagesToLoad === 0)
            {
                callback(images);
            }
        }); */
    });
};

let animate = (ctx, images,animation, callback) =>{
    images[animation].forEach((image,index) =>{
        setTimeout (() =>{
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500,500);
        }, index * 100); 
    });
    setTimeout(callback, images[animation].length * 100);

};

loadImages((images) =>{

    let queuedAnimations = [];

    //let selectedAnimation = "idle";
    let aux = () =>{
        let selectedAnimation;

        if(queuedAnimations.length === 0)
        {
            selectedAnimation = "idle";
        }
        else{
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    aux();
    document.getElementById("kick").onclick = () =>{

      queuedAnimations.push("kick");
    };
    document.getElementById("punch").onclick = () =>{

        queuedAnimations.push("punch");
    };
    document.addEventListener("keyup", (event) => {
        const key = event.key; 
    
        if(key === "ArrowLeft")
        {
            queuedAnimations.push("backward");
        }
        else if(key == "ArrowRight")
        {
            queuedAnimations.push("forward");
        }
        else if(key == "ArrowUp")
        {
            queuedAnimations.push("punch");
        }
        else if(key == "ArrowDown")
        {
            queuedAnimations.push("kick");
        }
        else if(event.keyCode == 32)
        {
            queuedAnimations.push("block");
        }
    });
    document.getElementById("forward").onclick = () =>{
   
        queuedAnimations.push("forward");
      };
      document.getElementById("backward").onclick = () =>{
        queuedAnimations.push("backward");
      };
      document.getElementById("block").onclick = () =>{
        queuedAnimations.push("block");
      };

});
