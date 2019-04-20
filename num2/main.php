<?php

class GrupFormater{

///подключение к БД
function connectToDB() {
    include_once ("BDconfig.php");
    static $link;
    if (!isset($link))
    {
      $link = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
      mysql_select_db($database) or die("Не могу подключиться к базе.");
      return $link;
    }
    else
      return $link;
}

///получает сгруппированные PersonID по номерам телефонов
function TakePersons()
{

  $dbh = $this->connectToDB();//подключаемся к БД
  $query = "SELECT Contact as `Phone`,GROUP_CONCAT(PersonID) as `Persons` FROM contacts GROUP BY Contact";
  $res = mysql_query($query);
  return $res; //возвращаем сгрупированный список людейй по номерам телефонов mysql_query

}

///получает список зданий, по PersonID
function TakeBuilds($persons_array)//на вход массив из PersonID
{
  $dbh = $this->connectToDB();//подключаемся к БД

  $query = "SELECT persons.`BuildID`,buildings.Address FROM persons,buildings WHERE buildings.BuildID=persons.BuildID AND ( persons.PersonID = ".$persons_array[0];
  for($i=1;$i<count($persons_array);$i++)
  {
    $query=$query." OR PersonID = ".$persons_array[$i];//дописываем запрос к БД, чтобы можно было вытянуть нужные значения из BuildID
  }
  $query=$query.")";//когнец запроса

  $res = mysql_query($query);
  return $res;//возвращаем список mysql_query найденных зданий по переданным персонам
}

///Основноя функция для построения таблицы
public function GrupBuilds()
{
  $persons = $this->TakePersons();//получаем персоны, сгруппированные по номерам телефонов
  while($row = mysql_fetch_array($persons))
  {

    echo "Номер: ".$row['Phone']."<br>\n";
    $persons_array = explode(",", $row['Persons']);//разбиваем получанный сгрупповой список персон на масив
    $builds = $this->TakeBuilds($persons_array);//получаем здания и адреса
    while($row_builds = mysql_fetch_array($builds))
    {
      echo "Здание: ".$row_builds['BuildID']." ".$row_builds['Address']."<br>\n";

    }
    echo "<hr>\n";
  }
}

}

 ?>
