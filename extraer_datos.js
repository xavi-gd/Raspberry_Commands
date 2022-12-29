const data = {
    "model": "48NPFC100",
    "serial_numbers": [
        "148100R2002008150103",
        "14810082011906030010"
    ],
    "active_modules": [
        39,
        40,
        41
    ],
    "module_data": {
        "39": [
            4985,
            10000,
            1000,
            560,
            600,
            0,
            0,
            2048,
            10000,
            0,
            10000,
            620,
            0,
            15,
            3321,
            3323,
            3324,
            3322,
            3322,
            3324,
            3324,
            3324,
            3325,
            3324,
            3323,
            3325,
            3325,
            3325,
            3324,
            65535,
            15,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            570,
            570,
            570,
            65535,
            1000,
            65535,
            65535,
            0
        ],
        "40": [
            4990,
            10000,
            1000,
            560,
            600,
            0,
            0,
            2048,
            10000,
            0,
            10000,
            620,
            65535,
            15,
            3330,
            3334,
            3332,
            3333,
            3331,
            3324,
            3326,
            3325,
            3325,
            3327,
            3323,
            3326,
            3325,
            3325,
            3323,
            65535,
            15,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            570,
            570,
            570,
            65535,
            1000,
            65535,
            65535,
            0
        ],
        "41": [
            4990,
            10000,
            1000,
            560,
            600,
            0,
            0,
            2048,
            10000,
            0,
            10000,
            620,
            65535,
            15,
            3330,
            3334,
            3332,
            3333,
            3331,
            3324,
            3326,
            3325,
            3325,
            3327,
            3323,
            3326,
            3325,
            3325,
            3323,
            65535,
            15,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            560,
            570,
            570,
            570,
            65535,
            1000,
            65535,
            65535,
            0
        ]
    }
}

const module_data = Object.entries(data.module_data)
const values = Object.values(data.module_data)
scale_factor_values = [0.01, 0.10, 0.10, 0.10, 0.10, 1.00, 1.00, 1.00, 0.00, 1.00, 0.00, 0.10, 10.00, 1.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 1.00, 1.00, 1.00]
offset_values = [0.00, -10000.00, 0.00, -400.00, -400.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, -400.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, -400.00, 0.00, 0.00, 0.00, 0.00]

for (let j = 0; j < data.active_modules.length; j++) {
    for (let i = 0; i < values[j].length; i++) {
        values[j][i] = (values[j][i] + offset_values[i]) * scale_factor_values[i]
    }
}
console.log(values)

