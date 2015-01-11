var Pin = function() {
  var value = 0;

  this.getValue = function getValue() {
    return value;
  };

  this.setValue = function setValue(newValue) {
    value = newValue;
  };
};

module.exports = Pin;
