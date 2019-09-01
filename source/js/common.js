(function() {
  //"use strict";

  //�����ݒ�
  var wrap = document.getElementById("wrap");//Div id=wrap�̗v�f���擾
  var cs = document.getElementById("e_click");//Canvas id=e_click�̗v�f���擾
  var ctx = cs.getContext("2d");  //Canvas��context���擾

  function sizing(){
    cs.width = wrap.offsetWidth;
    cs.height = wrap.offsetHeight;
  }
  sizing();

  ctx.fillStyle = "#28a6c2";//���������Ƃ��̐F

  var x_current = 0, y_current = 0;

  var img = new Image();
  //img.src = "js/mychar.png?" + new Date().getTime();
  img.src = "js/mychar.png";
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
    var x_sign = Math.sign(x_destination - x_orgin);//�������v�Z
    var y_sign = Math.sign(y_destination - y_orgin);//
    if(x_sign == 1){//�E�ֈړ��̏ꍇ
      if(x_current < x_destination)
        x_current += 5;
      else
        x_orign = x_current;
    }else if (x_sign == -1){//���ֈړ��̏ꍇ
      if(x_destination < x_current)
        x_current -= 5;
      else
        x_orign = x_current;
    }
    if(y_sign == 1){//���ֈړ��̏ꍇ
      if(y_current < y_destination)
        y_current += 5;
      else
        y_orign = y_current;
    }else if (y_sign == -1){//��ֈړ��̏ꍇ}
      if(y_destination < y_current)
        y_current -= 5;
      else
        y_orign = y_current;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(x_orgin, y_orgin, 10, 10);
    ctx.drawImage(img, x_current, y_current);
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

  var timeoutId ;

  window.addEventListener( "resize", function () {
    // ���T�C�Y���~����200ms��ɏI���Ƃ���
    clearTimeout( timeoutId ) ;
  
    timeoutId = setTimeout( function () {
      // �L�����o�X�T�C�Y��ύX
      sizing();
    }, 200 ) ;
  } ) ;
  
  cs.addEventListener('click', onClick, false);

})()
