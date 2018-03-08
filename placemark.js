ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map", 
    {
      center: [55.76, 37.64],
      zoom: 10
    }, 
    {
      searchControlProvider: 'yandex#search'
    }
  );

  var color
  $.getJSON('fines.json', function(data) {
    $.each(data, function( key, val )
    {
      if(key == "Value") 
      {
        var obj = JSON.parse(val);

        for (i in obj.Fines)
        {
          var nar = obj.Fines[i]
          var fine = Number(nar.FineSum);
          var type = "";
          if(fine<=1000) {color = "#0000ff"};
          if(fine>1000 && fine <=2000) {color = "#00ffff"}
          if(fine>2000 && fine <=3000) {color = "#00ff00"}
          if(fine>3000 && fine <=4000) {color = "#ffff00"}
          if(fine>4000) {color = "#ff0000"}
          for (j in nar.ApnDetail)
          {  
            if(nar.ApnDetail[j].Name == "Статья КоАП или закона субъекта РФ, состав правонарушения") {type = nar.ApnDetail[j].Value;}
          }
          myMap.geoObjects.add(new ymaps.Placemark([Number(nar.Latitude.replace(",",".")), Number(nar.Longitude.replace(",","."))], {
              balloonContent: type
            }, {
              preset: 'islands#circleIcon',
              iconColor: color
            }
          ));
        }
      }
    });
  });
}
