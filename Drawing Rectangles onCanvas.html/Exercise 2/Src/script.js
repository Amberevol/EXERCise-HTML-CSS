
class Point
{
   constructor( given_x_coordinate,
                given_y_coordinate )
   {
      this.x = given_x_coordinate ;
      this.y = given_y_coordinate ;
   }
}

var starting_points  =  [] ;
var ending_points    =  [] ;
var new_starting_point  = null ;
var new_ending_point  = null ;

var new_rectangle_is_being_drawn = false ;

function on_mouse_down( event )
{
   // The mouse or some other pointing device was
   // pressed down in the canvas area.

   var pointer_position_x = event.offsetX ;
   var pointer_position_y = event.offsetY ;

   new_starting_point = new Point( pointer_position_x,
                                   pointer_position_y ) ;

   new_rectangle_is_being_drawn = true ;
   draw_on_canvas() ;
}


function on_mouse_move( event )
{
   if ( new_rectangle_is_being_drawn == true )
   {
      var pointer_position_x = event.offsetX ;
      var pointer_position_y = event.offsetY ;

      new_ending_point = new Point( pointer_position_x,
                                    pointer_position_y ) ;
      
      draw_on_canvas() ;
   }
}

function on_mouse_up( event )
{
   if ( new_rectangle_is_being_drawn == true )
   {
      var pointer_position_x = event.offsetX ;
      var pointer_position_y = event.offsetY ;

      // The drawing of a new rectangle is finished now. The start and
      // end points of the new rectangle will be pushed to the end
      // of the arrays.

      starting_points.push( new_starting_point ) ;
      ending_points.push( new Point( pointer_position_x,
                                     pointer_position_y ) ) ;
      new_rectangle_is_being_drawn = false ;
      new_starting_point = null ;
      new_ending_point   = null ;

      draw_on_canvas() ;
   }
}

//  The following function, which is called from 
//  draw_on_canvas(), adjusts coordinates so that the rectangle
//  is shown "in a correct way" in relation to the mouse movement.

function draw_filled_rectangle( given_context,
                                starting_point,
                                ending_point,
                                filling_color )
{


   var upper_left_corner_x = starting_point.x ;
   var upper_left_corner_y = starting_point.y ;
   var rectangle_width  = ending_point.x - starting_point.x ;
   var rectangle_height = ending_point.y - starting_point.y ;

   if ( rectangle_width < 0 )
   {
      rectangle_width  = - rectangle_width ;
      upper_left_corner_x -= rectangle_width ;
   }

   if ( rectangle_height < 0 )
   {
      rectangle_height  =  - rectangle_height ;
      upper_left_corner_y  -=  rectangle_height ;         
   }

   given_context.save() ;

   given_context.fillStyle = filling_color ;
   given_context.strokeStyle = "black" ;
   given_context.lineWidth = 2 ;

   given_context.fillRect( upper_left_corner_x,
                           upper_left_corner_y,
                           rectangle_width,
                           rectangle_height ) ;

   given_context.strokeRect( upper_left_corner_x,
                             upper_left_corner_y,
                             rectangle_width,
                             rectangle_height ) ;

   given_context.restore() ;
}


function draw_on_canvas()
{
   var canvas = document.getElementById( "drawing_rectangles_canvas" ) ;
   var context = canvas.getContext("2d") ;
   
   // globalAlpha object is used to make the rectangles transparent here in 2d mode of canvas 
   context.globalAlpha = 0.2;

   // We'll fill the entire canvas with light color, which overdraws
   // the previous drawings.

   context.fillStyle = "Beige" ;
   context.fillRect( 0, 0, canvas.width, canvas.height ) ;

   var rectangle_colors = [ "Teal", "Tomato", "Turquoise", "Violet",
                            "YellowGreen", "Gold", "black"] ;

   // The following loop draws all the rectangles that the user has drawn.

   for ( var rectangle_index  =  0 ;
             rectangle_index  <  starting_points.length ;
             rectangle_index  ++ )
   {
      // Method pop() removes and returns the last color
      // of the array.

      var color_from_list = rectangle_colors.pop() ;

      draw_filled_rectangle( context,
                             starting_points[ rectangle_index ],
                             ending_points[ rectangle_index ],
                             color_from_list ) ;

      // Method unshift() puts the used color to the beginning of the array.
      // This way the the used color will be used again after all
      // other colors have been used.

      rectangle_colors.unshift( color_from_list ) ;
   }

   if ( new_ending_point != null )
   {
      // We will draw a not-yet-finished rectangle.

      draw_filled_rectangle( context,
                             new_starting_point,
                             new_ending_point,
                             "Snow" ) ;  // Almost white
   }
}
