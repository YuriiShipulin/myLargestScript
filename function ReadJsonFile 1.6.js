let hashRate = 0,
    powerCost = 0,
    quantity = 0,
    asicType = 0,
    currentBitmain = 0,
    bitmainS17 = {
        hash: 50,
        watt: 2250
    },
    wattumS17 = {
        0: {
            hash: 57,
            watt: 2170
        },
        1: {
            hash: 60,
            watt: 2480
        },
        2: {
            hash: 66,
            watt: 2750
        },
        3: {
            hash: 72,
            watt: 3100,
            default: 1
        },
        4: {
            hash: 75,
            watt: 3250
        }
    },
    bitmainS17plus = {
        hash: 67,
        watt: 2680
    },
    wattumS17plus = {
        0: {
            hash: 76,
            watt: 2890
        },
        1: {
            hash: 79,
            watt: 3100
        },
        2: {
            hash: 82,
            watt: 3250,
            default: 1
        },
        3: {
            hash: 86,
            watt: 3500
        },
        4: {
            hash: 90,
            watt: 3950
        }
    },
    bitmainT17 = {
        hash: 40,
        watt: 2200
    },
    wattumT17 = {
        0: {
            hash: 44,
            watt: 2200
        },
        1: {
            hash: 48,
            watt: 2470
        },
        2: {
            hash: 50,
            watt: 2600
        },
        3: {
            hash: 53,
            watt: 3000,
            default: 1
        },
        4: {
            hash: 56,
            watt: 3430
        },
    },
    bitmainT17plus = {
        hash: 55,
        watt: 2750
    },
    wattumT17plus = {
        0: {
            hash: 59,
            watt: 2600
        },
        1: {
            hash: 62,
            watt: 2750
        },
        2: {
            hash: 67,
            watt: 3100
        },
        3: {
            hash: 70,
            watt: 3400,
            default: 1
        },
        4: {
            hash: 73,
            watt: 3600
        }
    },
    bitmainT17e = {
        hash: 53,
        watt: 2900
    },
    wattumT17e = {
        2: {
            hash: 53.5,
            watt: 2900
        },
        3: {
            hash: 58,
            watt: 3300
        },
        4: {
            hash: 62.5,
            watt: 3700
        }
    },
    bitmainS17e = {
        hash: 56,
        watt: 2520
    },
    wattumS17e = {
        3: {
            hash: 62,
            watt: 2850
        },
        4: {
            hash: 73.5,
            watt: 3500
        }
    };
let hashRateSelect = document.getElementById('WattumHashRate');
quantity = document.getElementById('WattumQuantity');
powerCost = document.getElementById('WattumPowerCost');

hashRateSelect.addEventListener('change', SetDataWithBoth);
quantity.addEventListener('change', SetDataWithBoth);
powerCost.addEventListener('change', SetDataWithBoth);
quantity.addEventListener('keydown', SetDataWithBoth);
powerCost.addEventListener('keydown', SetDataWithBoth);

function WatchAsicParams(params) {
    hashRateSelect.options.length = 0
    for (let x in params) {
        /* console.log(x + 'hash: ' + params[x].hash + '| watt: ' + params[x].watt); */
        let option = document.createElement("option");
        option.value = params[x].hash + ';' + params[x].watt;
        option.text = params[x].hash + 'TH/s';
        !!params[x].default ? option.selected = true : 0;
        hashRateSelect.add(option);
    }
}
document.querySelectorAll('.firmware-calc-form__radio input').forEach(function (element) {
    element.addEventListener('click', SetAllToZero);
    element.addEventListener('change', GetAsicType);
});

function SetAllToZero() {
    SetWattumRevenue(0);
    SetWattumProfit(0);
    SetWattumHash(0);
    SetWattumPower(0);
    SetWattumJayTH(0);
    SetWattumFee(0);
    SetWattumElectricCost(0);
    SetBitmainRevenue(0);
    SetBitmainProfit(0);
    SetBitmainHash(0);
    SetBitmainPower(0);
    SetBitmainJayTH(0);
    SetBitmainElectricCost(0);
}

