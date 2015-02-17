angular.module('ngDrupalGap.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($timeout, $scope, DrupalSession) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.name = DrupalSession.user.name[0].value;
  $scope.created = moment.unix(DrupalSession.user.created[0].value).fromNow();
})

// LOGIN Controller.
.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.login = function(user) {
    AuthService.login(user)
      // Go to "My account".
      .then(function(data) {
        $state.go('tab.account');
      })
      .catch(function() {
        $ionicPopup.alert({
          title: 'Login',
          // TODO i18n.
          template: 'Sorry, unrecognized username or password.'
        });
    });
  };
})

// LOGOUT Controller.
.controller('LogoutCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout()
      // Go to "Login tab".
      .then(function() {
        $state.go('login');
      })
      .catch(function() {
        $ionicPopup.alert({
          title: 'Logout',
          template: 'Oops Cannot logout!'
        });
      });
  }
})

// REGISTRATION FORM Controller.
.controller('RegisterFormCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/register-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal) {
  $scope.modal = modal
  });

  $scope.openModal = function() {
    $scope.modal.show()
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

// REGISTRATION DATAController.
.controller('RegisterDataCtrl', function($scope, $ionicModal, $ionicPopup, RegisterService) {
  $scope.register = function(user) {
    RegisterService.register(user)
      // Go to "Login tab".
      .then(function() {
        $ionicPopup.alert({
          title: 'Registration',
          //TODO Depending on the Drupal settings the message should be different...
          template: 'Done!'
        });
        $scope.modal.hide();
      });
      // TODO Validation errors here.
      /*.catch(function() {
        $ionicPopup.alert({
          title: 'Logout',
          template: 'Oops Error on Registration!'
        });
      });*/
    };
});
