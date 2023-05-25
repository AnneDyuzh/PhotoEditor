var img = new Image(); //Изображение
var canvas = document.getElementById('canvas'); //Холст canvas
var ctx = canvas.getContext('2d');
var fileName = ''; //Название изменяемого файла
var count_rotations=0; //Количество поворотов изображения
var angleInDegrees = 0; //Градус поворота
 
//Загрузить изображение
$("#upload-file").on("change", function(){
    //занесение выбранного пользователем файла в переменную
    var file = document.querySelector('#upload-file').files[0]; 
    console.log(file);
    var reader = new FileReader();
    //проверка на то был ли выбран файл
    if (file) {
        //запоминание названия файла
        fileName = file.name;
        //считывание файла
        reader.readAsDataURL(file);
    }
    //при правильном расширении файла запускается функция, иначе false
    reader.addEventListener("load", function () {
      //создание переменной для изображени и
      //помещение в неё того. что было в файле
        img = new Image();
        img.src = reader.result;
        console.log(img.src);
        //отрисовка изображения на холсте
        img.onload = function () {
            drawRotated(0);
        }
    }, false);

});

//Скачать изображение
$('#download-btn').on('click', function (e) {
    //в переменную заносится расширение нашего файла,
    //который был загружен в редактор
    var fileExtension = fileName.slice(-4);
    //если данный файл с допустимым расширением, то в actualName
    //заносится его название без расширения
    if (fileExtension == '.jpg' || fileExtension == '.png') {
        var actualName = fileName.substring(0, fileName.length - 4);
    }

    //функция для скачивания изображения, сразу же 
    //добавляющая к полученному файлу слово -edited и расширение jpg
    download(canvas, actualName + '-edited.jpg');
});
 
//Функция для того, чтобы с холста Canvas достать img 
function download(canvas, filename) {
    var  e;
    var lnk = document.createElement('a');
    
    //с холста берётся изображение
    lnk.download = filename;
    lnk.href = canvas.toDataURL("image/jpeg", 0.8);
    
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);
    }
    else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
    console.log(lnk.href);
}

//Функция для поворота изображения на 90 градусов
function drawRotated(degrees){
    count_rotations++;

    if(degrees == 90 || degrees == 270) {
        canvas.width = img.height;
        canvas.height = img.width;
    } else {
        canvas.width = img.width;
        canvas.height = img.height;
    }

  //Очистка холста
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(degrees == 90 || degrees == 270) {
        ctx.translate(img.height/2,img.width/2);
    } else {
        ctx.translate(img.width/2,img.height/2);
   }
    ctx.rotate(degrees*Math.PI/180);
  //Отрисовка изображения на холсте
    ctx.drawImage(img,-img.width/2,-img.height/2);
    $("#canvas").removeAttr("data-caman-id");

}

$(document).ready(function() {

  //Поворот изображения
    $("#rotation-btn").on("click", function(e) {
    if (count_rotations % 4 == 0){
        angleInDegrees = 0;
    }
    else angleInDegrees += 90 % 360;

    img = new Image();
    img.src = canvas.toDataURL("image/jpeg", 0.8);
    console.log(img.src);
    //отрисовка изображения на холсте
    img.onload = function () {
       drawRotated(angleInDegrees);
    }

  });
  
  //Очистка холста canvas
   $("#remove-btn").on("click", function(e) {

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
  });

  //Изменение яркости изображение
  //Увеличить яркость
  $("#brightness-inc").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.brightness(10).render();
    });
  });
  //Убавить яркость
  $("#brightness-dec").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.brightness(-10).render();
    });
  });

  //Изменение контрастности изображение
  //Увеличить контрастность
  $("#contrast-inc").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.contrast(10).render();
    });
  });
  //Убавить контрастность
  $("#contrast-dec").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.contrast(-10).render();
    });
  });

  //Изменение насыщенности изображение
  //Увеличить насыщенность
  $("#saturation-inc").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.saturation(10).render();
    });
  });
  //Убавить насыщенность
  $("#saturation-dec").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.saturation(-10).render();
    });
  });

  //Изменение экспозиции изображение
  //Увеличить экспозицию
  $("#exposure-inc").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.exposure(10).render();
    });
  });
  //Убавить экспозицию
  $("#exposure-dec").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.exposure(-10).render();
    });
  });

});

//Применение фильтров
$("#vintage-btn").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.vintage().render();
    });
  });

  $("#lomo-btn").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.lomo().render();
    });
  });

  $("#pinhole-btn").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.pinhole().render();
    });
  });

  $("#nostalgia-btn").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.nostalgia().render();
    });
  });

  $("#majestic-btn").on("click", function(e) {
    Caman("#canvas", img, function() {
      this.herMajesty().render();
    });
  });

  var startX; //новая координата x
  var startY; //новая координата y
  var clipWidth; //ширина рамки кадрирования
  var clipHeight; //высота рамки кадрирования

  //Функция для обрезки изображения
  $("#crop-btn").on("click",function(){
    //Блокировка кнопок
    $(this).prop("disabled", true);
    $("#crop-btn2").prop("disabled", false);
    $("#crop-btn3").prop("disabled", false);

  //Использования библиотеки Jcrop для вычисления координат
  //рамки кадрирования
   $('#canvas').Jcrop({
   onSelect : function (c) {
        startX = c.x;
        startY = c.y;
        clipWidth = c.w;
        clipHeight = c.h;
    }
    }) 
    JcropAPI = $('#canvas').data('Jcrop');
    JcropAPI.enable();
})

//Функция для отображении обрезанного изображения на холсте
$("#crop-btn2").on("click",function(){
   
  //Блокировка кнопок
    $("#crop-btn").prop("disabled", false);
    $(this).prop("disabled", true);
    $("#crop-btn3").prop("disabled", true);

   img = new Image();
    img.src = canvas.toDataURL("image/jpeg", 0.8);
    console.log(img.src);
    //отрисовка изображения на холсте
    img.onload = function () {
  //Очистка холста
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(img.width/2,img.height/2);
    ctx.rotate(0*Math.PI/180);
    
  //Отображение обрезанного изображения
  ctx.drawImage(img,startX*1.2, startY*1.2,clipWidth*0.95,clipHeight*0.95,
      -img.width/2,-img.height/2,img.width,img.height);
    $("#canvas").removeAttr("data-caman-id");
    }
  //Отключение рамки кадрирования
    JcropAPI = $('#canvas').data('Jcrop');
    JcropAPI.release();
    JcropAPI.disable();
})

//Функция для закрытия рамки кадрирования
$("#crop-btn3").on("click",function(){
   
  //Блокировка кнопок
    $("#crop-btn").prop("disabled", false);
    $("#crop-btn2").prop("disabled", true);
    $(this).prop("disabled", true);
  //Отключение рамки кадрирования
    JcropAPI = $('#canvas').data('Jcrop');
    JcropAPI.release();
    JcropAPI.disable();
});