function GetAsicType() {
    let asicCollection = document.querySelectorAll('.firmware-calc-form__radio input');
    asicCollection.forEach(function (element) {
        if (element.checked) {
            asicType = element.nextElementSibling.children[1].innerText;
            switch (true) {
                case asicType.toLowerCase().includes('s17pro'):
                    /* console.log('17spro'); */
                    WatchAsicParams(wattumS17);
                    currentBitmain = bitmainS17;
                    break;
                case asicType.toLowerCase().includes('s17+'):
                    /* console.log('17s+'); */
                    WatchAsicParams(wattumS17plus);
                    currentBitmain = bitmainS17plus;
                    break;
                case asicType.toLowerCase().includes('t17+'):
                    /* console.log('17t+'); */
                    WatchAsicParams(wattumT17plus);
                    currentBitmain = bitmainT17plus;
                    break;
                case asicType.toLowerCase().includes('s17e'):
                    /* console.log('17se'); */
                    WatchAsicParams(wattumS17e);
                    currentBitmain = bitmainS17e;
                    break;
                case asicType.toLowerCase().includes('t17e'):
                    /* console.log('17te'); */
                    WatchAsicParams(wattumT17e);
                    currentBitmain = bitmainT17e;
                    break;
                case asicType.toLowerCase().includes('t17'):
                    /* console.log('17t'); */
                    WatchAsicParams(wattumT17);
                    currentBitmain = bitmainT17;
                    break;
            }
        }
    });
    SetDataWithBoth();
}
GetAsicType();

function GetQuantity() {
    quantity = document.getElementById('WattumQuantity');
    /* console.log('quantity: ' + quantity.value); */
    return parseFloat(quantity.value, 10);
}

function GetPowerCost() {
    powerCost = document.getElementById('WattumPowerCost');
    /* console.log('powerCost: ' + powerCost.value); */
    return parseFloat(powerCost.value, 10);
}

function GetWattumHashRate() {
    hashRate = document.getElementById('WattumHashRate');
    /* console.log('hashRate: ' + hashRate.value); */
    return parseFloat(hashRate.value.split(';')[0], 10);
}

function GetWattumPower() {
    hashRate = document.getElementById('WattumHashRate');
    /* console.log('hashRate: ' + hashRate.value); */
    return parseFloat(hashRate.value.split(';')[1], 10);
}

function SetWattumHash(value) {
    let tempVar = document.getElementById('WattumHash');
    tempVar.innerText = value + 'TH/s';
}

function SetWattumPower(value) {
    let tempVar = document.getElementById('WattumPower');
    tempVar.innerText = value + 'W';
}

function SetWattumRevenue(value) {
    let tempVar = document.getElementById('WattumRevenue'),
        tempValue = value - (value % 1);
    tempVar.innerText = GetQuantity() > 0 ? ('$' + (GetQuantity() * tempValue).toLocaleString('en-EN')) : ('$' + tempValue.toLocaleString('en-EN'));
}

function SetWattumProfit(value) {
    let tempVar = document.getElementById('WattumProfit'),
        tempValue = value - (value % 1);
    /* tempVar.innerText = GetQuantity() > 0 ? ('$' + ((GetQuantity() * tempValue) - (GetQuantity() * tempValue * 0.028)).toLocaleString('en-EN')) : ('$' + (tempValue - tempValue * 0.028).toLocaleString('en-EN')); */
    tempVar.innerText = '$' + tempValue.toLocaleString('en-EN');

}

function SetWattumMoreProfit(value) {
    let tempVar = document.getElementById('WattumMoreProfit'),
        tempValue = value - (value % 1);
    function SetColor(color) {
        tempVar.style.color = color;
    }
    if(tempValue > 0 && tempValue.toLocaleString('en-EN') !== 'NaN') {
        tempVar.innerText = '(+%' + tempValue.toLocaleString('en-EN') + ')';
        SetColor('green');
        tempVar.style.display = 'inline';
        return 0;
    } if(tempValue < 0 && tempValue.toLocaleString('en-EN') !== 'NaN') {
        /* tempVar.innerText = '%' + (tempValue.toLocaleString('en-EN') * (-1)) + ' less '; */
        tempVar.style.display = 'none';
        return 0;
        /* return SetColor('red'); */
    } else {
        /* tempVar.innerText = '%' + 0; */
        tempVar.style.display = 'none';
    }
}

function SetWattumFee(value) {
    let tempVar = document.getElementById('WattumFee'),
        tempValue = value - (value % 1);
    tempVar.innerText = '-$' + tempValue.toLocaleString('en-EN');
}

function SetWattumElectricCost(value) {
    let tempVar = document.getElementById('WattumElectricCost'),
        tempValue = value - (value % 1)
    tempVar.innerText = '-$' + tempValue.toLocaleString('en-EN');
}

