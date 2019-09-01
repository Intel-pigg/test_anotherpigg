function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x_destination = 0;//�N���b�N���W�����L�����̖ړI�n
  var y_destination = 0;//
  var x_orgin = 0;//���L�����̒��O�̈ʒu
  var y_orgin = 0;//

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
    x_orgin = x_destination;
    y_orgin = y_destination;
    x_destination = e.clientX - rect.left;
    y_destination = e.clientY - rect.top;

    draw();
  }

  function draw() {
    //ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x_orgin, y_orgin, 10, 10);
    ctx2.beginPath();     // 1.Path�ŕ`����J�n����
    ctx2.moveTo(x_orgin, y_orgin); // 2.�`�悷��ʒu���w�肷��
    ctx2.lineTo(x_destination, y_destination); // 3.�w����W�܂Ő�������
    ctx2.stroke();        // 4.Canvas��ɕ`�悷��
    ctx2.drawImage(img, x_destination, y_destination);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();

(function() {
  //"use strict";

  //�����ݒ�
  var cs = document.getElementById("e_click");//Canvas�̗v�f���擾
  var ctx = cs.getContext("2d");  //Canvas��context���擾
  ctx.fillStyle = "#28a6c2";

  var cx = 0, cy = 0;

  var img = new Image();
  img.src = "js/mychar.png?" + new Date().getTime();
  /* �摜���ǂݍ��܂��̂�҂��Ă��珈���𑱍s */
  img.onload = function() {
  }

  var w = cs.width;
  var h = cs.height;
  var x_destination = 0;//�N���b�N���W�����L�����̖ړI�n
  var y_destination = 0;//
  var x_orgin = 0;//���L�����̒��O�̈ʒu
  var y_orgin = 0;//

  move();

  function move() {
    
    if(cx < x_destination)
       cx += (2*Math.sign(x_destination - x_orgin));
    else
      x_orign = cx;
    if(cy < y_destination)
       cy += (2*Math.sign(y_destination - y_orgin));
    else
      y_orign = cy;

    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(x_orgin, y_orgin, 10, 10);
    ctx.drawImage(img, cx, cy);
    window.requestAnimationFrame(move);
  }

  function onClick(e) {
    /*
     * rect��canvas�̐�΍��W�ʒu���擾���A
     * �N���b�N���W�ł���e.clientX,e.clientY���炻�̕�������
     * ���N���b�N���W��document����̈ʒu��Ԃ�����
     * ��rect�̓X�N���[���ʂɂ���Ēl���ς��̂ŁAonClick()���łǒ�`
     */
    var rect = e.target.getBoundingClientRect();
    x_orgin = x_destination;
    y_orgin = y_destination;
    x_destination = e.clientX - rect.left;
    y_destination = e.clientY - rect.top;
  }

  cs.addEventListener('click', onClick, false);

})()
