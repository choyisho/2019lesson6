$(document).ready(function() {

});

var i = 0;
var lastRanNum = 0;
var tmpR = 0;
var numLst = {
  'you': 0,
  'pc': 0
};
var charBlink;

$('.start').click(function() {
  init();
  $(this).prop('disabled', true);
  clearInterval(charBlink);
  playDice('you');
});

function init() {
  $('.dice').children('p').removeClass('blink');
  $('#you').children('p').text('YOU');
  $('#pc').children('p').text('PC');
}

function playDice(player) {
  $({
    deg: 0
  }).animate({
    deg: 1080
  }, {
    duration: 3000,
    progress: function() {
      $('#' + player).children('img').css({
        transform: 'rotate(' + this.deg + 'deg)'
      });
      var j = Math.floor(this.deg / 120);
      tmpR = RanNum();
      if (j > i) {
        while (tmpR === lastRanNum) {
          tmpR = RanNum();
        }
        $('#' + player).children('img')
          .prop('src', 'images/dice' + tmpR + '.png');
        i = j;
        lastRanNum = tmpR;
      }
    },
    complete: function() {
      i = 0;
      lastRanNum = 0;
      numLst[player] = tmpR;

      if (player === 'you') {
        playDice('pc');
      } else {
        resultComp();
      }
    }
  });
}

function resultComp() {
  $('.start').prop('disabled', false);
  if (numLst.you === numLst.pc) {
    return;
  }
  blink(numLst.you > numLst.pc ? 'you' : 'pc');
}

function blink(winner) {
  $('#' + winner).children('p')
    .text($('#' + winner).children('p').text() + ' won!');
  charBlink = setInterval(function() {
    $('#' + winner).children('p')
      .toggleClass('blink');
  }, 500);
}


function RanNum() {
  return Math.ceil(Math.random() * 6);
}
