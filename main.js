// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Fake (testing purposes only) credit card numbers from all major brand
const fake = [
              // VISA
              '4716883922028721',
              '4532523807246749', 
              '4024007195863007305',
              // Discover 
              '6011433819624450', 
              '6011929275323040', 
              '6011630897297945535',
              // Diners Club - Carte Blanche 
              '30543982813779',
              '30516197725889', 
              '30358021512245', 
              // Visa Electron
              '4175008617330380', 
              '4026669060219924', 
              '4913211493739271',
              // MasterCard 
              '5284377655654752', 
              '5179927599979547', 
              '2720996077838930',
              // JCB 
              '3533379090841873', 
              '3589727656878007', 
              '3531175880334803017',
              // Diners Club - International 
              '36611132712219', 
              '36487442877285', 
              '36393762451042', 
              // InstaPayment
              '6375198379877737', 
              '6370835067885358', 
              '6392468281528762',
              // American Express (AMEX) 
              '376856161531521', 
              '378791416756896', 
              '372773345341541', 
              // Diners Club - North America
              '5489864120651144', 
              '5453713015908022', 
              '5516516416743152', 
              // Maestro
              '5893359886837888', 
              '5020103688456828', 
              '6304093812877624'];

// Convert string to int
function strToArr(string) {
    let array = [];
    for(let i=0; i<string.length; i++) {
        array.push(parseInt(string[i], 10));
    }
    return array;
}

// Convert int to string
function arrToStr(array) {
    let string = '';
    for(let i=0; i<array.length; i++) {
        string += array[i].toString();
    }
    return string;
}

// Luhn's Algorithm
function Luhn(number) {
    let newNumber = strToArr(number);
    let sum = 0;
    for(let i=newNumber.length-1; i>=0; i--) {
        let position = newNumber.length-1-i;
        let digit = (position%2 === 0) ? newNumber[i] : 2*newNumber[i];
        if(digit > 9) {
            digit -= 9;
        } 
        sum += digit;
    }
    if(sum%10 === 0) {
        return true;
    } else {
        return false;
    }
}

// Validate a credit card number
function validateCard(number) {
    let newNumber = strToArr(number);
    const index = fake.indexOf(string);
    if(index !== -1) {
        return false;
    } else {
        if(!Luhn(newNumber)) {
            return false;
        }
    }
    return true;
}

// Change the last digit of the credit card number in order to make it valid according to Luhn's formula
function validNumberSuggestion(number) {
    let newNumber = strToArr(number);
    if(!Luhn(newNumber)) {
        let sum = 0;
        for(let i=newNumber.length-2; i>=0; i--) {
            let position = newNumber.length-1-i;
            let digit = (position%2 === 0) ? newNumber[i] : 2*newNumber[i];
            if(digit > 9) {
                digit -= 9;
            } 
            sum += digit;
        }
        sum %= 10;
        if(sum === 0) {
            sum = 10;
        }
        newNumber[newNumber.length-1] = 10-sum;
    }
    return newNumber;
}
console.log(validNumberSuggestion(invalid2));

// AUXILIARY

// Building an array with all the given credit card numbers that do not respect Luhn's formula
function findInvalidCards(array) {
    let newArray = [];
    for(number of array) {
        if(!Luhn(number)) {
            newArray.push(number);
        }
    }
    return newArray;
}

const invalidCards = findInvalidCards(batch);

// Building an array with all the companies whose credit card numbers are invalid
function idInvalidCardCompanies(array) {
    let newArray = [];
    for(number of array) {
        if(number[0] === 3) {
            const index = newArray.indexOf('Amex (American Express)');
            if(index === -1) {
                newArray.push('Amex (American Express)');
            }
        } else if(number[0] === 4) {
            const index = newArray.indexOf('Visa');
            if(index === -1) {
                newArray.push('Visa');
            }
        } else if(number[0] === 5) {
            const index = newArray.indexOf('Mastercard');
            if(index === -1) {
                newArray.push('Mastercard');
            }
        } else if(number[0] === 6) {
            const index = newArray.indexOf('Discover');
            if(index === -1) {
                newArray.push('Discover');
            }
        } else {
            console.log('Company not found');
        }
    }
    return newArray; 
}
const invalidCardCompanies = idInvalidCardCompanies(invalidCards);








