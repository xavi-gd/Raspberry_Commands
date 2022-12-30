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
const module_keys = Object.keys(data.module_data)
const active_modules = module_keys.map(key => parseInt(key))

const module_values = Object.values(data.module_data)
const scale_factor_values = [0.0100,0.1000,0.1000,0.1000,0.1000,1.0000,1.0000,1.0000,0.0001,1.0000,0.0001,0.1000,10.0000,1.0000,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,0.0010,1.0000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,0.1000,1.0000,1.0000,1.0000]
const offset_values = [0.0,-10000.0,0.0,-400.0,-400.0,0.0,0.0,0.0,0.0,0.0,0.0,-400.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,-400.0,0.0,0.0,0.0,0.0]

for (let module = 0; module < module_values.length; module++) {
    for (let value = 0; value < module_values[module].length; value++) {
        module_values[module][value] = (module_values[module][value] + offset_values[value]) * scale_factor_values[value]
    }
}
function Module () {
    this.id = 0
    this.volt = 0
    this.current = 0
    this.soc = 0
    this.soh = 0
    this.full_capacity = 0
    this.remain_capacity = 0
    this.env_temp = 0
    this.avg_cell_temp = 0
    this.pcb_temp = 0
    this.remain_charge_time = 0
    this.remain_discahrge_time = 0
}

const modules = new Module()
modules.id = [...active_modules]

const FIRST_CELL_VOLT = 14
const LAST_CELL_VOLT = 29
const FIRST_CELL_TEMP = 31
const LAST_CELL_TEMP = 46

