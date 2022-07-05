angular.module('bhima.components')
  .component('bhPercentageInput', {
    templateUrl : 'modules/templates/bhPercentageInput.tmpl.html',
    controller : PercentageInputController,
    bindings : {
      currencyId : '<', // one-way binding
      model : '=', // two way binding
      label : '@?',
      symbol : '@?',
      disabled : '<?',
      min   : '@?',
      max   : '@?',
    },
  });

PercentageInputController.$inject = [];

/**
 * Percentage Input Component
 *
 * This is a Percentage input form based on <input type="number">, with specific
 * validation based on the min and max value.
 */
function PercentageInputController() {
  const $ctrl = this;

  $ctrl.$onInit = function $onInit() {
    $ctrl.symbol = $ctrl.symbol || '%';
    $ctrl.min = $ctrl.min || 0;
    $ctrl.max = $ctrl.max || 100;

    // translated label for the form input
    $ctrl.label = $ctrl.label || 'FORM.LABELS.VALUE';
  };
}
