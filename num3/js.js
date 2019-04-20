$(document).ready(function(){
 var minlen = 2; // минимальная длина слова
 var keyint = 20; // интервал между нажатиями клавиш
 var term = '';//значение поиска
 var time_keyup = 0;//временныеинетервалы для оптимизации
 var time_search = 0;//временныеинетервалы для оптимизации
 var serchIsOpen=false;//открыта ли строка поиска


//нажатие на крестик (очистка поля)
 $( "#clear" ).click(function() {
  $('#spterm').val("");
  CloseSerch();
  });

//непосредственно сам поиск по странице
 function dosearch() {
  term = $('#spterm').val();

  //перебираем все элементы контента на наличие поисковой строки
  $('#content p').each(function(){
   var SerchElem_txt = $( this ).text();
   if(SerchElem_txt.includes(term))//если элемент содержит где либо в себе это выражение, то имеет смысл его рассмотреть, иначе - нет
   {
   	var SerchElem_txt_split=SerchElem_txt.split(' ');//разбиваем текст элемента на строки, чтобы определить, не начинается ли какое либо из слов текста элемента с поисковой строки
    for (var i = 0; i < SerchElem_txt_split.length; i++) {
      if(SerchElem_txt_split[i].startsWith(term))
      {
      	$('#sameBox').append("<p>"+SerchElem_txt+"</p>");// если какое либо из слов элемента начинается с поисковой строки, то запомнить весь элемент
        break;
      }
    }
   }
  });
 }
function CloseSerch()
{
  serchIsOpen=false;
  $( "#sameBox" ).animate({
    opacity: 0,
    height: "0px"
  }, 800, function() {

  });
}
function OpenSerch()
{
  $('#sameBox').empty();
  serchIsOpen=true;
  $( "#sameBox" ).animate({
    opacity: 1,
    height: "100px"
  }, 300, function() {
    serchIsOpen=true;
  });
}

 $('#spterm').keyup(function(){
  var d1 = new Date();
  time_keyup = d1.getTime();
  if ($('#spterm').val()!=term) // проверяем, изменилась ли строка
   if ($('#spterm').val().length>=minlen) { // проверяем длину строки
    setTimeout(function(){ // ждем следующего нажатия, чтобы разгрузить систему
     var d2 = new Date();
     time_search = d2.getTime();
     if (time_search-time_keyup>=keyint) // проверяем интервал между нажатиями
     {
       OpenSerch();//открываем строку результатов поиска
       dosearch(); // если все в порядке, приступаем к поиску
     }
    }, keyint);
   }
 });
});
