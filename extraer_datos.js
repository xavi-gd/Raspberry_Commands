const data = {
    "model": "48NPFC100",
    "serial_numbers": [
        "148100R2002008150103",
        "14810082011906030010",
        "14810082011906030014"
    ],
    "active_modules": [
        39,
        40,
        41
    ],
    "module_data": {
        "39": [
            4985,
            9505,
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
            4984,
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

//const module_data = Object.entries(data.module_data)
const modules_keys = Object.keys(data.module_data)
const active_modules = modules_keys.map(key => parseInt(key))

const modules_values = Object.values(data.module_data)
const scale_factor_values = [0.0100, 0.1000, 0.1000, 0.1000, 0.1000, 1.0000, 1.0000, 1.0000, 0.0001, 1.0000, 0.0001, 0.1000, 10.0000, 1.0000, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 1.0000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 1.0000, 1.0000, 1.0000]
const offset_values = [0.0, -10000.0, 0.0, -400.0, -400.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -400.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, 0.0, 0.0, 0.0, 0.0]

for (let module = 0; module < modules_values.length; module++) {
    for (let value = 0; value < modules_values[module].length; value++) {
        modules_values[module][value] = (modules_values[module][value] + offset_values[value]) * scale_factor_values[value]
    }
}

/**
 * @param {number} id
 * @param {number[]} module_values
 */
class Module {
    constructor(id, module_values) {
        const VOLT = 0, CURRENT = 1, REMAIN_CAPACITY = 2, AVG_TEMP_CELL = 3, ENV_TEMP = 4, SOC = 8, SOH = 10,
            PCB_TEMP = 11
        const FIRST_CELL_VOLT = 14, LAST_CELL_VOLT = 29, FIRST_CELL_TEMP = 31, LAST_CELL_TEMP = 46
        const FULL_CAPACITY = 47, CHARGE_TIME = 48, DISCHARGE_TIME = 49
        this.id = id
        this.volt = module_values[VOLT]
        this.current = module_values[CURRENT]
        this.remain_capacity = module_values[REMAIN_CAPACITY]
        this.avg_cell_temp = module_values[AVG_TEMP_CELL]
        this.env_temp = module_values[ENV_TEMP]
        this.soc = module_values[SOC]
        this.soh = module_values[SOH]
        this.pcb_temp = module_values[PCB_TEMP]
        this.cell_volt = module_values.slice(FIRST_CELL_VOLT, LAST_CELL_VOLT + 1)
        this.cell_temp = module_values.slice(FIRST_CELL_TEMP, LAST_CELL_TEMP + 1)
        this.full_capacity = module_values[FULL_CAPACITY]
        this.charge_time = module_values[CHARGE_TIME]
        this.discahrge_time = module_values[DISCHARGE_TIME]
    }
}

const modules = new Array(active_modules.length)
for (let module = 0; module < modules_values.length; module++) {
    modules[module] = new Module(active_modules[module], modules_values[module])
}
console.log(modules)


