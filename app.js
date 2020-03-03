

// Тоглоом дууссан эхэсийг хадгалах төлөвийн хувьсагч:
var isNewGame;

// Тоглоомын бүх газар ашиглагдах глобаль хувьсагчдыг энд зарлая

//  аль тоглоч шоо шидэх вэ гэдгийг энд хадгална аа
var activePlayer;
// 2 тоглочийн цуглуулсан оноонууд
var scores;
//  идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;

//  Шооны зурагыг үзүүлэх элементыг энд хадгалья
var diceDom =  document.querySelector(".dice") ;

    // Togloom ehleh
    initGame();
//  Тоглоом шинээр эхлэх функц
function initGame() {

    // Тоглоом эхэллээ
    isNewGame =true;

    activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч.
scores = [0, 0];

//  Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч.
roundScore = 0;


//  Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
// var diceNumber = Math.floor(Math.random()*6) + 1;

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// Тоглочдын нэрийг буцааж гаргах
document.getElementById('name-0').textContent= 'Player 1';
document.getElementById('name-1').textContent= 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-1-panel').classList.add('active');


diceDom.style.display = "none";
}

//  Шоог шидэх эвент листенер 
document.querySelector(".btn-roll").addEventListener("click", function (){
    if(isNewGame === true){
          // нэгээс  6 дотрхи санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random()*6) + 1;

    // Шооны зурагыг вэб дээр гаргаж ирнэ 
    diceDom.style.display = "block";
    //  Буусан санамсаргүЙ тоонд харгалзах шооны зургыг вэб дээр гаргаж ирнэ.
    diceDom.src = 'dice-' + diceNumber + '.png';
 
    // Буусан тоон нь  1ээс ялгаатай бол идэвхитэй Тоглогчийн ээлжийн оноог нэмэгдүүлнэ.

    if (diceNumber !== 1 ) {
        // 1-ээс ялгаатай тоо буулаа. Буусан тоглогчид оноог нэмнэ.
            roundScore = roundScore+diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
    }
    else 
    {
        //  1 Буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө

            // энэ тоглогчийн ээлжийг солих
            switchToNextPlayer();

        // if(activePlayer === 0 ){
        //         activePlayer =1;
        // }else {
        //     activePlayer =0;
        // }
    }

    }
    else{
        alert("Тоглоом дууссан байна да");
    }

});

//   Hold Товчны эвент листенер

    document.querySelector(".btn-hold").addEventListener("click", function(){

        // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нэмж өгнө 
        
        // var scores = [20, 80];
        // if(activePlayer ===0 ) {

        //     scores[0] = scores[0] + roundScore;
        // }else{
        
        //     scores[1]=scores[1] + roundScore;
        // }

        scores[activePlayer] = scores[activePlayer] + roundScore;

        // дэлгэц дээр оноог нь өөрчилнө.

        if(isNewGame){
            document.getElementById('score-' + activePlayer).textContent=scores[activePlayer];

            //  Уг тоглогч хожсон эсэхийг шалгах 
    
            if( scores[activePlayer] >= 100) {
                // Тоглоомыг дууссан төлөвт оруулна 
                isNewGame =false;
                // if(isGameOver )
    
                document.getElementById("name-" + activePlayer).textContent = 'Wiiner !!!';
                document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
                document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            } else {
                  //  Тоглогчийн ээлжийг солих:
                    switchToNextPlayer();
            }
        }
        else{
            alert("Тоглоом дууссан байна");
        }

        

      
      

            
    });

    // энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
    //  DRY Зарчим
    function switchToNextPlayer(){

            // энэ тоглогчийн ээлжиндээ цуглуулсан оноог  0 болгоно.
        roundScore= 0;
        document.getElementById("current-" + activePlayer).textContent = '0';

    // Тоглогчийн ээлжийг солино

    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ .
    // хэрэв идэвхитэй тоглогч нь 0 байвал  идэвхитэй тоглогчийг 1 болго
    //  үгүй бол идэвхитэй тоглогчийг 0 болго.
    
    activePlayer ===0  ? (activePlayer = 1) : (activePlayer=0);
    // Улаан цэгийг шилжүүлэх

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //  Шоог түр алга болгох
    diceDom.style.display = "none";

    }

    // Шинэ тоглоом эхлүүлэх  товчны  эвент листенер\
    document.querySelector('.btn-new').addEventListener("click" ,  initGame);


    $(document).ready(function(){
         
    })

