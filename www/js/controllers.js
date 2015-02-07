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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

// LOGIN Controller.
.controller('LoginCtrl', function($scope, $state, $ionicPopup,loginService) {
  $scope.login = function(user) {
    loginService.login(user)
      // Go to "My account".
      .then(function(data) {
        $state.go('tab.account');
      })
      .catch(function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Login',
          // TODO i18n.
          template: 'Sorry, unrecognized username or password.'
      });
    });
  };
});
