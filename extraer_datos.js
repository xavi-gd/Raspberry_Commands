const msg = {}
msg.payload = {
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

/**
 * @param {number} module_id
 * @param {number[]} module_values
 */
class Module {
    constructor(module_id, module_values) {
        const VOLT = 0, CURRENT = 1, REMAIN_CAPACITY = 2, AVG_TEMP_CELL = 3, ENV_TEMP = 4, SOC = 8, SOH = 10, PCB_TEMP = 11
        const FIRST_CELL_VOLT = 14, LAST_CELL_VOLT = 29, FIRST_CELL_TEMP = 31, LAST_CELL_TEMP = 46
        const FULL_CAPACITY = 47, CHARGE_TIME = 48, DISCHARGE_TIME = 49
        this.id = module_id
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
        this.discharge_time = module_values[DISCHARGE_TIME]
    }
}

function parse_values(modules) {
    const scale_factor_values = [0.0100, 0.1000, 0.1000, 0.1000, 0.1000, 1.0000, 1.0000, 1.0000, 0.0001, 1.0000, 0.0001, 0.1000, 10.0000, 1.0000, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 1.0000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 0.1000, 1.0000, 1.0000, 1.0000]
    const offset_values = [0.0, -10000.0, 0.0, -400.0, -400.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -400.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, -400.0, 0.0, 0.0, 0.0, 0.0]

    for (let module = 0; module < num_modules; module++) {
        for (let value = 0; value < MAX_MODULE_VALUES; value++) {
            modules[module][value] = (modules[module][value] + offset_values[value]) * scale_factor_values[value]
        }
    }
    return modules
}

// DATOS
const modules_sn = Object.keys(msg.payload.serial_numbers).map(e => parseInt(e, 10))
const modules_id = Object.keys(msg.payload.module_data).map(e => parseInt(e, 10))
const modules = Object.values(msg.payload.module_data)
const num_modules = modules.length
const MAX_MODULE_VALUES = 51


parse_values(modules)

for (let module = 0; module < num_modules; module++) {
    modules[module] = new Module(modules_id[module], modules[module])
    modules[module].charge_time = modules[module].charge_time / 60
    modules[module].discharge_time = modules[module].discharge_time / 60
    modules[module].cell_volt = {...modules[module].cell_volt}
    modules[module].cell_temp = {...modules[module].cell_temp}
}
console.log("fin")
// msg.payload = test;