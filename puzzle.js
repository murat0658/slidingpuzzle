//global variables, necessary for scrolling function

var empty_row = 0;  //row of empty box
var empty_column = 0;  //column of empty box
var s = 3;  //size of the game
var one_dim_array = null;
var screen_dimension = 0;
var img_src = "x.jpg";
var point_counter;


function give_size(size)
{
  s = size;
}

function transition(el)
{

  if(el ==1)
  {


    document.getElementById("options").style.display = "none";
    document.getElementById("start_game_page").style.display = "none";
    document.getElementById("puzzle").style.display = "block";
    func();

  }
  else if(el == 2)
  {
    document.getElementById("start_game_page").style.display = "none";
    document.getElementById("options").style.display = "block";
  }
  else if(el == 3)
  {
  	document.getElementById("options").style.display = "none";
    document.getElementById("start_game_page").style.display = "block";
    document.getElementById("puzzle").style.display = "none";
  }
}


function sorted()
{
  if(one_dim_array == null)
  {
    return false;
  }

    var l = one_dim_array.length;
    for(var i= 0;i<l-2;i++)
    {
      if(one_dim_array[i] > one_dim_array[i+1])
      {
        return false;
      }
    }

    if(one_dim_array[l-1] == 0 )
    {
      return true;
    }

      return false;
}

