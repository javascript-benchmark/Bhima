angular.module('bhima.controllers')
  .controller('ProjectModalController', ProjectModalController);

// dependencies injections
ProjectModalController.$inject = [
  '$uibModalInstance', 'ProjectService', 'NotifyService', 'data',
];

function ProjectModalController(Instance, Projects, Notify, Data) {
  const vm = this;

  vm.project = {};
  vm.enterprise = Data.enterprise; // the project enterprise

  vm.isCreateState = (Data.action === 'create');
  vm.isEditState = (Data.action === 'edit');

  // expose to the view
  vm.submit = submit;
  vm.close = Instance.close;

  /**
   * @function submitProject
   * @desc submit project data to the server for create or update
   * @param {object} form The project form instance
   */
  function submit(form) {
    if (form.$invalid) {
      Notify.danger('FORM.ERRORS.HAS_ERRORS');
      return 0;
    }

    const project = angular.copy(vm.project);

    // set enterprise
    project.enterprise_id = vm.enterprise.id;

    // set locked boolean required
    project.locked = !!project.locked;

    const promise = (vm.isCreateState) ?
      Projects.create(project) :
      Projects.update(project.id, project);

    return promise
      .then(() => {
        Instance.close(true);
      })
      .catch(Notify.handleError);
  }

  /* startup function */
  function startup() {
    if (vm.isEditState && Data.identifier) {
      Projects.read(Data.identifier)
        .then(project => {
          vm.project = project;
        })
        .catch(Notify.handleError);
    }
  }

  startup();
}
