function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x_destination = 0;//�����̌��݈ʒu
  var y_destination = 0;//
  var x_org = 0;//�����̒��O�̈ʒu
  var y_org = 0;//

  var img = new Image();
  img.src = "js/fuku.png?" + new Date().getTime();
  /* �摜���ǂݍ��܂��̂�҂��Ă��珈���𑱍s */
  img.onload = function() {
  }

  function onClick(e) {
    /*
     * rect��canvas�̐�΍��W�ʒu���擾���A
     * �N���b�N���W�ł���e.clientX,e.clientY���炻�̕�������
     * ���N���b�N���W��document����̈ʒu��Ԃ�����
     * ��rect�̓X�N���[���ʂɂ���Ēl���ς��̂ŁAonClick()���łǒ�`
     */
    var rect = e.target.getBoundingClientRect();
    x_org = x_destination;
    y_org = y_destination;
    x_destination = e.clientX - rect.left;
    y_destination = e.clientY - rect.top;

    draw();
  }

  function draw() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x_org, y_org, 10, 10);
    ctx2.beginPath();     // 1.Path�ŕ`����J�n����
    ctx2.moveTo(x_org, y_org); // 2.�`�悷��ʒu���w�肷��
    ctx2.lineTo(x_destination, y_destination); // 3.�w����W�܂Ő�������
    ctx2.stroke();        // 4.Canvas��ɕ`�悷��
    ctx2.drawImage(img, x_destination, y_destination);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();
/*
(function() {
  "use strict";

  //�����ݒ�
  var canvas = document.getElementById("e_click"), //Canvas�̗v�f���擾
      ctx = canvas.getContext("2d"), //Canvas��context���擾
      cx = -30,
      cy = canvas.height / 2;

  ctx.beginPath();
  ctx.arc(cx, cy, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#28a6c2";
  ctx.fill();
  ctx.closePath();

  move();

  function move() {
    cx += 2;
    if(cx > canvas.width + 30)
     cx = -30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(move);
  }

})()
*/