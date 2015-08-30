{
  var AST = options.AST;
}

start =
  chip

chip =
  "CHIP" required_whitespace name:chip_name begin_chip impl:chip_implementation end_chip
  { return new AST.Chip(name, impl.inputs, impl.outputs, impl.parts); }

required_whitespace =
  whitespace+

optional_whitespace =
  whitespace*

whitespace =
  [ \r\n]

chip_name =
  identifier

identifier =
  first:[a-z]i rest:[a-z0-9]i*
  { return [first].concat(rest).join(""); }

begin_chip =
  optional_whitespace "{" optional_whitespace

end_chip =
  optional_whitespace "}" optional_whitespace

chip_implementation =
  inputs:inputs? outputs:outputs? parts:parts
  { return { inputs: inputs, outputs: outputs, parts: parts }; }

parts =
  "PARTS:" part_list:part_list? { return part_list ? part_list : []; }

part_list =
  required_whitespace first:part rest:part*
  { return [first].concat(rest); }

part =
  part_name:chip_name begin_connections connections:connection_list end_connections terminator
  { return { name: part_name, connections: connections }; }

begin_connections =
  optional_whitespace "(" optional_whitespace

end_connections =
  optional_whitespace ")" optional_whitespace

connection_list =
  first:connection rest:separated_connection*
  { return [first].concat(rest); }

connection =
  part_pin:pin_name connection_assignment chip_pin:pin_name
  { return { part_pin: part_pin, chip_pin: chip_pin }; }

connection_assignment =
  optional_whitespace "=" optional_whitespace

separated_connection =
  separator connection:connection
  { return connection; }

inputs =
  "IN" pin_list:pin_list? terminator
  { return new AST.Inputs(pin_list ? pin_list : []); }

outputs =
  "OUT" pin_list:pin_list? terminator
  { return new AST.Outputs(pin_list ? pin_list : []); }

pin_list =
  required_whitespace first:pin_name rest:separated_pin_name*
  { return [first].concat(rest); }

pin_name =
  identifier:identifier bus_index:bus_index?
  { return identifier + (bus_index ? bus_index : ""); }

bus_index =
  "[" index:[0-9]+ "]"
  { return "[" + index.join("") + "]"; }

separated_pin_name =
  separator pin_name:pin_name
  { return pin_name; }

separator =
  optional_whitespace "," optional_whitespace

terminator =
  optional_whitespace ";" optional_whitespace
