start =
  chip

chip =
  "CHIP" whitespace name:chip_name begin_chip impl:chip_implementation end_chip
  { return { name: name, parts: impl.parts }; }

whitespace =
  [ ]+

optional_whitespace =
  [ ]*

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
  parts:parts
  { return { parts: parts }; }

parts =
  "PARTS:" g:gates
  { return g; }

gates =
  "" { return []; }

