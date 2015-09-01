{
  var AST = options.AST;
}

start =
  chip

chip =
  "CHIP" required_whitespace name:chip_name begin_chip impl:chip_implementation end_chip
  { return new AST.Chip(name, impl.inputs, impl.outputs, impl.parts, impl.builtin); }

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
  inputs:inputs? outputs:outputs? parts:parts? builtin:builtin?
  { return { inputs: inputs, outputs: outputs, parts: parts, builtin: builtin }; }

builtin =
  "BUILTIN" required_whitespace name:chip_name terminator
  { return new AST.Builtin(name); }

parts =
  "PARTS:" part_list:part_list?
  { return new AST.Parts(part_list ? part_list : []); }

part_list =
  required_whitespace first:part rest:part*
  { return [first].concat(rest); }

part =
  part_name:chip_name begin_connections connections:connection_list end_connections terminator
  { return new AST.Part(part_name, connections); }

begin_connections =
  optional_whitespace "(" optional_whitespace

end_connections =
  optional_whitespace ")" optional_whitespace

connection_list =
  first:connection rest:separated_connection*
  { return [first].concat(rest); }

connection =
  part_pin:pin_range connection_assignment chip_pin:pin_range
  { return new AST.Connection(part_pin, chip_pin); }

connection_assignment =
  optional_whitespace "=" optional_whitespace

separated_connection =
  separator connection:connection
  { return connection; }

pin_range =
  identifier:identifier pin_index:pin_index?
  { return identifier + (pin_index ? pin_index : ""); }

pin_index =
  "[" index:[0-9]+ "]"
  { return "[" + index.join("") + "]"; }

inputs =
  "IN" bus_list:bus_list? terminator
  { return new AST.Inputs(bus_list ? bus_list : []); }

outputs =
  "OUT" bus_list:bus_list? terminator
  { return new AST.Outputs(bus_list ? bus_list : []); }

bus_list =
  required_whitespace first:bus_name rest:separated_bus_name*
  { return [first].concat(rest); }

bus_name =
  identifier:identifier bus_width:bus_width?
  { return bus_width ? new AST.Bus(identifier, bus_width) : new AST.Bus(identifier); }

bus_width =
  "[" index:[0-9]+ "]"
  { return parseInt(index.join("")); }

separated_bus_name =
  separator bus_name:bus_name
  { return bus_name; }

separator =
  optional_whitespace "," optional_whitespace

terminator =
  optional_whitespace ";" optional_whitespace
