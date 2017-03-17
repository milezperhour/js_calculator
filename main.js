var global_array_variable=[];
var storage_object;
var index=0;

$(document).ready(function(){
    draggableCalc();
    applyClickHandler();
});

function draggableCalc(){
    $('.calculatorBody').draggable();
}

function applyClickHandler() {
    $("button").click(function () {
        var val = $(this).text(); //button_clicked is the value
        $('.display').append(val);
        //type = $(this).attr('class');
        //storage_object = {type: type, value: val}; //stores type & value of button clicked
    });

    $('.number').click(function () {
        numberPressed(this);
    });
    $('.operator').click(function () {
        operatorPressed(this);
    });
    $('.decimal').click(function () {
        decimalPressed(this);
    });
    $('.equal').click(function () {
        equalPressed(this);
    });
    $('.clearButton').click(function () {
        clearPressed(this);
    });
    $('.clearEntryButton').click(function () {
        clearEntryPressed(this);
    });
}

function numberPressed(buttonPressed){
    console.log( "number was clicked" );
    var val = $(buttonPressed).text(); //button_clicked is the value

    var type = $(buttonPressed).attr('class');
    console.log(storage_object);
    console.log("global array: ", global_array_variable);


    if (global_array_variable.length === 0){
        storage_object ={type: type, value: val}; //stores type & value of button clicked
        global_array_variable.push(storage_object);

    } else if(global_array_variable[index].hasOwnProperty('type')){
        global_array_variable[index].value += val;
        console.log('object length ', storage_object.value.length);
        if (storage_object.value.length > 10){
            console.log('object after legth of 10 ', storage_object.value.length);
            $('.display').text(storage_object.value.slice(0, 10));
        }

    } else{
        global_array_variable[index].value += val;
        global_array_variable[index].type = 'number';
        console.log('object length ', storage_object.value.length);
        if (storage_object.value.length > 10){
            console.log('object after legth of 10 ', storage_object.value.length);
            $('.display').text(storage_object.value.slice(0, 10));
        }
    }

}

function operatorPressed(buttonPressed){
    index++;
    console.log( "operator was clicked" );
    var val = $(buttonPressed).text(); //button_clicked is the value
    //$('.display').append(val);

    var type = $(buttonPressed).attr('class');
    console.log("storage_object: ",storage_object);
    console.log("global_array_variable:" , global_array_variable);
    console.log("global_array_variable length: ", global_array_variable.length);
    if (global_array_variable.length > 0) {
        storage_object ={type: type, value: val}; //stores type & value of button clicked (put break point at 72)

        if(global_array_variable.length > 2) {
            if (global_array_variable[index - 2].type === "operator") {
                index = index -2;
            }
        }
        global_array_variable[index] = storage_object;
        index++;

        global_array_variable[index] = {value: ''};
        $('.decimal').removeAttr('disabled');

        console.log("global_array_variable[0]: ", global_array_variable[0]);
        console.log("global_array_variable[1]: ", global_array_variable[1]);
        console.log("global_array_variable[2]: ", global_array_variable[2]);
        console.log("global_array_variable: ", global_array_variable);
        console.log("global_array_variable length: ", global_array_variable.length);
    }
}

function decimalPressed(buttonPressed){
    console.log( "clear entry was clicked" );
    var val = $(buttonPressed).text(); //button_clicked is the value
    //$('.display').text(val);

    var type = $(buttonPressed).attr('class');
    var storage_object ={type: type, value: val}; //stores type & value of button clicked
    console.log("storage_object: " ,storage_object);

    if (global_array_variable.length === 0 ) {
        global_array_variable.push(storage_object);
    } else if(global_array_variable[index].value.indexOf('.') === -1){
        global_array_variable[index].value += val;
        $('.decimal').attr('disabled',true);
    }
}

function equalPressed(buttonPressed){
    console.log( "equal was clicked" );
    val = $(buttonPressed).text(); //button_clicked is the value
    //$('.display').append(val);

    type = $(buttonPressed).attr('class');
    //storage_object ={type: type, value: val}; //stores type & value of button clicked
    console.log(storage_object);

    if (global_array_variable.length >=3) {
        while (global_array_variable.length >= 3) {
            var result = doMath(global_array_variable[0].value, global_array_variable[1].value, global_array_variable[2].value);
            global_array_variable[0].value = result; //store the result to index[0]
            if (global_array_variable[2].value != 0) {
                result = Math.round(result * 10000000000) / 10000000000; //rounds to contain decimals in display
                $('.display').text(result);
            }
            global_array_variable.splice(1, 2);
            index=0;
            // if (global_array_variable.length === 1){
            //     index=1;
            // }
            console.log("global_array_variable: ", global_array_variable);
        }
    }
}

function clearPressed(buttonPressed){
    val = $(buttonPressed).text(); //button_clicked is the value
    global_array_variable.splice(0, 2);
    index=0;
    $('.display').text('');
}

function clearEntryPressed(buttonPressed){
    console.log( "clear entry was clicked" );
    val = $(buttonPressed).text(); //button_clicked is the value
    $('.display').text('');
    if (index===0){
        global_array_variable.splice(0, 3);
        $('.display').text('');
        index=0;
        console.log(global_array_variable);
    }
    else if(index===1){
        global_array_variable.splice(1, 1);
        $('.display').text(global_array_variable[0].value);
        index=1;
        console.log(global_array_variable);
    }
    else if(index===2){
        global_array_variable.splice(2, 1);
        console.log("global_array_variable: ",global_array_variable );
        $('.display').text(global_array_variable[0].value + global_array_variable[1].value);
        index=2;
        console.log(global_array_variable);
    }
}

function doMath(num1, op, num2){
    if (op === '+'){
        num1 = parseInt(num1, 12);
        num2 = parseInt(num2, 12);
        return num1 + num2;
    }
    else if(op === '-'){
        return num1 - num2;
    }
    else if(op === '*'){
        return num1 * num2;
    }
    else if(op === '/'){
        if (num2 == 0){
            $('.display').text('Error');
        } else{
            return num1 / num2;
        }
    }
}