function SetBitmainElectricCost(value) {
    let tempVar = document.getElementById('BitmainElectricCost'),
        tempValue = value - (value % 1)
    tempVar.innerText = '-$' + tempValue.toLocaleString('en-EN');
}

function SetBitmainHash(value) {
    let tempVar = document.getElementById('BitmainHash');
    tempVar.innerText = value + 'TH/s';
}

function SetBitmainPower(value) {
    let tempVar = document.getElementById('BitmainPower');
    tempVar.innerText = value + 'W';
}

function SetBitmainRevenue(value) {
    let tempVar = document.getElementById('BitmainRevenue'),
        tempValue = value - (value % 1);
    tempVar.innerText = GetQuantity() > 0 ? ('$' + (GetQuantity() * tempValue).toLocaleString('en-EN')) : ('$' + tempValue.toLocaleString('en-EN'));
}

function SetBitmainProfit(value) {
    let tempVar = document.getElementById('BitmainProfit'),
        tempValue = value - (value % 1);
    tempVar.innerText = '$' + tempValue.toLocaleString('en-EN');
}

function SetWattumJayTH(value) {
    let tempVar = document.getElementById('WattumJayTH'),
        tempValue = value - (value % 1);
    tempVar.innerText = '- ' + tempValue + 'J\\TH';
}
function SetBitmainJayTH(value) {
    let tempVar = document.getElementById('BitmainJayTH'),
        tempValue = value - (value % 1);
    tempVar.innerText = '- ' + tempValue + 'J\\TH';
}

function ReadJsonBothFiles(firstFile, secondFile, callback) {
    let firstrawFile = new XMLHttpRequest();
    firstrawFile.open("POST", '/wp-content/themes/wattumbasic-child/get_file.php', true);
    firstrawFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    firstrawFile.onreadystatechange = function() {
        if (firstrawFile.readyState == 4 && firstrawFile.status == 200) {
            /* console.log('firstrawFile.responseText: ' + firstrawFile.responseText); */
            let secondrawFile = new XMLHttpRequest()
            secondrawFile.open("POST", '/wp-content/themes/wattumbasic-child/get_file.php', true);
            secondrawFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            secondrawFile.onreadystatechange = function() {
                if (secondrawFile.readyState == 4 && secondrawFile.status == 200) {
                    /* console.log('secondrawFile.responseText: ' + secondrawFile.responseText); */
                    callback(firstrawFile.responseText, secondrawFile.responseText);
                };
            };
            secondrawFile.send(secondFile);
        };
    };
    firstrawFile.send(firstFile);
}

function SetDataWithBoth() {
    let wattumProfit = 0,
        btmainProfit = 0,
        tempWattum = 0,
        tempBitmain = 0;
    ReadJsonBothFiles('url=https://www.coincalculators.io/api?name=bitcoin&hashrate=' + (GetWattumHashRate() * 1000000000000) + '&power=' + GetWattumPower() + '&powercost=' + GetPowerCost(), 'url=https://www.coincalculators.io/api?name=bitcoin&hashrate=' + (currentBitmain.hash * 1000000000000) + '&power=' + currentBitmain.watt + '&powercost=' + GetPowerCost(), function (wattumData, bitmainData) {
        tempWattum = JSON.parse(wattumData);
        tempBitmain = JSON.parse(bitmainData);
        SetWattumRevenue(tempWattum.revenueInMonthUSD);
        wattumProfit = (GetQuantity() * tempWattum.revenueInMonthUSD) - (GetQuantity() * tempWattum.revenueInMonthUSD * 0.028) - (GetQuantity() * GetWattumPower() * GetPowerCost() * 0.72);
        SetWattumProfit(wattumProfit);
        SetWattumHash(GetWattumHashRate());
        SetWattumPower(GetWattumPower());
        SetWattumJayTH(GetWattumPower() / GetWattumHashRate());
        SetWattumFee(GetQuantity() * tempWattum.revenueInMonthUSD * 0.028);
        SetWattumElectricCost(GetQuantity() * GetWattumPower() * GetPowerCost() * 0.72);
        SetBitmainRevenue(tempBitmain.revenueInMonthUSD);
        btmainProfit = (GetQuantity() * tempBitmain.revenueInMonthUSD) - (GetQuantity() * currentBitmain.watt * GetPowerCost() * 0.72);
        SetBitmainProfit(btmainProfit);
        SetBitmainHash(currentBitmain.hash);
        SetBitmainPower(currentBitmain.watt);
        SetBitmainJayTH(currentBitmain.watt / currentBitmain.hash);
        SetBitmainElectricCost(GetQuantity() * currentBitmain.watt * GetPowerCost() * 0.72);
        wattumProfit <= 0 ? document.getElementById('WattumMoreProfit').style.display = 'none' : SetWattumMoreProfit((wattumProfit / btmainProfit) * 100 - 100);
    });  
}


