

/***************************************
 * �}�E�X�A�N�V����
 ***************************************/

/*
 * �N���b�N�����Ƃ���ɋ�`��`�悷��
 */
function e_click() {
    var cs = document.getElementById('e_click');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;

    function onClick(e) {
        /*
         * rect��canvas�̐�΍��W�ʒu���擾���A
         * �N���b�N���W�ł���e.clientX,e.clientY���炻�̕�������
         * ���N���b�N���W��document����̈ʒu��Ԃ�����
         * ��rect�̓X�N���[���ʂɂ���Ēl���ς��̂ŁAonClick()���łǒ�`
         */
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(x, y, 10, 10);
    }

    cs.addEventListener('click', onClick, false);
}
e_click();



/*
 * �_�u���N���b�N�����Ƃ���ɋ�`��`�悷��
 */
function e_dbl_click() {
    var cs = document.getElementById('e_dbl_click');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;

    function onDblClick(e) {
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, false );
        ctx.fill();
    }

    cs.addEventListener('dblclick', onDblClick, false);
}
e_dbl_click();



/*
 * Canvas�ɑ΂��ă}�E�X�I�[�o�[�ƃA�E�g�����m����
 */
function m_over_out() {
    var cs = document.getElementById('e_m_over_out');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onMouseOver() {
        draw();
    }

    function onMouseOut() {
        ctx.clearRect(0, 0, w, h);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "26px 'HG��������-PRO'";
        ctx.fillText('Hello', 95, h / 2);
    }

    cs.addEventListener('mouseover', onMouseOver, false);
    cs.addEventListener('mouseout', onMouseOut, false);
}
m_over_out();



/*
 * �v�f�ɑ΂��ă}�E�X�I�[�o�[�ƃA�E�g�����m����
 * Canvas�͈ꖇ�G�Ȃ̂ŁA�v�f�ɑ΂��Ă̂ݐ�����s���ɂ͍H�v���K�v
 * �Ǔ����蔻������邩�A�ʓrCanvas�𐶐����邩...�Ȃ�
 * �����ł͂Ǔ����蔻������Ă݂�
 */
function m_over_out2() {
    var cs = document.getElementById('e_m_over_out2');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var targetFlag = false;
    var rect = null;

    function onMouseOver(e) {
        rect = e.target.getBoundingClientRect();
        cs.addEventListener('mousemove', onMouseMove, false);
    }
    function onMouseOut() {
        cs.removeEventListener('mousemove', onMouseMove, false);
    }
    /* �}�E�X�������x�ɗv�f��Ƀq�b�g���Ă��邩�ǂ������`�F�b�N */
    /* ���s����init�͊Ԉ��������܂��Ď��s���� */
    function onMouseMove(e) {
        moveActions.updateTargetFlag(e);
        if (targetFlag) {
            moveActions.throttle(moveActions.over, 50);
        } else {
            moveActions.throttle(moveActions.out, 50);
        }
    }

    /* mouseMove�Ŏ��s����֐� */
    var moveActions = {
        timer: null,
        /* targetFlag�̍X�V */
        updateTargetFlag: function(e) {
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var a = (x > w / 2 - 50);
            var b = (x < w / 2 + 50);
            var c = (y > h / 2 - 50);
            var d = (y < h / 2 + 50);

            targetFlag = (a && b && c && d);
        },
        /* �A���C�x���g�̊Ԉ��� */
        throttle: function(targetFunc, time) {
            var _time = time || 100;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                targetFunc();
            }, _time);
        },
        out: function() {
            drawRect();
        },
        over: function() {
            drawRectIsHover();
        }
    };

    function drawRect(color) {
        var _col = color || 'black';
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.fillStyle = _col;
        ctx.fillRect(w / 2 - 50, h / 2 - 50, 100, 100);
    }

    function drawRectIsHover() {
        drawRect('blue');
        ctx.font = "26px 'HG��������-PRO'";
        ctx.fillText('Hello', 95, 60);
    }

    cs.addEventListener('mouseover', onMouseOver, false);
    cs.addEventListener('mouseout', onMouseOut, false);

    drawRect();
}
m_over_out2();



/*
 * �}�E�X�̉������A�����������m����
 * down��click�̈Ⴂ�� down�͉��������Aclick�͗�������
 */
function m_up_down() {
    var cs = document.getElementById('e_m_up_down');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onMouseDown() {
        drawOn();
    }

    function onMouseUp() {
        drawOff();
    }

    function drawOn() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG��������-PRO'";
        ctx.fillText('�}�E�X��������Ă��܂�', 30, h / 2);
    }

    function drawOff() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG��������-PRO'";
        ctx.fillText('��������܂���', 60, h / 2);
    }

    cs.addEventListener('mousedown', onMouseDown, false);
    cs.addEventListener('mouseup', onMouseUp, false);

    drawOff();
}
m_up_down();



/*
 * �}�E�X�J�[�\���̓����ɒǏ]����
 */
function m_move() {
    var cs = document.getElementById('e_m_move');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;
    var timer;

    function onMouseMove(e) {
        draw(e);
    }

    function throttle(targetFunc, time) {
        var _time = time || 100;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            targetFunc();
        }, _time);
    }

    function draw(e) {
        throttle(function() {
            var rect = e.target.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            ctx.clearRect(0, 0, w, h);
            ctx.font = "18px 'HG��������-PRO'";
            ctx.fillText('����....����....', x, y);
        }, 100);
    }

    cs.addEventListener('mousemove', onMouseMove, false);
}
m_move();



/*
 * �}�E�X�z�C�[�������m����
 */
function m_wheel() {
    var cs = document.getElementById('e_m_wheel');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var count = 0;

    function onMouseWheel(e) {
        draw();
    }

    function draw() {
        count++;
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG��������-PRO'";
        ctx.fillText('�z�C�[�����񂳂ꂽ��: ' + count, 25, 130);
    }

    cs.addEventListener('mousewheel', onMouseWheel, false);
}
m_wheel();



/* 
 * �L�[�̉����ꂽ���������m����
 */
function k_up_down() {
    var cs = document.getElementById('e_k_up_down');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onKeyDown(e) {
        var str = '';
        switch (e.keyCode) {
            case 65:
                str = 'a';
                break;
            case 66:
                str = 'b';
                break;
            case 67:
                str = 'c';
                break;
            default:
                str = '�����L�[';
                break;
        }
        str += '��������܂���';
        draw(str);
    }

    function onKeyUp(e) {
        var str = '�L�[���痣��܂���';
        draw(str);
    }

    function draw(str) {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "20px sanserif";
        ctx.fillText(str, 10, 130);
    }

    cs.setAttribute('tabindex', 0); // focus���Ă��鎞�̂݁AkeyDown,up ��L����
    cs.addEventListener('keydown', onKeyDown, false);
    cs.addEventListener('keyup', onKeyUp, false);
}
k_up_down();


