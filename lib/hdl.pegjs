start =
  chip

chip =
  "CHIP" required_whitespace name:chip_name begin_chip impl:chip_implementation end_chip
  { return { name: name, inputs: impl.inputs, outputs: impl.outputs, parts: impl.parts }; }

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
  "PARTS:" g:gates
  { return g; }

gates =
  "" { return []; }

inputs =
  "IN" terminator { return []; }
  / "IN" pin_list:pin_list terminator { return pin_list; }

outputs =
  "OUT" terminator { return []; }
  / "OUT" pin_list:pin_list terminator { return pin_list; }

pin_list =
  required_whitespace first:pin_name rest:separated_pin_name*
  { return [first].concat(rest); }

pin_name =
  identifier

separated_pin_name =
  separator pin_name:pin_name
  { return pin_name; }

separator =
  optional_whitespace "," optional_whitespace

terminator =
  optional_whitespace ";" optional_whitespace
