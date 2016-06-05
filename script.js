window.addEventListener('load', () => {

  let cell_set = document.getElementsByClassName('cell');

  let x_select = document.getElementById('x_select');
  let circle_select = document.getElementById('circle_select');
  let piece_select = document.getElementsByClassName('piece-select')[0];

  let circle = "<img src=\"Assets/circle.png\" class=\"piece circle\">"
  let x_mark = "<img src=\"Assets/image.png\" class=\"piece x_mark\">"
  // let circle = "<img src=\"http://s12.postimg.org/r0p6cequ1/circle.png\" class=\"piece circle\">"
  // let x_mark = "<img src=\"http://s12.postimg.org/lb8xs3knt/image.png\" class=\"piece x_mark\">"
  var user_last_cell;
  var user_piece;
  var ai_piece;

  x_select.addEventListener('click', () => {
    user_piece = x_mark;
    ai_piece = circle;
    hide(document.getElementById('piece-select'));
    start_game();
  });
  circle_select.addEventListener('click', () => {
    user_piece = circle;
    ai_piece = x_mark;
    hide(document.getElementById('piece-select'));
    start_game();
  });

  function get_x(cell){ return cell.id.split(",")[0]; }
  function get_y(cell){ return cell.id.split(",")[1]; }
  function is_ocupied(cell){ return cell.className.split(" ").indexOf("ocupied") != -1; }
  function is_user_ocupied(cell){ return cell.className.split(" ").indexOf("user_ocupied") != -1; }
  function is_ai_ocupied(cell){ return cell.className.split(" ").indexOf("ai_ocupied") != -1; }

  function start_game(){
    ai_move();
    Array.prototype.forEach.call(cell_set, (cell) => {
      cell.addEventListener('click', on_cell_click);
    })
  }

  function on_cell_click(e){
    if(is_ocupied(e.target))
      console.log("illegal move");
    else {
      user_takes(e.target);
      if(check_winner(user_last_cell) == 'not_done'){
        ai_move();
      }
    }
  }

  function hide(element){
    element.className += ' hidden';
    Array.prototype.slice.call(element.children).forEach((child) => {
      hide(child);
    });
  }

  function show(element){
    element.classList.remove('hidden');
    Array.prototype.slice.call(element.children).forEach((child) => {
      show(child);
    });
  }

  function reset(){
    Array.prototype.forEach.call(cell_set, (cell) => {
      cell.className = "cell flex flex-1 flex-center flex-middle pointer";
      cell.innerHTML = "";
    });
    stop_game();
    show(document.getElementById('piece-select'));
  }

  function stop_game(){
    Array.prototype.forEach.call(cell_set, (cell) => {
      cell.removeEventListener('click', on_cell_click);
    });
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
