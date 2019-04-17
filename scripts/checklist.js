(function (window) {
  'use strict';
  var App = window.App || {};

  function CheckList (selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };
  CheckList.prototype.addRow = function (drinkOrder) {
    // remove any existing rows that match the email address
    this.removeRow(drinkOrder.emailAddress);
    // create a new row instance of a row using coffee order info
    var rowElement = new Row(drinkOrder);

    // add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-drink-order="checkbox"]')
      .remove();
  };

  function Row (drinkOrder) {
    var $div = $('<div></div>', {
      'data-drink-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: drinkOrder.emailAddress
    });

    var description = drinkOrder.size + ' ';
    if (drinkOrder.flavor) {
      description += drinkOrder.flavor + ' ';
    }

    description += drinkOrder.drink + ', ';
    description += ' (' + drinkOrder.emailAddress + ')';
    description += ' [' + drinkOrder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }
  App.CheckList = CheckList;
  window.App = App;
})(window);
