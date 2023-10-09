import serial
import minimalmodbus
import time
import json

def get_product_info(number_of_active_modules):

	ser = serial.Serial('COM2')
	ser.timeout = 1
	#print(ser)

	serial_list = []
	serial_number_list = []
	model = ""
	master39 = [0x27,0x11,0x00,0x00,0x00,0x00,0xFA,0xCF]
	slave40 = [0x28,0x11,0x00,0x00,0x00,0x00,0xFA,0x30]
	slave41 = [0x29,0x11,0x00,0x00,0x00,0x00,0xFB,0xE1]
	slave42 = [0x2A,0x11,0x00,0x00,0x00,0x00,0xFB,0xD2]
	slave43 = [0x2B,0x11,0x00,0x00,0x00,0x00,0xFA,0x03]
	slave44 = [0x2C,0x11,0x00,0x00,0x00,0x00,0xFB,0xB4]
	slave45 = [0x2D,0x11,0x00,0x00,0x00,0x00,0xFA,0x65]
	slave46 = [0x2E,0x11,0x00,0x00,0x00,0x00,0xFA,0x56]
	modules_list = [master39, slave40, slave41, slave42, slave43, slave44, slave45, slave46]


	for module in modules_list[0:number_of_active_modules]:
		ser.reset_input_buffer()
		#print(module)
		ser.write(serial.to_bytes(module))
		ser.flush()
		values = ser.read(54)[2:]
		#print(values)
		#print(values[2:])
		#print("\n")
		in_ascii = values.decode("ascii")
		in_ascii_list = in_ascii.split("\n")
		#print(in_ascii)
		#print("\n")
		#print(in_ascii_list)
		if (in_ascii != ""):
			model = in_ascii[1:10]
			serial_number = in_ascii[19:54].split("*")[1].strip()
			date_of_manufacture = in_ascii[19:54].split("*")[2].strip()
			serial_list.append([model,serial_number])
			serial_number_list.append(serial_number)
		time.sleep(0.005)

	#print(model)
	#print(serial_number_list)
	for element in model:
		if element == "4":
			idx = model.index(element)
			model = model[idx:]

	ser.close()
	return model,serial_number_list

def get_analog_values():

	list_of_module_numbers = [39,40,41,42,43,44,45,46]
	data_dict = {}

	for number in list_of_module_numbers:
		battery_module = minimalmodbus.Instrument('COM2', number)  # port name, slave address (in decimal)
		battery_module.serial.baudrate = "9600"
		battery_module.serial.timeout = 0.5

		try:
			data = battery_module.read_registers(4095,51,4)
			data_dict[number] = data

		except:
			pass

	battery_module.serial.close()
	list_of_active_modules = list(data_dict.keys())
	#print(list_of_active_modules)
	#print(data_dict)
	return list_of_active_modules, data_dict


def get_all_data():
	json_dict = {}
	active_modules, module_data = get_analog_values()
	model, serial_numbers = get_product_info(len(active_modules))
	json_dict["model"] = model
	json_dict["serial_numbers"] = serial_numbers
	json_dict["list_of_active_modules"] = active_modules
	json_dict["module_data"] = module_data
	json_dict_dump = json.dumps(json_dict)

	print(json_dict_dump)
	#with open('C:\\Users\\BATECNIC01\Documents\\NodeRed\\infoJordi\\pyserial_data.json','w') as write_json:
	with open('C:\\Users\\BATECNIC01\Desktop\\pyserial_data.json','w') as write_json:
		json.dump(json_dict, write_json, indent=4)



if __name__ == "__main__":
	get_all_data()