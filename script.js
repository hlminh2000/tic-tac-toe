window.addEventListener('load', () => {

  let cell_set = document.getElementsByClassName('cell');

  let circle = "<img src=\"Assets/circle.png\" class=\"piece circle\">"
  let x_mark = "<img src=\"Assets/image.png\" class=\"piece x_mark\">"
  // let circle = "<img src=\"http://s12.postimg.org/r0p6cequ1/circle.png\" class=\"piece circle\">"
  // let x_mark = "<img src=\"http://s12.postimg.org/lb8xs3knt/image.png\" class=\"piece x_mark\">"

  var user_piece = circle;
  var ai_piece = x_mark;

  var user_last_cell;

  ai_move();

  Array.prototype.forEach.call(cell_set, (cell) => {
    cell.addEventListener('click', () => {
      if(is_ocupied(cell))
        console.log("illegal move");
      else {
        user_takes(cell);
        if(check_winner(user_last_cell) == 'not_done'){
          ai_move();
        }
      }
    })
  })

  function get_x(cell){ return cell.id.split(",")[0]; }
  function get_y(cell){ return cell.id.split(",")[1]; }
  function is_ocupied(cell){ return cell.className.split(" ").indexOf("ocupied") != -1; }
  function is_user_ocupied(cell){ return cell.className.split(" ").indexOf("user_ocupied") != -1; }
  function is_ai_ocupied(cell){ return cell.className.split(" ").indexOf("ai_ocupied") != -1; }

  function reset(){
    Array.prototype.forEach.call(cell_set, (cell) => {
      cell.className = "cell flex flex-1 flex-center flex-middle pointer";
      cell.innerHTML = "";
    })
    ai_move();
  }

  function user_takes(cell){
    cell.className += ' ocupied user_ocupied';
    cell.innerHTML = user_piece;
    user_last_cell = cell;
    setTimeout(function () {
      cell.firstChild.className += " show";
    }, 0.1);
  }

  function ai_move(){   // for simplicity, AI moves randomly.
    var ocupied_ids = [];
    var unocupied_ids = [];
    var move_id = "";
    var random = 1;
    // var ocupied_cells = document.getElementsByClassName('ocupied');
    Array.prototype.forEach.call(cell_set, (cell) => {
      if(is_ocupied(cell))
        ocupied_ids.push(cell.id);
      else
        unocupied_ids.push(cell.id)
    });
    random = Math.round(Math.random() * ((unocupied_ids.length-1) - 0) + 0);
    // console.log(unocupied_ids.length);
    move_id = unocupied_ids[random];
    document.getElementById(move_id).className += ' ocupied ai_ocupied';
    document.getElementById(move_id).innerHTML = ai_piece;
    setTimeout(function () {
      document.getElementById(move_id).firstChild.className += " show";
      check_winner();
    }, 0.1);
    // console.log(ocupied_ids);
  }

  function check_winner(user_last_cell){
    var user_ocupied_ids = [];
    var ai_ocupied_ids = [];
    var ocupied_ids = [];

    Array.prototype.forEach.call(cell_set, (cell) => {
      if(is_ocupied(cell))
        ocupied_ids.push(cell.id);
      if(is_user_ocupied(cell))
        user_ocupied_ids.push(cell.id);
      else if(is_ai_ocupied(cell))
        ai_ocupied_ids.push(cell.id);
    });

    if( (user_ocupied_ids.indexOf("-1,1") != -1 && user_ocupied_ids.indexOf("-1,0") != -1 && user_ocupied_ids.indexOf("-1,-1") != -1) ||   // first column
        (user_ocupied_ids.indexOf("0,1") != -1 && user_ocupied_ids.indexOf("0,0") != -1 && user_ocupied_ids.indexOf("0,-1") != -1) ||      // second column
        (user_ocupied_ids.indexOf("1,1") != -1 && user_ocupied_ids.indexOf("1,0") != -1 && user_ocupied_ids.indexOf("1,-1") != -1) ||      // third column
        (user_ocupied_ids.indexOf("-1,1") != -1 && user_ocupied_ids.indexOf("0,1") != -1 && user_ocupied_ids.indexOf("1,1") != -1) ||      // first row
        (user_ocupied_ids.indexOf("-1,0") != -1 && user_ocupied_ids.indexOf("0,0") != -1 && user_ocupied_ids.indexOf("1,0") != -1) ||      // second row
        (user_ocupied_ids.indexOf("-1,-1") != -1 && user_ocupied_ids.indexOf("0,-1") != -1 && user_ocupied_ids.indexOf("1,-1") != -1) ||    // third row
        (user_ocupied_ids.indexOf("-1,1") != -1 && user_ocupied_ids.indexOf("0,0") != -1 && user_ocupied_ids.indexOf("1,-1") != -1) ||     // first diagonal
        (user_ocupied_ids.indexOf("-1,-1") != -1 && user_ocupied_ids.indexOf("0,0") != -1 && user_ocupied_ids.indexOf("1,1") != -1) ){     // second diagonal
        setTimeout(function () {
          user_last_cell.firstChild.className += " show";
          window.alert("You won!");
          reset();
          return "user";
        }, 0.1);
    }

    else if( (ai_ocupied_ids.indexOf("-1,1") != -1 && ai_ocupied_ids.indexOf("-1,0") != -1 && ai_ocupied_ids.indexOf("-1,-1") != -1) ||   // first column
        (ai_ocupied_ids.indexOf("0,1") != -1 && ai_ocupied_ids.indexOf("0,0") != -1 && ai_ocupied_ids.indexOf("0,-1") != -1) ||      // second column
        (ai_ocupied_ids.indexOf("1,1") != -1 && ai_ocupied_ids.indexOf("1,0") != -1 && ai_ocupied_ids.indexOf("1,-1") != -1) ||      // third column
        (ai_ocupied_ids.indexOf("-1,1") != -1 && ai_ocupied_ids.indexOf("0,1") != -1 && ai_ocupied_ids.indexOf("1,1") != -1) ||      // first row
        (ai_ocupied_ids.indexOf("-1,0") != -1 && ai_ocupied_ids.indexOf("0,0") != -1 && ai_ocupied_ids.indexOf("1,0") != -1) ||      // second row
        (ai_ocupied_ids.indexOf("-1,-1") != -1 && ai_ocupied_ids.indexOf("0,-1") != -1 && ai_ocupied_ids.indexOf("1,-1") != -1) ||    // third row
        (ai_ocupied_ids.indexOf("-1,1") != -1 && ai_ocupied_ids.indexOf("0,0") != -1 && ai_ocupied_ids.indexOf("1,-1") != -1) ||     // first diagonal
        (ai_ocupied_ids.indexOf("-1,-1") != -1 && ai_ocupied_ids.indexOf("0,0") != -1 && ai_ocupied_ids.indexOf("1,1") != -1) ){     // second diagonal
        window.alert("Computer won!");
      reset();
      return "ai";
    }

    else if (ocupied_ids.length == 9) {
      window.alert("it's a tie game");
      reset();
      return "tie";
    }

    else {
      return "not_done";
    }

  }

})
