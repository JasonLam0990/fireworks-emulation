$.fn.fireworks = function(options) {
        // 默认设置
        options = options || {};
        options.opacity = options.opacity || 1;
        options.width = options.width || $(this).width();
        options.height = options.height || $(this).height();

        var fireworksField = this,
            particles = [],
            rockets = [],
            MAX_PARTICLES = 400,
            SCREEN_WIDTH = options.width,
            SCREEN_HEIGHT = options.height;

        // 创建 canvas 并获取context
        var canvas = document.createElement('canvas');
        canvas.id = 'fireworksField';
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        canvas.style.width  = SCREEN_WIDTH + 'px';
        canvas.style.height = SCREEN_HEIGHT + 'px';
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.style.opacity = options.opacity;
        var context = canvas.getContext('2d');

        // 颗粒对象
        function Particle(pos) {
            this.pos = {
                x: pos ? pos.x : 0,
                y: pos ? pos.y : 0
            };
            // 速度
            this.vel = {
                x: 0,
                y: 0
            };
            this.shrink = 0.97;
            this.size = 2;
            // 阻力系数
            this.resistance = 1;
            this.gravity = 0;

            this.flick = true;

            this.alpha = 1;
            this.fade = 0;
        }

        // 更新粒子
        Particle.prototype.update = function() {
            // apply resistance
            this.vel.x *= this.resistance;
            this.vel.y *= this.resistance;

            // gravity down
            this.vel.y += this.gravity;

            // update position based on speed
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            // shrink
            this.size *= this.shrink;

            // fade out
            this.alpha -= this.fade;
        };

        // 生成粒子
        Particle.prototype.render = function(c) {

            c.save();

            c.globalCompositeOperation = 'lighter';

            var x = this.pos.x,
                y = this.pos.y,
                r = this.size / 2;

            // 变化率，渐变

            // console.log(y)
            // if(y<400){
            //     var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
            //     gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
            //     gradient.addColorStop(0.8, "hsla(" + 255 + ", 100%, 50%, " + this.alpha + ")");
            //     gradient.addColorStop(1, "hsla(" + 255+ ", 100%, 50%, 0.1)");
            // }else{
            //     var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
            //     gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
            //     gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
            //     gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
            // }

                var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
                gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
                gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
                gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

            c.fillStyle = gradient;

            c.beginPath();
            c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
            c.closePath();
            c.fill();

            c.restore();
        };

        // 粒子消失条件
        Particle.prototype.exists = function() {
            return this.alpha >= 0.1 && this.size >= 1;
        };


        // 光束对象
        function Rocket(x) {
            Particle.apply(this, [{
                x: x,
                y: SCREEN_HEIGHT}]);

            this.explosionColor = 0;
        }

        Rocket.prototype = new Particle();
        Rocket.prototype.constructor = Rocket;

        // 爆炸扩散
        Rocket.prototype.explode = function() {
            // 粒子个数
            // var count = 100;
            var count = Math.random() * 10 + 80;

            for (var i = 0; i < count; i++) {
                var particle = new Particle(this.pos);
                // 爆炸后粒子扩散角度
                var angle = Math.random() * Math.PI * 2;

                // 模拟爆炸效果
                var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

                // 粒子在x，y方向上的弹射速度
                particle.vel.x = Math.cos(angle) * speed;
                particle.vel.y = Math.sin(angle) * speed;

                // 粒子大小
                particle.size = 10;

                particle.gravity = 0.2;
                particle.resistance = 0.92;
                particle.shrink = Math.random() * 0.05 + 0.93;

                particle.flick = true;
                particle.color = this.explosionColor;

                particles.push(particle);
            }
        };

        Rocket.prototype.render = function(c) {
            if (!this.exists()) {
                return;
            }

            c.save();

            c.globalCompositeOperation = 'lighter';

            var x = this.pos.x,
                y = this.pos.y,
                r = this.size / 2;

            // if(y<)
            var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
            gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
            gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

            c.fillStyle = gradient;

            c.beginPath();
            c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
            c.closePath();
            c.fill();

            c.restore();
        };

        var loop = function() {
            // update screen size
            if (SCREEN_WIDTH != window.innerWidth) {
                canvas.width = SCREEN_WIDTH = window.innerWidth;
            }
            if (SCREEN_HEIGHT != window.innerHeight) {
                canvas.height = SCREEN_HEIGHT = window.innerHeight;
            }

            // 重绘画布（背景颜色）
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            var existingRockets = [];

            for (var i = 0; i < rockets.length; i++) {
                // update and render
                rockets[i].update();
                rockets[i].render(context);

                // calculate distance with Pythagoras
                var distance = Math.sqrt(Math.pow(SCREEN_WIDTH - rockets[i].pos.x, 2) + Math.pow(SCREEN_HEIGHT - rockets[i].pos.y, 2));

                // random chance of 1% if rockets is above the middle
                var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;

                /* Explosion rules
                     - 80% of screen
                    - going down
                    - close to the mouse
                    - 1% chance of random explosion
                */
                if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
                    rockets[i].explode();
                } else {
                    existingRockets.push(rockets[i]);
                }
            }

            rockets = existingRockets;

            var existingParticles = [];

            for (i = 0; i < particles.length; i++) {
                particles[i].update();

                // render and save particles that can be rendered
                if (particles[i].exists()) {
                    particles[i].render(context);
                    existingParticles.push(particles[i]);
                }
            }

            // update array with existing particles - old particles should be garbage collected
            particles = existingParticles;

            while (particles.length > MAX_PARTICLES) {
                particles.shift();
            }
        };

        var launchFrom = function(x,color) {
            if (rockets.length < 10) {
                var rocket = new Rocket(x);
                rocket.explosionColor = color;
                // 0红色
                // 50橘色
                // 100绿色
                // 210蓝色

                rocket.vel.y = Math.random() * -3 - 4;
                rocket.vel.x = Math.random() * 6 - 3;

                // rocket.vel.y = -5;
                // rocket.vel.x = 0;

                // 烟花花束的粗细
                rocket.size = 5;
                rocket.shrink = 0.999;
                rocket.gravity = 0.01;
                rockets.push(rocket);
            }
        };

        var launch = function(color) {
            launchFrom(SCREEN_WIDTH / 2,color);
        };

        // Append the canvas and start the loops
        $(fireworksField).append(canvas);

        let url = location.search; //获取url中"?"符后的字串
        console.log(url)
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            console.log(str)
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        let judgergb = function(color){
            // 0红色
            // 50橘色
            // 100绿色
            // 210蓝色
            let choosecolors = [0,50,100,210];

            let res = 0
            for (let i = 0;i<choosecolors.length;i++){
                if(color == 'red'){
                    res = 0;
                    break;
                }else if(color == 'orange'){
                    res = 50;
                    break;
                }else if(color == 'green'){
                    res = 100;
                    break;
                }else if(color == 'blue'){
                    res = 210;
                    break;
                }
            }
            return res
        }

        console.log(theRequest)

        let first,second,third,fourth;
        first = judgergb(theRequest.first);
        second = judgergb(theRequest.second);
        third = judgergb(theRequest.third);
        fourth = judgergb(theRequest.fourth);


        for (let i = 0;i<4;i++){
            setTimeout(function () {
                launch(first)
            },1000)
        }
        setTimeout(function () {
            for (let i = 0;i<4;i++){
                setTimeout(function () {
                    launch(second)
                },1000)
            }
            setTimeout(function () {
                for (let i = 0;i<4;i++){
                    setTimeout(function () {
                        launch(third)
                    },1000)
                }
                setTimeout(function () {
                    for (let i = 0;i<4;i++){
                        setTimeout(function () {
                            launch(fourth)
                        },1000)
                    }
                },2500)
            },2500)
        },2500)

        // 烟花射的速度
        setInterval(loop, 1000 / 50);

        return fireworksField;
};