function readURL(input)
{
  if (input.files && input.files[0])
  {
    var reader = new FileReader();
    reader.onload = function (e)
    {
      img_src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}


function recreate()
{
  elem = document.getElementById("block");

  if(elem != null)
  {
    elem.parentElement.removeChild(elem);
  }
  /*else
  {
    return;
  }*/

  var block = document.createElement('div');
  block.id = 'block';
  document.getElementsByTagName('body')[0].appendChild(block);

  // add the main block
  if(screen.width<screen.height)
  {
    screen_dimension = screen.width;
  }
  else
  {
    screen_dimension = screen.height;
  }

  var image = new Image();

  image.src = img_src;

  //if image is not suitable:
  image.onload = function()
  {
    if((screen.width < screen.height && image.width < screen.width)  || (screen.height < screen.width && image.height < screen.height))
    {
      alert("Image is too small to work. Try another!!!");

      var elem = document.getElementById("block");

      if(elem != null)
      {
        elem.parentElement.removeChild(elem);
      }
    }   
  }

  screen_dimension-=10
  var _width_and_height = (screen_dimension)/s;
  _width_and_height = Math.floor(_width_and_height);
   screen_dimension = s * _width_and_height;

  $("#block").css({
    "width" : screen_dimension+10,
    "height" : screen_dimension+10
  });

  var current_x = 0;
  var current_y = 0;

  var array_x  = new Array(s*s-1);
  var array_y = new Array(s*s-1);

  for(var i=0;i<s*s-1;i++,current_x -= _width_and_height)
  {
    if(current_x == -screen_dimension)
    {
      if(current_x!=0)
      {
        current_y -= _width_and_height;
      }
      current_x = 0;
    }
    array_x[i] = current_x;
    array_y[i] = current_y;
  }

    var innerDiv; // variable of inside blocks

    //add the inside blocks
    for(var i=0;i<s*s;i++)
    {

        innerDiv = document.createElement('div');
        innerDiv.className = 'block-inside';
        innerDiv.id = one_dim_array[i];
        innerDiv.style.lineHeight = _width_and_height + "px";

        innerDiv.style.background = "url("+ image.src + ") " + array_x[one_dim_array[i]-1] + "px " + array_y[one_dim_array[i]-1] + "px";
        if(one_dim_array[i] != 0)
        {
          innerDiv.innerHTML = one_dim_array[i];
        }

        block.appendChild(innerDiv);
    }

    $(".block-inside").css({
      "width" : _width_and_height,
      "height" : _width_and_height
    });

}


$(window).resize(function () {
  recreate();
});

$(document).ready(function()
{

  	

  $("body").on("click",".block-inside", function(){


   	if(point_counter == 0)
   	{
   		alert("Game over!!");
   		transition(3);
   	}


    index = one_dim_array.indexOf(parseInt($(this).html()));

    current_row = Math.floor(index / s);
    current_column = index % s;

    if(empty_row == current_row)
    {
    	//count the clicks
    	point_counter-=10;
      	document.getElementById("point_counter").innerHTML = point_counter + " point";

      if(empty_column > current_column)
      {
        counter = empty_column;
        do
        {
            element_id = "#" + one_dim_array[current_row * s + counter-1];

            offset = $(element_id).offset();

            offset_top = offset.top;
            offset_left = offset.left;

            $(element_id).offset({ top: offset_top, left:offset_left + $(element_id).width()+2 }); //2 : border_size*2

            index = current_row*s + counter;

            temp = one_dim_array[index];
            one_dim_array[index] = one_dim_array[index-1];
            one_dim_array[index-1] = temp;

            counter--;
            empty_column--;
        }
        while(counter != current_column);
      }
      if(empty_column < current_column)
      {
          counter = empty_column;
          do
          {

            element_id = "#"+one_dim_array[current_row * s + counter+1];

              offset = $(element_id).offset();

              offset_top = offset.top;
              offset_left = offset.left;

              $(element_id).offset({ top: offset_top, left:offset_left - ($(element_id).width() + 2 ) }); //2 : border size*2

              index = current_row*s + counter;

              temp = one_dim_array[index];
              one_dim_array[index] = one_dim_array[index+1];
              one_dim_array[index+1] = temp;

              counter++;
              empty_column++;
          }
          while(counter != current_column);

    }
  }
    else if(empty_column == current_column)
    {
    	//count the clicks
    	point_counter-=10;
      	document.getElementById("point_counter").innerHTML = point_counter + " point";

      if(empty_row > current_row)
      {
        counter = empty_row;
        do
        {

          element_id = "#"+one_dim_array[(counter-1) * s + current_column];
            offset = $(element_id).offset();

            offset_top = offset.top;
            offset_left = offset.left;

            $(element_id).offset({ top: offset_top + $(element_id).height() +2, left:offset_left }); //2 : border size*2

            index = counter * s + current_column;

            temp = one_dim_array[index];
            one_dim_array[index] = one_dim_array[index-s];
            one_dim_array[index-s] = temp;

            counter--;
            empty_row--;
        }
        while(counter != current_row);

      }

      else if(empty_row < current_row)
      {
        counter = empty_row;
        do
        {

          element_id = "#"+one_dim_array[(counter+1) * s + current_column];
           var offset = $(element_id).offset();

            var offset_top = offset.top;
            var offset_left = offset.left;

            $(element_id).offset({ top: offset_top - ( $(element_id).height() +2 ), left:offset_left }); //2 : border size*2

            index = counter * s + current_column;

            temp = one_dim_array[index];
            one_dim_array[index] = one_dim_array[index+s];
            one_dim_array[index+s] = temp;

            counter++;
            empty_row++;
        }
        while(counter != current_row);

      }

    }

    if(sorted())
    {
      alert("You win!!");
    }
    else
    {

      localStorage.setItem('last_game', one_dim_array);
      localStorage.setItem('empty_row',empty_row);
      localStorage.setItem("empty_column",empty_column);
      localStorage.setItem("point", point_counter);
    }

  })

});


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}




function func()
{

  var elem = document.getElementById("block");

  if(elem != null)
  {
    elem.parentElement.removeChild(elem);
  }

    if( s == 5)
    {
      point_counter = 10000;
    }
    else if(s == 4)
    {
      point_counter = 5000;
    }
    else if( s == 3)
    {
      point_counter = 1000;
    }



    var last_game = localStorage.getItem('last_game');
  empty_row = parseInt(localStorage.getItem("empty_row"));
  empty_column = parseInt(localStorage.getItem("empty_column"));

  if(!last_game)
  {
    one_dim_array = new Array(s*s-1);

    for(var i = 0; i< s*s-1;i++)
    {
      one_dim_array[i] = i+1;
    }

    shuffleArray(one_dim_array);
  }
  else
  {

    var y_n = prompt("Do you want to go on to last game? y/n").toLowerCase() ;

    if(y_n == "n")
    {
      one_dim_array = new Array(s*s-1);

      for(var i = 0; i< s*s-1;i++)
      {
        one_dim_array[i] = i+1;
      }

      shuffleArray(one_dim_array);
    }
    else if(y_n == "y")
    {

      point_counter = parseInt(localStorage.getItem("point"));

      s = Math.floor(Math.sqrt(Math.floor(last_game.length /2)+1 ));
      one_dim_array = new Array(s*s);

      
      var j = 0;
      while(last_game != "")
      {

        one_dim_array[j] = parseInt(last_game) ;
        

        if(one_dim_array[j] > 9)
        {
          last_game = last_game.substring(3);
        }
        else
        {
          last_game = last_game.substring(2);
        }
        
        j++;

      }

      recreate();
      document.getElementById("point_counter").innerHTML = point_counter + " point";
      return;
    } 
    else
    {
      return;
    }
  }

    document.getElementById("point_counter").innerHTML = point_counter + " point";


  empty_row = s-1;
  empty_column = s-1;

  // add the main block
  if(screen.width<screen.height)
  {
    screen_dimension = screen.width;
  }
  else
  {
    screen_dimension = screen.height;
  }

  var image = new Image();
  image.src = img_src;

  //if image is not suitable:
  image.onload = function()
  {
    if((screen.width < screen.height && image.width < screen.width)  || (screen.height < screen.width && image.height < screen.height))
    {
      alert("Image is too small to work. Try another!!!");
/*
      var elem = document.getElementById("block");

      if(elem != null)
      {
        elem.parentElement.removeChild(elem);
      }
*/
    }
  }

  var block = document.createElement('div');
  block.id = 'block';
  document.getElementsByTagName('body')[0].appendChild(block);

  screen_dimension -= 10;
  var _width_and_height = (screen_dimension)/s;
  _width_and_height = Math.floor(_width_and_height);
  screen_dimension =  s*_width_and_height;

  $("#block").css({
    "width" : screen_dimension+10,
    "height" : screen_dimension+10
  });

  var current_x = 0;
  var current_y = 0;

  var array_x  = new Array(s*s-1);
  var array_y = new Array(s*s-1);

  for(var i=0;i<s*s-1;i++,current_x -= _width_and_height)
  {
    if(current_x == -screen_dimension)
    {
      if(current_x!=0)
      {
        current_y -= _width_and_height;
      }
      current_x = 0;
    }
    array_x[i] = current_x;
    array_y[i] = current_y;
  }

    var innerDiv; // variable of inside blocks

    //add the inside blocks
    for(var i=0;i<s*s-1;i++)
    {

       innerDiv = document.createElement('div');
       innerDiv.className = 'block-inside';
       innerDiv.id = one_dim_array[i];
       innerDiv.style.lineHeight = _width_and_height + "px";

       innerDiv.style.background = "url("+ image.src + ") " + array_x[one_dim_array[i]-1] + "px " + array_y[one_dim_array[i]-1] + "px";

       innerDiv.innerHTML = one_dim_array[i];

       block.appendChild(innerDiv);

    }

      $(".block-inside").css({
        "width" : _width_and_height,
        "height" : _width_and_height
      });

      var temp = one_dim_array;
      one_dim_array = new Array(s*s);

      for(var i = 0 ; i < s*s-1;i++)
      {
        one_dim_array[i] = temp[i];
      }

      one_dim_array[i] = 0;
 
 }
