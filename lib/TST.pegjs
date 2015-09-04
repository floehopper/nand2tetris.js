script =
  setup_step:setup_step simulation_steps:simulation_step*
  { return { setup_step: setup_step, simulation_steps: simulation_steps }; }

setup_step =
  first:setup_command rest:separated_setup_command* terminator
  { return [first].concat(rest); }

separated_setup_command =
  separator command:setup_command
  { return command; }

setup_command =
  load_command / output_file_command / output_list_command / compare_to_command

load_command =
  command_name:"load" required_whitespace filename:filename
  { return { command: command_name, filename: filename }; }

output_file_command =
  command_name:"output-file" required_whitespace filename:filename
  { return { command: command_name, filename: filename }; }

output_list_command =
  command_name:"output-list" required_whitespace variables:variables
  { return { command: command_name, variables: variables }; }

compare_to_command =
  command_name:"compare-to" required_whitespace filename:filename
  { return { command: command_name, filename: filename }; }

variables =
  first:variable rest:separated_variable*
  { return [first].concat(rest); }

separated_variable =
  required_whitespace variable:variable
  { return variable; }

variable =
  name:variable_name "%" format:variable_format left_padding:format_width "." width:format_width "." right_padding:format_width
  { return { name: name, format: format, left_padding: left_padding, width: width, right_padding: right_padding }; }

variable_name =
  first:[a-z]i rest:[a-z0-9]i*
  { return [first].concat(rest).join(""); }

variable_format =
  binary_format / hexadecimal_format / decimal_format / string_format

binary_format = "B"
hexadecimal_format = "X"
decimal_format = "D"
string_format = "S"

format_width = width:[0-9]+ { return parseInt(width.join("")); }

simulation_step =
  first:command rest:separated_command* terminator
  { return [first].concat(rest); }

separated_command =
  separator command:command
  { return command; }
  
command =
  set_command / eval_command / output_command

set_command =
  command_name:"set" required_whitespace variable_name:variable_name required_whitespace variable_value:variable_value
  { return { command: command_name, variable: variable_name, value: variable_value }; }

eval_command =
  command_name:"eval"
  { return { command: command_name }; }
  
output_command =
  command_name:"output"
  { return { command: command_name }; }

variable_value =
  binary_value / decimal_value

binary_value =
  "%B" digits:[0-9]+
  { return parseInt(digits.join(""), 2); }

decimal_value =
  digits:[0-9]+
  { return parseInt(digits.join("")); }

filename = 
  basename:[a-z0-9]i* "." extension:[a-z0-9]i*
  { return basename.join("") + "." + extension.join(""); }

separator =
  optional_whitespace "," optional_whitespace

terminator =
  optional_whitespace ";" optional_whitespace

required_whitespace =
  whitespace+

optional_whitespace =
  whitespace*

whitespace =
  [ \r\n]
