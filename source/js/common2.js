function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x_clientavator = 0;//�����̌��݈ʒu
  var y_clientavator = 0;//
  var x_clientavator_previous = 0;//�����̒��O�̈ʒu
  var y_clientavator_previous = 0;//

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
    x_clientavator_previous = x_clientavator;
    y_clientavator_previous = y_clientavator;
    x_clientavator = e.clientX - rect.left;
    y_clientavator = e.clientY - rect.top;

    draw();
  }

  function draw() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x_clientavator, y_clientavator, 10, 10);
    ctx2.beginPath();     // 1.Path�ŕ`����J�n����
    ctx2.moveTo(x_clientavator_previous, y_clientavator_previous); // 2.�`�悷��ʒu���w�肷��
    ctx2.lineTo(x_clientavator, y_clientavator); // 3.�w����W�܂Ő�������
    ctx2.stroke();        // 4.Canvas��ɕ`�悷��
    ctx2.drawImage(img, x_clientavator, y_clientavator);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();