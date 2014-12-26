'use strict';

app.directive('barcodeGenerator', [function() {
    var Barcode	= (function () {
        var barcode	= {
            settings: {
                barWidth:		1,
                barHeight:		50,
                addQuietZone:	true
            },
            intval: function(val) {
                var type = typeof(val);
                if ( type === 'string' ) {
                    val = val.replace(/[^0-9-.]/g, '');
                    val = parseInt(val * 1, 10);
                    return isNaN(val) || !isFinite(val)? 0: val;
                }
                return type === 'number' && isFinite(val)? Math.floor(val): 0;
            },
            code128: {
                encoding:[
                    '11011001100', '11001101100', '11001100110', '10010011000',
                    '10010001100', '10001001100', '10011001000', '10011000100',
                    '10001100100', '11001001000', '11001000100', '11000100100',
                    '10110011100', '10011011100', '10011001110', '10111001100',
                    '10011101100', '10011100110', '11001110010', '11001011100',
                    '11001001110', '11011100100', '11001110100', '11101101110',
                    '11101001100', '11100101100', '11100100110', '11101100100',
                    '11100110100', '11100110010', '11011011000', '11011000110',
                    '11000110110', '10100011000', '10001011000', '10001000110',
                    '10110001000', '10001101000', '10001100010', '11010001000',
                    '11000101000', '11000100010', '10110111000', '10110001110',
                    '10001101110', '10111011000', '10111000110', '10001110110',
                    '11101110110', '11010001110', '11000101110', '11011101000',
                    '11011100010', '11011101110', '11101011000', '11101000110',
                    '11100010110', '11101101000', '11101100010', '11100011010',
                    '11101111010', '11001000010', '11110001010', '10100110000',
                    '10100001100', '10010110000', '10010000110', '10000101100',
                    '10000100110', '10110010000', '10110000100', '10011010000',
                    '10011000010', '10000110100', '10000110010', '11000010010',
                    '11001010000', '11110111010', '11000010100', '10001111010',
                    '10100111100', '10010111100', '10010011110', '10111100100',
                    '10011110100', '10011110010', '11110100100', '11110010100',
                    '11110010010', '11011011110', '11011110110', '11110110110',
                    '10101111000', '10100011110', '10001011110', '10111101000',
                    '10111100010', '11110101000', '11110100010', '10111011110',
                    '10111101110', '11101011110', '11110101110', '11010000100',
                    '11010010000', '11010011100', '11000111010'
                ],
                getDigit: function(code) {
                    var tableB	= ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
                        result	= '',
                        sum		= 0,
                        isum	= 0,
                        i		= 0,
                        j		= 0,
                        value	= 0;

                    // check each characters
                    for(i=0; i<code.length; i++){
                        if (tableB.indexOf(code.charAt(i)) === -1){
                            return('');
                        }
                    }

                    // check firsts characters : start with C table only if enough numeric
                    var tableCActivated = code.length > 1;
                    var c = '';

                    for (i=0; i<3 && i<code.length; i++) {
                        c = code.charAt(i);
                        /* jslint bitwise: true */
                        tableCActivated &= c >= '0' && c <= '9';
                        /* jslint bitwise: false */

                    }
                    sum	= tableCActivated ? 105 : 104;

                    // start : [105] : C table or [104] : B table
                    result = this.encoding[ sum ];

                    i = 0;
                    while ( i < code.length ) {
                        if ( !tableCActivated) {
                            j = 0;
                            // check next character to activate C table
                            while ( (i + j < code.length) && (code.charAt(i+j) >= '0') && (code.charAt(i+j) <= '9') ) {
                                j++;
                            }

                            // 6 min everywhere or 4 mini at the end
                            tableCActivated = (j > 5) || ((i + j - 1 === code.length) && (j > 3));

                            if ( tableCActivated ){
                                // C table
                                result += this.encoding[99];
                                sum += ++isum * 99;
                            } // 2 min for table C so need table B
                        } else if ( (i === code.length) || (code.charAt(i) < '0') || (code.charAt(i) > '9') || (code.charAt(i+1) < '0') || (code.charAt(i+1) > '9') ) {
                            tableCActivated = false;
                            // B table
                            result += this.encoding[ 100 ];
                            sum += ++isum * 100;
                        }

                        if ( tableCActivated ) {
                            // Add two characters (numeric)
                            value = barcode.intval(code.charAt(i) + code.charAt(i+1));
                            i += 2;
                        } else {
                            // Add one character
                            value = tableB.indexOf( code.charAt(i) );
                            i += 1;
                        }
                        result	+= this.encoding[ value ];
                        sum += ++isum * value;
                    }

                    // Add CRC
                    result += this.encoding[sum % 103];
                    // Stop
                    result += this.encoding[106];
                    // Termination bar
                    result += '11';

                    return result;
                }
            },
            // Convert the bit string to an array of bit chars
            bitStringTo2DArray: function( digit) {
                var d = [];
                d[0] = [];

                for ( var i=0; i<digit.length; i++) {
                    d[0][i] = digit.charAt(i);
                }

                return(d);
            },
            // Canvas barcode renderer
            digitToCanvasRenderer: function( $container, settings, digit, hri, mw, mh) {
                var lines = digit.length,
                    columns = digit[0].length,
                    len, current,
                    canvas = document.createElement('canvas'),
                    currentWidth = 0,
                    ctx = canvas.getContext('2d');
                    canvas.setAttribute('width', digit[0].length*mw);

                    var style = 'width: 400px; background: #fff;';
                    canvas.setAttribute('style', style);

                canvas.className = 'barcode code128 clearfix-child';

                for (var x=0; x<lines; x++) {
                    len = 0;
                    current = digit[x][0];

                    for (var y=0; y<columns; y++){
                        if ( current === digit[x][y] ) {
                            len++;
                        } else {

                            if(current!=='0') {
                                ctx.beginPath();
                                ctx.fillStyle = '#000';
                                ctx.fillRect(currentWidth, 0, len*mw, mh);
                            }
                            currentWidth+=len*mw;
                            current = digit[x][y];
                            len=1;
                        }
                    }
                    if ( len > 0) {
                            if(current!=='0') {
                                ctx.beginPath();
                                ctx.fillStyle = '#000';
                                ctx.fillRect(currentWidth, 0, len*mw, mh);
                            }
                            currentWidth+=len*mw;
                    }
                }
                ctx.closePath();

                return canvas;
            },
            // Canvas 1D barcode renderer
            digitToCanvas: function($container, settings, digit, hri) {
                var w = barcode.intval(settings.barWidth);
                var h = barcode.intval(settings.barHeight);

                return this.digitToCanvasRenderer($container, settings, this.bitStringTo2DArray(digit), hri, w, h);
            }
        };

        var generate	= function(datas, settings) {
            var digit	= '',
                hri		= '',
                code	= '',
                crc		= true,
                rect	= false,
                b2d		= false;

            if ( typeof(datas) === 'string') {
                code = datas;
            } else if (typeof(datas) === 'object') {
                code	= typeof(datas.code) === 'string' ? datas.code : '';
                crc		= typeof(datas.crc) !== 'undefined' ? datas.crc : true;
                rect	= typeof(datas.rect) !== 'undefined' ? datas.rect : false;
            }

            if (code === '') {
                return(false);
            }

            if (typeof(settings) === 'undefined') {
                settings = [];
            }

            for( var name in barcode.settings) {
                if ( settings[name] === undefined) {
                    settings[name] = barcode.settings[name];
                }
            }

            digit = barcode.code128.getDigit(code);
            hri = code;


            if ( digit.length === 0) {
                return this;
            }

            if ( !b2d && settings.addQuietZone) {
                digit = '0000000000' + digit + '0000000000';
            }

            var fname = 'digitToCanvas' + (b2d ? '2D' : '');

            return barcode[fname](this, settings, digit, hri);
        };

        return generate;
    }());

    var IDCard = (function() {

        var generate = function(barcode,user) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

                canvas.setAttribute('width', barcode.width+50);
                var style = 'width: 350px; background: transparent; height: 100%';
                canvas.setAttribute('style', style);
                canvas.setAttribute('height', 200);

                // Background
                var backgroundGradient = ctx.createLinearGradient(0, 0, 0, 80);
                backgroundGradient.addColorStop(0, '#06f');
                backgroundGradient.addColorStop(1, '#fff');
                ctx.fillStyle = backgroundGradient;

                // Rounded corners
                var cornerRadius = 4;
                ctx.lineJoin = 'round';
                ctx.lineWidth = cornerRadius;

                ctx.strokeStyle = '#06f';
                ctx.strokeRect(0+(cornerRadius/2), 0+(cornerRadius/2), 330-cornerRadius, 200-cornerRadius);
                ctx.fillRect(0+(cornerRadius/2), 0+(cornerRadius/2), 330-cornerRadius, 200-cornerRadius);


                // Logo
                var img = new Image();      // First create the image...
                img.src = '../../dist/images/logo-new-white.png';
                img.onload = function(){    // ...then set the onload handler...
                    ctx.drawImage(this, 65, 15, 200, 50);

                    // The canvas is changed => we should change the download url
                    angular.element(document.querySelector('.canvas-wrapper')).attr('href', canvas.toDataURL());
                    angular.element(document.querySelector('.canvas-image')).attr('src', canvas.toDataURL());
                };

                // The barcode
                ctx.beginPath();
                ctx.drawImage(barcode, 25, 75);


                // User id
                ctx.beginPath();
                ctx.textAlign = 'center';
                ctx.fillStyle = '#333';
                ctx.font = '15px Arial';
                ctx.fillText('ID: ' + user.id, 160, 140);

                // First and Last name
                ctx.beginPath();
                ctx.fillStyle = '#06f';
                ctx.font = '25px Arial';
                var name = user.firstName + ' ' + user.lastName;
                ctx.fillText(name, 160, 175);

                return canvas;

        };

        return generate;
    }());


    return {
        link: function(scope, element, attrs) {
            attrs.$observe('barcodeGenerator', function(userString){

                var user = JSON.parse(userString);

                // make ajax call to get image data url
                var request = new XMLHttpRequest();
                request.open('GET', '../../dist/images/logo-new-white.png', true);
                request.onreadystatechange = function() {
                // Makes sure the document is ready to parse.
                    if(request.readyState === 4) {
                        // Makes sure it's found the file.
                        if(request.status === 200) {

                            var barcode = new Barcode(user.id,{barWidth:2}),
                                card = new IDCard(barcode, user),
                                codeWrapper = angular.element('<a class="canvas-wrapper" href="' + card.toDataURL() + '" download="' + user.username + '-sCOOLbry-IDCard"></a>'),
                                canvasToImage = document.createElement('img');

                            canvasToImage.setAttribute('src', card.toDataURL());
                            canvasToImage.setAttribute('class', 'canvas-image');

                            card.appendChild(canvasToImage);
                            codeWrapper.append(card);
                            angular.element(element).html('').append(codeWrapper);
                        }
                    }
                };
                request.send(null);



            });
        }
    };
}]);