function ToInpectLink(link) {
    let linkData = link.substring(1).split(';'),
        linkType = linkData[0],
        linkOverlocking = linkData[1],
        linkQuantity = linkData[2],
        linkCost = linkData[3] / 1000;
    
    //to check Asic type
    let asicHash = 0;
    linkType;
    switch (true) {
        case linkType.toLowerCase().includes('s17pro'):
            // console.log('17spro');
            asicHash = ToCheckOverclocking(wattumS17);
            asicTypeS17Pro.checked = true;
            currentBitmain = bitmainS17;
            break;
        case linkType.toLowerCase().includes('s17+'):
            // console.log('17s+');
            asicHash = ToCheckOverclocking(wattumS17plus);
            asicTypeS17Plus.checked = true;
            currentBitmain = bitmainS17plus;
            break;
        case linkType.toLowerCase().includes('t17+'):
            // console.log('17t+');
            asicHash = ToCheckOverclocking(wattumT17plus);
            asicTypeT17Plus.checked = true;
            currentBitmain = bitmainT17plus;
            break;
        case linkType.toLowerCase().includes('s17e'):
            // console.log('17se');
            asicHash = ToCheckOverclocking(wattumS17e);
            asicTypeS17E.checked = true;
            currentBitmain = bitmainS17e;
            break;
        case linkType.toLowerCase().includes('t17e'):
            // console.log('17te');
            asicHash = ToCheckOverclocking(wattumT17e);
            asicTypeT17E.checked = true;
            currentBitmain = bitmainT17e;
            break;
        case linkType.toLowerCase().includes('t17'):
            // console.log('17t');
            asicHash = ToCheckOverclocking(wattumT17);
            asicTypeT17.checked = true;
            currentBitmain = bitmainT17;
            break;
        default:
            return console.log('wrong Asic Type');
    } 

    //to check Overclocking
    function ToCheckOverclocking(asic) {
        //to check default in overclocking
        let asicDefault = 0,
            newDefault = 0;
        for (let x in asic) {
            if (asic[x].default === 1) {
                asicDefault = x;
            }
            if(asic[x].hash == linkOverlocking) {
                newDefault = x;
            };
        }
        if(asicDefault == newDefault) {
            return asic;
        } else {
            asicDefault !== 0 ? asic[asicDefault].default = 0 : 0;
            asic[newDefault].default = 1;
            return asic;
        }
    }
    
    WatchAsicParams(asicHash);
    
    //to check and set custom Quantity
    let quantityCondition = 0;
    Array.from(WattumQuantitySelect.options).forEach(function (element, index) {
        if(quantityCondition === 0 && element.text.includes(linkQuantity + '')) {
            element.selected = true;
            WattumQuantity.value = linkQuantity;
            quantityCondition = 1;
        };
        if(quantityCondition === 0 && ++index == (WattumQuantitySelect.options.length)) {
            let optionForQuantity = document.createElement("option");
            optionForQuantity.value = linkQuantity;
            optionForQuantity.text = linkQuantity;
            optionForQuantity.selected = true;
            WattumQuantity.value = linkQuantity;
            WattumQuantitySelect.add(optionForQuantity);
        };
    });
        
    //to check and set custom Power Cost
    let powerCostCondition = 0;
    Array.from(WattumPowerCost.options).forEach(function (element, index) {
        if(powerCostCondition === 0 && element.text.includes(linkCost + '')) {
            element.selected = true;
            powerCostCondition = 1;
        };
        if(powerCostCondition === 0 && ++index == (WattumPowerCost.options.length)) {
            let optionForPowerCost = document.createElement("option");
            optionForPowerCost.value = linkCost;
            optionForPowerCost.text = '$ ' + linkCost + ' / kwh';
            optionForPowerCost.selected = true;
            WattumPowerCost.add(optionForPowerCost);
        }
    });
    
    window.scrollTo({
        top: FirmwareCalculator.getBoundingClientRect().top,
        behavior: 'smooth'
    });
    
    SetDataWithBoth();
}

/*  */
document.addEventListener('DOMContentLoaded', function () {
    window.location.hash.substring(1).split(';').length === 4 ? ToInpectLink(window.location.hash) : 0;
});