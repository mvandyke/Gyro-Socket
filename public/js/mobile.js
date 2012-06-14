(function() {

  $(function() {
    var player, socket;
    player = {};
    socket = io.connect('/');
    $('#go').click(function() {
      var prev_alpha, prev_beta, rando;
      rando = Math.floor(Math.random() * 16777215).toString(16);
      player.name = $('input').val();
      player.uid = rando;
      player.color = '#' + rando;
      socket.emit('player_connect', player);
      $('#sign_up').hide();
      $('#me').fadeIn();
      $('#color').css('background-color', player.color);
      $('#name').text(player.name);
      prev_alpha = 0;
      prev_beta = 0;
      return window.ondeviceorientation = function(e) {
        if (Math.round(e.alpha) !== prev_alpha) {
          socket.emit("alpha_update_" + player.uid, e.alpha);
        }
        if (Math.round(e.beta) !== prev_beta) {
          socket.emit("beta_update_" + player.uid, e.beta);
        }
        prev_alpha = Math.round(e.alpha);
        return prev_beta = Math.round(e.beta);
      };
    });
    return $('#send').click(function() {
      var message;
      message = $('#messager').val();
      $('#messager').val('');
      return socket.emit("message_" + player.uid, message);
    });
  });

}).call(this);
